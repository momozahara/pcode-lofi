FROM oven/bun:canary-slim AS base
WORKDIR /app

FROM base AS dep
COPY package.json .
RUN --mount=type=cache,id=bun,target=~/.bun/install/cache bun install --frozen-lockfile

FROM base AS build
COPY --from=dep /app/node_modules ./node_modules
COPY . .
RUN bun run prisma generate
RUN bun run build

FROM base
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.mjs ./next.config.mjs
EXPOSE 3000
CMD [ "bun", "run", "server.js" ]
