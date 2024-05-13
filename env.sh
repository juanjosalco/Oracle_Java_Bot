#!/bin/bash
# Copyright (c) 2022 Oracle and/or its affiliates.
# Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.

# Make sure this is run via source or .
if ! (return 0 2>/dev/null); then
  echo "ERROR: Usage 'source env.sh'"
  exit
fi

# POSIX compliant find and replace
function sed_i(){
  local OP="$1"
  local FILE="$2"
  sed -e "$OP" "$FILE" >"/tmp/$FILE"
  mv -- "/tmp/$FILE" "$FILE"
}
export -f sed_i


#set TALENT_PENTAGON_LOCATION
export TALENT_PENTAGON_LOCATION="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd $TALENT_PENTAGON_LOCATION
echo "TALENT_PENTAGON_LOCATION: $TALENT_PENTAGON_LOCATION"


# Java Home
# -d true if file is a directory, so it's testing if this directory exists, if it does
# we are on Mac doing local dev
if test -d ~/graalvm-ce-java17-22.3.3/Contents/Home/bin; then
  # We are on Mac doing local dev
  export JAVA_HOME=~/graalvm-ce-java17-22.3.3/Contents/Home;
else
  # Assume linux
  export JAVA_HOME=~/graalvm-ce-java17-22.3.3
fi
export PATH=$JAVA_HOME/bin:$PATH

#state directory
if test -d ~/talent-pentagon-state; then
  export TALENT_PENTAGON_STATE_HOME=~/talent-pentagon-state
else
  export TALENT_PENTAGON_STATE_HOME=$TALENT_PENTAGON_LOCATION
fi
echo "TALENT_PENTAGON_STATE_HOME: $TALENT_PENTAGON_STATE_HOME"
#Log Directory
export TALENT_PENTAGON_LOG=$TALENT_PENTAGON_STATE_HOME/log
mkdir -p $TALENT_PENTAGON_LOG

source $TALENT_PENTAGON_LOCATION/utils/state-functions.sh

# SHORTCUT ALIASES AND UTILS...
alias k='kubectl'
alias kt='kubectl --insecure-skip-tls-verify'
alias pods='kubectl get po --all-namespaces'
alias services='kubectl get services --all-namespaces'
alias gateways='kubectl get gateways --all-namespaces'
alias secrets='kubectl get secrets --all-namespaces'
alias ingresssecret='kubectl get secrets --all-namespaces | grep istio-ingressgateway-certs'
alias virtualservices='kubectl get virtualservices --all-namespaces'
alias deployments='kubectl get deployments --all-namespaces'
alias talent-pentagon='echo deployments... ; deployments|grep talent-pentagon ; echo pods... ; pods|grep talent-pentagon ; echo services... ; services | grep talent-pentagon ; echo secrets... ; secrets|grep talent-pentagon ; echo "other shortcut commands... most can take partial podname as argument, such as [logpod front] or [deletepod order]...  pods  services secrets deployments " ; ls $TALENT_PENTAGON_LOCATION/utils/'

export PATH=$PATH:$TALENT_PENTAGON_LOCATION/utils/
