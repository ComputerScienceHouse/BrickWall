FROM node:14

WORKDIR /usr/src/brickwall

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run generate

EXPOSE 8080
CMD [ "npm", "start" ]