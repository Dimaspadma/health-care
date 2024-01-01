FROM node:alpine3.17

WORKDIR /home/node/app

RUN npm i -g @nestjs/cli

ENTRYPOINT [ "nest", "start" ]