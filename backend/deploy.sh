#!/bin/bash
SCRIPT_DIR=$(pwd)
if [ -z "$ORABOT_PDB_NAME" ]; then
    echo "ORABOT_PDB_NAME not set. Will get it with state_get"
  export ORABOT_PDB_NAME=$(state_get ORABOT_PDB_NAME)
fi
if [ -z "$ORABOT_PDB_NAME" ]; then
    echo "Error: ORABOT_PDB_NAME env variable needs to be set!"
    exit 1
fi
if [ -z "$OCI_REGION" ]; then
    echo "OCI_REGION not set. Will get it with state_get"
    export OCI_REGION=$(state_get REGION)
fi
if [ -z "$OCI_REGION" ]; then
    echo "Error: OCI_REGION env variable needs to be set!"
    exit 1
fi

echo "Creating springboot deployment and service"
export CURRENTTIME=$( date '+%F_%H:%M:%S' )
echo CURRENTTIME is $CURRENTTIME  ...this will be appended to generated deployment yaml
cp src/main/resources/orabot-compose.yaml orabot-compose-$CURRENTTIME.yaml

sed -i "s|%DOCKER_REGISTRY%|${DOCKER_REGISTRY}|g" orabot-compose-$CURRENTTIME.yaml

sed -e "s|%DOCKER_REGISTRY%|${DOCKER_REGISTRY}|g" orabot-compose-${CURRENTTIME}.yaml > /tmp/orabot-compose-${CURRENTTIME}.yaml
mv -- /tmp/orabot-compose-$CURRENTTIME.yaml orabot-compose-$CURRENTTIME.yaml
sed -e "s|%ORABOT_PDB_NAME%|${ORABOT_PDB_NAME}|g" orabot-compose-${CURRENTTIME}.yaml > /tmp/orabot-compose-${CURRENTTIME}.yaml
mv -- /tmp/orabot-compose-$CURRENTTIME.yaml orabot-compose-$CURRENTTIME.yaml
sed -e "s|%OCI_REGION%|${OCI_REGION}|g" orabot-compose-${CURRENTTIME}.yaml > /tmp/orabot-compose-$CURRENTTIME.yaml
mv -- /tmp/orabot-compose-$CURRENTTIME.yaml orabot-compose-$CURRENTTIME.yaml

if [ -z "$1" ]; then
    kubectl apply -f $SCRIPT_DIR/orabot-compose-$CURRENTTIME.yaml -n talent-pentagon
else
    kubectl apply -f <(istioctl kube-inject -f $SCRIPT_DIR/orabot-compose-$CURRENTTIME.yaml) -n talent-pentagon
fi

echo "Done creating springboot deployment and service"
