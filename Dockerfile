FROM node:14

WORKDIR /usr/src/brickwall

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "run", "prod" ]