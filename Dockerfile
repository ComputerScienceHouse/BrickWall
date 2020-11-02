FROM node:14

WORKDIR /usr/src/brickwall

COPY package.json yarn.lock ./
COPY server/package.json ./server/package.json
COPY client/package.json ./client/package.json

RUN yarn install --frozen-lockfile
ENV NODE_ENV production

COPY . .

RUN yarn build
RUN yarn generate

EXPOSE 8080
CMD [ "yarn", "prod" ]
