#!/bin/bash

echo "=== Running PreScript ==="
CONTAINER_NAME=fastapi

echo "Stopping and removing existing container..."
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

echo "Pruning old images..."
docker image prune -f
