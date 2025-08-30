<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

API service (NestJS + TypeORM) with PostgreSQL, Redis, Kafka, and pgAdmin via Docker Compose.

## Prerequisites
- Docker & Docker Compose
- Make (optional convenience)

## Quick start

```bash
cd api
make build
make up       # starts postgres:5432, pgadmin:5050, redis:6379, kafka:9092, api:3000
make api-logs # follow API logs
```

API will be available at http://localhost:3000

Swagger (if enabled): http://localhost:3000/swagger

pgAdmin: http://localhost:5050 (admin@local / admin)

## Environment
The service reads config from process.env. docker-compose sets defaults:
- DATABASE_TYPE=postgres
- DATABASE_HOST=postgres
- DATABASE_PORT=5432
- DATABASE_USERNAME=app
- DATABASE_PASSWORD=app
- DATABASE_NAME=appdb
- REDIS_HOST=redis
- REDIS_PORT=6379
- KAFKA_BROKERS=kafka:9092

## Database Management
Since we switched from MySQL to PostgreSQL, the existing migrations are not compatible. You can:

1. **Sync schema** (creates tables from entities):
   ```bash
   npm run schema:sync
   ```

2. **Generate new migrations** (after making entity changes):
   ```bash
   npm run migration:generate -- src/migrations/MigrationName
   ```

3. **Run migrations**:
   ```bash
   npm run migration:run
   ```

4. **Revert last migration**:
   ```bash
   npm run migration:revert
   ```

## Auth quick tests
```bash
make register  # create a user (if needed)
make login     # login as admin (admin/admin@123) and save token to /tmp/auth.json
make logout    # use saved token to logout
```

## Development
```bash
npm install
npm run start:dev
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
