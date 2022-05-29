[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/hebertcisco/nestjs-rest-boilerplate)

[![Node.js CI](https://github.com/hebertcisco/nestjs-rest-boilerplate/actions/workflows/node.js.yml/badge.svg)](https://github.com/hebertcisco/nestjs-rest-boilerplate/actions/workflows/node.js.yml)

[![Docker Image CI](https://github.com/hebertcisco/nestjs-rest-boilerplate/actions/workflows/docker-image.yml/badge.svg)](https://github.com/hebertcisco/nestjs-rest-boilerplate/actions/workflows/docker-image.yml)

# Basic documentation

## Postgres with Docker

> Up an image and run postgres image with docker

```sh
docker run --name db_pg -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -d postgres:11
```

## Environment variables

> Create a `.env` file in the root directory of your project

```dotenv
# APP CONFIGURATION
PORT=3333                  # default port to listen
APP_SECRET='strong-secret' #x-api-key
NODE_ENV="development"     #development or production

# POSTGRES DATABASE
POSTGRES_DATABASE="postgres" # database name
POSTGRES_HOST="127.0.0.1"       # database host
POSTGRES_USER="postgres"        # database user
POSTGRES_PASSWORD="postgres"    # database password
POSTGRES_PORT=5432              # default
POSTGRES_SYNC=true              # boolean
POSTGRES_LOGS=true              # boolean

# REDIS DATABASE
REDIS_HOST=localhost # redis host
REDIS_PORT=6379      # redis port
REDIS_PASSWORD=redis # redis password
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

```sh
npm install && npm run build
```

```sh
npm run prepare:enviroment
```

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
