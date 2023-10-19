FROM node:alpine as builder
WORKDIR /app

COPY package.json tsconfig.json next.config.js .env ./
COPY src src
RUN yarn install --production
RUN yarn build

FROM node:alpine as runner
WORKDIR /app

COPY public ./public
COPY --from=builder /app/package.json .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENTRYPOINT [ "node", "server.js" ]
