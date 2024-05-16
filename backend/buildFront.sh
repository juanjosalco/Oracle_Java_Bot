#!/bin/bash

export IMAGE_NAME=orabot-front
export IMAGE_VERSION=0.1


if [ -z "$DOCKER_REGISTRY_FRONT" ]; then
    echo "DOCKER_REGISTRY_FRONT not set. Will get it with state_get"
  export DOCKER_REGISTRY_FRONT=$(state_get DOCKER_REGISTRY_FRONT)
fi

if [ -z "$DOCKER_REGISTRY_FRONT" ]; then
    echo "Error: DOCKER_REGISTRY_FRONT env variable needs to be set!"
    exit 1
fi
export IMAGE=${DOCKER_REGISTRY_FRONT}/${IMAGE_NAME}:${IMAGE_VERSION}

docker build -f DockerfileFront -t $IMAGE .

docker push $IMAGE
if [  $? -eq 0 ]; then
    docker rmi "$IMAGE"
fi