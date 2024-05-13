#!/bin/bash
SCRIPT_DIR=$(pwd)
if [ -z "$ORABOT_PDB_NAME" ]; then
    echo "ORABOT_PDB_NAME not set. Will get it with state_get"
  export ORABOT_PDB_NAME=$(state_get OB_DB_NAME)
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

echo "Creating springboot deplyoment and service"
export CURRENTTIME=$( date '+%F_%H:%M:%S' )
echo CURRENTTIME is $CURRENTTIME  ...this will be appended to generated deployment yaml
cp src/main/resources/orabot.yaml orabot-$CURRENTTIME.yaml

sed -i "s|%DOCKER_REGISTRY%|${DOCKER_REGISTRY}|g" orabot-$CURRENTTIME.yaml

sed -e "s|%DOCKER_REGISTRY%|${DOCKER_REGISTRY}|g" orabot-${CURRENTTIME}.yaml > /tmp/orabot-${CURRENTTIME}.yaml
mv -- /tmp/orabot-$CURRENTTIME.yaml orabot-$CURRENTTIME.yaml
sed -e "s|%ORABOT_PDB_NAME%|${ORABOT_PDB_NAME}|g" orabot-${CURRENTTIME}.yaml > /tmp/orabot-${CURRENTTIME}.yaml
mv -- /tmp/orabot-$CURRENTTIME.yaml orabot-$CURRENTTIME.yaml
sed -e "s|%OCI_REGION%|${OCI_REGION}|g" orabot-${CURRENTTIME}.yaml > /tmp/orabot-$CURRENTTIME.yaml
mv -- /tmp/orabot-$CURRENTTIME.yaml orabot-$CURRENTTIME.yaml

if [ -z "$1" ]; then
    kubectl apply -f $SCRIPT_DIR/orabot-$CURRENTTIME.yaml -n talent-pentagon
else
    kubectl apply -f <(istioctl kube-inject -f $SCRIPT_DIR/orabot-$CURRENTTIME.yaml) -n talent-pentagon
fi
