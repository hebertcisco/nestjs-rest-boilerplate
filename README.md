# Basic documentation

[![Node.js CI](https://github.com/hebertcisco/nestjs-rest-boilerplate/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/hebertcisco/nestjs-rest-boilerplate/actions/workflows/node.js.yml)

## Introduction
The main file is [src/server.ts](src/server.ts). The server is divided into domain, infra, and shared resources.

### Modules
The Modules is the core of the application. It is the place where the business logic is implemented.

### Infra
The infra is the place where the infrastructure is implemented. It is the place where the database is implemented.

### Shared
The shared is the place where the shared resources are implemented. It is the place where the configuration is implemented.

### Other
It also has the useful resource parts, scrips, constants and routes.

## Postgres with Docker
> Up an image and run postgres image with docker

```sh
docker run --name db_pg -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -d postgres:11
```

## Environment variables

> Create a `.env` file in the root directory of your project

```dotenv
POSTGRES_DATABASE="postgres"
POSTGRES_HOST="127.0.0.1"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_PORT=5432

PORT=3333
APP_SECRET='senhona_grossa'
MODE="DEV"
```

## Runing the application with docker

### Run as dev 

```sh
docker-compose up dev
```

### Run as prod

```sh
docker-compose up -d prod
```

## Runing the application with npm scrips

### Run as dev

```sh
npm run dev
```
or
```sh
npm run dev:test
```

### Run as prod

```sh
npm run start
```
or 
```sh
npm run start:prod
```
