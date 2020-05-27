FROM node:13.7.0-alpine

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "build"]