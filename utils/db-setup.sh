#!/bin/bash

# Fail on error
set -e


# Create Object Store Bucket (Should be replaced by terraform one day)
while ! state_done OBJECT_STORE_BUCKET; do
  echo "Checking object storage bucket"
#  oci os bucket create --compartment-id "$(state_get COMPARTMENT_OCID)" --name "$(state_get RUN_NAME)"
  if oci os bucket get --name "$(state_get RUN_NAME)-$(state_get OB_KEY)"; then
    state_set_done OBJECT_STORE_BUCKET
    echo "finished checking object storage bucket"
  fi
done


# Wait for Order DB OCID
while ! state_done OB_DB_OCID; do
  echo "`date`: Waiting for OB_DB_OCID"
  sleep 2
done


# Get Wallet
while ! state_done WALLET_GET; do
  echo "creating wallet"
  cd $TALENT_PENTAGON_LOCATION
  mkdir wallet
  cd wallet
  oci db autonomous-database generate-wallet --autonomous-database-id "$(state_get OB_DB_OCID)" --file 'wallet.zip' --password 'IQiXCAKLfS1bjMCE' --generate-type 'ALL'
  unzip wallet.zip
  cd $TALENT_PENTAGON_LOCATION
  state_set_done WALLET_GET
  echo "finished creating wallet"
done


# Get DB Connection Wallet and to Object Store
while ! state_done CWALLET_SSO_OBJECT; do
  echo "grabbing wallet"
  cd $TALENT_PENTAGON_LOCATION/wallet
  oci os object put --bucket-name "$(state_get RUN_NAME)-$(state_get OB_KEY)" --name "cwallet.sso" --file 'cwallet.sso'
  cd $TALENT_PENTAGON_LOCATION
  state_set_done CWALLET_SSO_OBJECT
  echo "done grabbing wallet"
done


# Create Authenticated Link to Wallet
while ! state_done CWALLET_SSO_AUTH_URL; do
  echo "creating authenticated link to wallet"
  ACCESS_URI=`oci os preauth-request create --object-name 'cwallet.sso' --access-type 'ObjectRead' --bucket-name "$(state_get RUN_NAME)-$(state_get OB_KEY)" --name 'talent-pentagon' --time-expires $(date '+%Y-%m-%d' --date '+7 days') --query 'data."access-uri"' --raw-output`
  state_set CWALLET_SSO_AUTH_URL "https://objectstorage.$(state_get REGION).oraclecloud.com${ACCESS_URI}"
  echo "done creating authenticated link to wallet"
done


# Give DB_PASSWORD priority
while ! state_done DB_PASSWORD; do
  echo "Waiting for DB_PASSWORD"
  sleep 5
done


# Create Inventory ATP Bindings
while ! state_done DB_WALLET_SECRET; do
  echo "creating Inventory ATP Bindings"
  cd $TALENT_PENTAGON_LOCATION/wallet
  cat - >sqlnet.ora <<!
WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="/talent-pentagon/creds")))
SSL_SERVER_DN_MATCH=yes
!
  if kubectl create -f - -n talent-pentagon; then
    state_set_done DB_WALLET_SECRET
  else
    echo "Error: Failure to create db-wallet-secret.  Retrying..."
    sleep 5
  fi <<!
apiVersion: v1
data:
  README: $(base64 -w0 README)
  cwallet.sso: $(base64 -w0 cwallet.sso)
  ewallet.p12: $(base64 -w0 ewallet.p12)
  keystore.jks: $(base64 -w0 keystore.jks)
  ojdbc.properties: $(base64 -w0 ojdbc.properties)
  sqlnet.ora: $(base64 -w0 sqlnet.ora)
  tnsnames.ora: $(base64 -w0 tnsnames.ora)
  truststore.jks: $(base64 -w0 truststore.jks)
kind: Secret
metadata:
  name: db-wallet-secret
!
  cd $TALENT_PENTAGON_LOCATION
done


# DB Connection Setup
export TNS_ADMIN=$TALENT_PENTAGON_LOCATION/wallet
cat - >$TNS_ADMIN/sqlnet.ora <<!
WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="$TNS_ADMIN")))
SSL_SERVER_DN_MATCH=yes
!
ORABOT_DB_SVC="$(state_get ORABOT_PDB_NAME)_tp"
APP_DATA=APP_DATA
ORDER_LINK=ORDERTOINVENTORYLINK
ORDER_QUEUE=ORDERQUEUE


# Get DB Password
while true; do
  if DB_PASSWORD=`kubectl get secret dbuser -n talent-pentagon --template={{.data.dbpassword}} | base64 --decode`; then
    if ! test -z "$DB_PASSWORD"; then
      break
    fi
  fi
  echo "Error: Failed to get DB password.  Retrying..."
  sleep 5
done


# Wait for DB Password to be set in Order DB
while ! state_done ORABOT_DB_PASSWORD_SET; do
  echo "`date`: Waiting for ORABOT_DB_PASSWORD_SET"
  sleep 2
done


# Order DB User, Objects
while ! state_done APP_DATA; do
  echo "connecting to orabot database"
  U=$APP_DATA
  SVC=$ORABOT_DB_SVC
  sqlplus /nolog <<!
WHENEVER SQLERROR EXIT 1
connect admin/"$DB_PASSWORD"@$SVC
CREATE USER $U IDENTIFIED BY "$DB_PASSWORD" DEFAULT TABLESPACE data QUOTA UNLIMITED ON data;
GRANT CREATE SESSION, CREATE VIEW, CREATE SEQUENCE, CREATE PROCEDURE TO $U;
GRANT CREATE TABLE, CREATE TRIGGER, CREATE TYPE, CREATE MATERIALIZED VIEW TO $U;
GRANT CONNECT, RESOURCE, pdb_dba, SODA_APP to $U;

-- CREATE TABLES
CREATE TABLE APP_DATA.team (
    id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
    manager NUMBER,
    name VARCHAR2(32) NOT NULL,
    description VARCHAR2(120) NOT NULL
);

CREATE TABLE APP_DATA.staff (
    id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
    team_id NUMBER NOT NULL,
    firstname VARCHAR2(128) NOT NULL,
    lastname VARCHAR2(128) NOT NULL,
    phonenumber VARCHAR2(16) NOT NULL,
    role VARCHAR2(16) NOT NULL CHECK(role IN ('Manager', 'Developer', 'Notch')),
    CONSTRAINT staff_FK FOREIGN KEY (team_id) REFERENCES APP_DATA.team(id)
);

CREATE TABLE APP_DATA.auth (
    user_id NUMBER NOT NULL PRIMARY KEY,
    email VARCHAR2(320) NOT NULL,
    password VARCHAR2(64) NOT NULL,
    login_attempts NUMBER(1) NOT NULL,
    is_enabled NUMBER(1) NOT NULL,
    CONSTRAINT auth_FK FOREIGN KEY (user_id) REFERENCES APP_DATA.staff(id)
);

-- CREATE INDEX FOR FAST QUERY
CREATE INDEX staff_teamId_idx ON APP_DATA.staff(team_id);


-- CREATE TABLES

CREATE TABLE APP_DATA.task (
    id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
    assignee_id NUMBER NOT NULL,
    title VARCHAR2(32) NOT NULL,
    description VARCHAR2(120) NOT NULL,
    status VARCHAR2(16) NOT NULL CHECK(status IN ('To do', 'Ongoing', 'Done', 'Cancelled')),
    creation_date TIMESTAMP NOT NULL,
    due_date TIMESTAMP NOT NULL,
    status_change_date TIMESTAMP NOT NULL,
    priority NUMBER(3) NOT NULL,
    CONSTRAINT task_FK FOREIGN KEY (assignee_id) REFERENCES APP_DATA.staff(id)
);

CREATE TABLE APP_DATA.commentary (
    id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
    commenter_id NUMBER NOT NULL,
    task_id NUMBER NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    message VARCHAR2(120) NOT NULL,
    CONSTRAINT comment_task_FK FOREIGN KEY (task_id) REFERENCES APP_DATA.task(id),
    CONSTRAINT comment_staff_FK FOREIGN KEY (commenter_id) REFERENCES APP_DATA.staff(id)
);

-- CREATE INDEX FOR FAST QUERIES
CREATE INDEX task_assigneeId_idx ON APP_DATA.task(assignee_id);
CREATE INDEX task_status_idx ON APP_DATA.task(status);
CREATE INDEX task_priority_idx ON APP_DATA.task(priority);  


-- INSERT IT TEAM
INSERT INTO APP_DATA.team (manager, name, description) VALUES (1, 'IT Team', 'Responsible for DB and user management.');
INSERT INTO APP_DATA.staff (team_id, firstname, lastname, phonenumber, role) VALUES (1, 'Duke', 'Java', '5555555555', 'Notch');

commit;
!
  state_set_done APP_DATA
  echo "finished connecting to database and creating attributes"
done
# DB Setup Done
state_set_done DB_SETUP