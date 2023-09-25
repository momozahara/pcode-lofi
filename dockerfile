FROM node:16.17-alpine as base
RUN yarn global add pnpm
FROM node:16.17-alpine as dependencies

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install

FROM node:16.17-alpine as builder

WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm prisma generate
RUN pnpm build

FROM node:16.17-alpine

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000
CMD [ "node", "server.js" ]
