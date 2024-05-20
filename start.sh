#!/bin/bash

# First steps
cd utils && chmod +x *.sh
cd ..

# Delete previous .env if exists
source unset.sh

# First steps
echo source $(pwd)/env.sh >> ~/.bashrc
source env.sh
source setup.sh

cd backend

# Build and deploy backend
echo "Building and deploying backend\n"
source build.sh

echo "Waiting for backend to be ready\n"
sleep 10

# Build and deploy frontend
echo "Building and deploying frontend\n"
source buildFront.sh && source deploy.sh
