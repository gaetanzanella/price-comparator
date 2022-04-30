FROM node:14.18.3
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "dist", "./"]
COPY ["node_modules", "/app/node_modules"]

CMD [ "node", "index.js" ]
