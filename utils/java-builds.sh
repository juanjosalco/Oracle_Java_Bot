#!/bin/bash

# Fail on error
set -e


BUILDS="orabot"


# Install Graal
while ! state_done GRAAL; do
  if ! test -d ~/graalvm-ce-java17-22.3.3; then
    echo "downloading graalVM"
    curl -sL https://github.com/graalvm/graalvm-ce-builds/releases/download/vm-22.3.3/graalvm-ce-java17-linux-aarch64-22.3.3.tar.gz | tar xz
    mv graalvm-ce-java17-22.3.3 ~/
  fi
  state_set_done GRAAL
  echo "finished downloading graalVM"
done


# Install GraalVM native-image...
while ! state_done GRAAL_IMAGE; do
  ~/graalvm-ce-java17-22.3.3/bin/gu install native-image
  state_set_done GRAAL_IMAGE
done


# Wait for docker login
while ! state_done DOCKER_REGISTRY; do
  echo "Waiting for Docker Registry"
  sleep 5
done

state_set_done JAVA_BUILDS


# # Build all the images (no push) except frontend-helidon (requires Jaeger)
# while ! state_done JAVA_BUILDS; do
#   echo "building images"
#   for b in $BUILDS; do
#     cd $TALENT_PENTAGON_LOCATION/backend
#     time ./build.sh &>> $TALENT_PENTAGON_LOG/build-backend.log
#   done
#   state_set_done JAVA_BUILDS
# done

# while ! state_done JAVA_DEPLOY; do
#   echo "pushing images"
#   for b in $BUILDS; do
#     cd $TALENT_PENTAGON_LOCATION/backend
#     time ./deploy.sh &>> $TALENT_PENTAGON_LOG/deploy-backend.log
#   done
#   state_set_done JAVA_DEPLOY
# done