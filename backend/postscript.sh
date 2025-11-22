#!/bin/bash

echo "=== Running PostScript ==="

APP_NAME=qairline-backend
CONTAINER_NAME=fastapi
REGION=ap-southeast-1
REPOSITORY_URI=084375550811.dkr.ecr.ap-southeast-1.amazonaws.com/$APP_NAME
IMAGE_TAG=latest

echo "Logging in to ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $REPOSITORY_URI

echo "Pulling Docker image..."
docker pull $REPOSITORY_URI:$IMAGE_TAG

echo "Stopping and removing existing container if it exists..."
if [ "$(docker ps -aq --filter name=^/${CONTAINER_NAME}$)" ]; then
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
fi

echo "Running container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p 80:8000 \
  -e DATABASE_URL="postgresql://postgres:mysecretpassword@host.docker.internal:5432/airline_db" \
  $REPOSITORY_URI:$IMAGE_TAG
