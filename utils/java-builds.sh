#!/bin/bash

# Fail on error
set -e


BUILDS="orabot"


# Install Graal
while ! state_done GRAAL; do
  if ! test -d ~/graalvm-community-openjdk-17.0.9+9.1; 
  then
    echo "downloading graalVM"
    curl -sL https://github.com/graalvm/graalvm-ce-builds/releases/download/jdk-17.0.9/graalvm-community-jdk-17.0.9_linux-x64_bin.tar.gz | tar xz
    mv graalvm-community-openjdk-17.0.9+9.1 ~/
  fi
  state_set_done GRAAL
  echo "finished downloading graalVM"
done


# Install GraalVM native-image...
while ! state_done GRAAL_IMAGE; do
  ~/graalvm-community-openjdk-17.0.9+9.1/bin/gu install native-image
  state_set_done GRAAL_IMAGE
done

# Download Maven 3.9.6
while ! state_done MAVEN; do
  if ! test -d ~/apache-maven-3.9.6; 
  then
    echo "downloading maven"
    curl -sL https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz | tar xz
    mv apache-maven-3.9.6 ~/
  fi
  state_set_done MAVEN
  echo "finished downloading maven"
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