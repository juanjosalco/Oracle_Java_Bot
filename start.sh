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
