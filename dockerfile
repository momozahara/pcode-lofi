FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS dep
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build
COPY --from=dep /app/node_modules ./node_modules
RUN pnpm prisma generate
RUN pnpm run build

FROM base
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.mjs ./next.config.mjs
EXPOSE 3000
CMD [ "node", "server.js" ]
