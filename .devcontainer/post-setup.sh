#!/usr/bin/env bash

set -euxo pipefail

ipAddress=https://$(docker inspect cosmos-e2e-graphql -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'):8081

# Try to get the emulator cert in a loop
until sudo curl -ksf "${ipAddress}/_explorer/emulator.pem" -o '/usr/local/share/ca-certificates/emulator.crt'; do
  echo "Downloading cert from $ipAddress"
  sleep 1
done

sudo update-ca-certificates

if [ ! -f ./backend/.env ]; then
  echo "CosmosDB=AccountEndpoint=$ipAddress/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==" >> ./backend/.env
  echo "CONTAINER_NAME=game" >> ./backend/.env
  echo "DATABASE_NAME=trivia" >> ./backend/.env
fi

if [ ! -f ./frontend/.env ]; then
  cp ./frontend/.env.example ./frontend/.env
fi
