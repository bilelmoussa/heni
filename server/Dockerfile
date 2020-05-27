FROM node:13.7.0-alpine

WORKDIR /app/server

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm install

RUN npm install typescript -g

COPY ./src ./src

RUN npm run build

EXPOSE 8080

CMD [ "node", "./dist/server.js" ]