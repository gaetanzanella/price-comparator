#!/usr/bin/env bash
FOLDER=$(dirname "$0")
source "$FOLDER/../shared/utils.sh"

# APP BUILD

echoStart "Preparing app..."

try yarn build
try docker-compose --file "$FOLDER/docker-compose-integration.yaml" up -d

echoEnd "Preparing app done"

# TEST

cd "$FOLDER/../.."
try yarn run test

# TEARDOWN

echoStart "Tearing down..."

try docker-compose --file "$FOLDER/docker-compose-integration.yaml" down -v

echoEnd "Teardown done"
