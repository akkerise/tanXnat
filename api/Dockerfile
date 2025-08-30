# FROM node:16-alpine3.14 AS development
# WORKDIR /usr/src/app
# COPY package*.json ./
# # RUN npm 
# RUN npm install glob rimraf
# RUN npm install --only=development
# COPY . .
# RUN rm -rf dist
# RUN npm run build
# RUN ls -a

FROM node:20-alpine as build
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN apk add --no-cache openssl
RUN npm install -g ts-node husky @nestjs/cli@^10.2.1
WORKDIR /usr/src/app
COPY package.json yarn.lock  ./
RUN rm -rf node_modules/
COPY . .
COPY uploads ./
COPY file ./
# Install dependencies including PostgreSQL driver
RUN yarn --no-lockfile
RUN yarn build

FROM node:20-alpine as run_node
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/yarn.lock ./
COPY --from=build /usr/src/app/uploads ./uploads
COPY --from=build /usr/src/app/file ./file
COPY serviceAccountKey.json ./
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh && yarn --production

EXPOSE 3000
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
CMD ["node", "./dist/main.js"]
