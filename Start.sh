#!/bin/bash

chmod +x *.sh
cd utils
chmod +x *.sh
cd ..
echo source $(pwd)/env.sh >> ~/.bashrc
source env.sh
source setup.sh
