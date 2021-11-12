FROM node:16-alpine

RUN mkdir -p /usr/src/app

ENV PORT 3000

RUN apk add --no-cache libc6-compat git

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn install --network-timeout 1000000

EXPOSE 3000
CMD ["yarn", "start"]