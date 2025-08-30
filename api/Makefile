SHELL := /bin/sh

.PHONY: build up down logs api-logs test-auth

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down -v

logs:
	docker compose logs -f --tail=200

api-logs:
	docker compose logs -f --tail=200 api

# quick auth tests against local dev
# expects API on http://localhost:3000
# default admin initialized in DB: username=admin password=admin@123

register:
	@curl -s -X POST "http://localhost:3000/api/auth/register" \
	  -H "Content-Type: application/json" \
	  -d '{"name":"Admin","phone":"09000000000","password":"admin@123","address":"HN","registerCode":"INV_000"}' | jq .

login:
	@curl -s -X POST "http://localhost:3000/api/auth/login" \
	  -H "Content-Type: application/json" \
	  -d '{"username":"admin","password":"admin@123"}' | tee /tmp/auth.json | jq .

logout:
	@ACCESS=$$(cat /tmp/auth.json | jq -r '.accessToken') ; \
	curl -s -X DELETE "http://localhost:3000/api/token" \
	  -H "Content-Type: application/json" \
	  -d '{"token":"'$$ACCESS'"}' | jq .

