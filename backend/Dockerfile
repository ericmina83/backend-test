FROM node:20-alpine AS builder

WORKDIR /home/node/app
COPY package.json .
RUN npm install

COPY src ./src
COPY tsconfig.json .
RUN npm run build

FROM node:20-alpine

WORKDIR /home/node/app

RUN chown node:node .
# The folder made by `WORKDIR` is not owned by `root`, so we need to chown.
USER node

COPY --from=builder /home/node/app/dist ./dist

COPY package.json .
RUN npm install --omit=dev

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]
