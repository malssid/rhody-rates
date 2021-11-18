FROM node:alpine

RUN mkdir -p /usr/src/app

ENV PORT 4000

RUN apk add --no-cache libc6-compat git

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]