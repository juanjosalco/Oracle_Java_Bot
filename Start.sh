#!/bin/bash

cd backend && mvn spring-boot::run

sleep 10

cd src/orabot && npm start