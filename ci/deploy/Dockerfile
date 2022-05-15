# syntax=docker/dockerfile:1

FROM node:14.18.3
ENV NODE_ENV=production

ARG CONTAINER_PORT

WORKDIR /app

COPY ["package.json", "dist", "yarn.lock", "./"]
COPY ["node_modules", "./node_modules"]

CMD [ "node", "index.js" ]

EXPOSE ${CONTAINER_PORT}
