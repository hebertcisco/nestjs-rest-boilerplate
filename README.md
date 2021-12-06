# Basic documentation

## Introduction
The main file is [src/server.ts](src/server.ts). The server is divided into domain, infra, and shared resources.

### Domain
The domain is the core of the application. It is the place where the business logic is implemented.

### Infra
The infra is the place where the infrastructure is implemented. It is the place where the database is implemented.

### Shared
The shared is the place where the shared resources are implemented. It is the place where the configuration is implemented.

### Other
It also has the useful resource parts, scrips, constants and routes.

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

BASE_URL_EXTERNAL_INTEGRATION='http://localhost:8081'
CLIENT_SECRET_EXTERNAL_INTEGRATION='id-grandao-e-secreto'
CLIENT_ID_EXTERNAL_INTEGRATION='1'
```
