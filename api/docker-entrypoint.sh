#!/usr/bin/env sh
set -e

# wait for dependencies
until nc -z postgres 5432; do echo "waiting for postgres..."; sleep 1; done
until nc -z redis 6379; do echo "waiting for redis..."; sleep 1; done
# kafka may take longer; we won't block strictly

# run migrations if any (optional - adjust if you have commands)
# yarn typeorm migration:run

echo "Starting API"
node ./dist/main.js
