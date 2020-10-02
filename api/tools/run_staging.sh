#!/usr/bin/env bash

docker-compose -f docker-compose.staging.yml stop
docker-compose -f docker-compose.staging.yml rm --force
docker-compose -f docker-compose.staging.yml up -d --remove-orphans --build