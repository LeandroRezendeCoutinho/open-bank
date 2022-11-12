###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18.12-alpine as development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN yarn install

COPY --chown=node:node  . .

RUN yarn build

CMD [ "yarn", "start:debug" ]

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18.12-alpine as build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN yarn install --production

COPY --chown=node:node  . .

RUN yarn build

CMD [ "node", "dist/main.js" ]

USER node

###################
# PRODUCTION
###################

FROM node:18.12-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
