FROM node:16-alpine

RUN mkdir -p /usr/src/app

ENV PORT 3000

RUN apk add --no-cache libc6-compat git

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g serve

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]