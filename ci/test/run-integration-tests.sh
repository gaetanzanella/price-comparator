#!/usr/bin/env bash
FOLDER=$(dirname "$0")
source "$FOLDER/../shared/utils.sh"

# APP BUILD

echoStart "Preparing app..."

try yarn build
try docker-compose --file "$FOLDER/docker-compose-integration.yaml" up -d

echoSuccess "Preparing app done"

# TEST

echoStart "Testing..."

cd "$FOLDER/../.."
try yarn run test

echoSuccess "Testing done"

# TEARDOWN

echoStart "Tearing down..."

try docker-compose --file "$FOLDER/docker-compose-integration.yaml" down -v

echoSuccess "Teardown done"
