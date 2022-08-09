<p align="center">
  <a href="https://github.com/thecodebears" target="blank"><img src="https://media.discordapp.net/attachments/1006545104942665798/1006545164627615764/temp.png?width=1440&height=488" alt="Nest Logo" /></a>
</p>
    
<h1 align="center">cloudapi</h1>
 <p align="center">Merged REST API server for personal and project purposes, builded on <a href="https://nestjs.com/">Nest.js</a></p>

## Deploy

Make sure to initialize local environment variables by managing .env file.

### .env

```bash
# Please change to prod while deployment
scope=DEV

# Server domain
hostname=

# Main database credentials
databaseHost=
databaseName=
databasePort=5432
databaseUsername=
databasePassword=
useSSL=false

# Integrations

# Discord
discordApplicationClientId=
discordApplicationClientSecret=

# API

# Maximum amount of client instances for each user
maxUserClientInstances=10
```

Setting up dependencies by installing Node.js modules.

```bash
$ npm i
or
$ yarn
```

## Running

```bash
# Development
$ npm run start

# Change tracking mode
$ npm run start:dev

# Production
$ npm run start:prod
```

## Testing

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```
