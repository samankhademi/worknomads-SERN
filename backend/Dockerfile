FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ./package.json .

RUN npm install -g pm2
RUN npm install --pure-lockfile
COPY . .
COPY --chown=node:node . .

USER node
CMD yarn dev

EXPOSE 3000