# Use Node.js 20.13.1 as the base image
FROM node:20.13.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npx", "serve", "-s", "dist"]
