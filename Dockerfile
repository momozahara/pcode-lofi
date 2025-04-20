# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM node:20-alpine AS base
WORKDIR /usr/src/app
RUN apk update \
  apk add openssl
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install

RUN mkdir -p /temp/prod
COPY package.json pnpm-lock.yaml /temp/prod/
RUN cd /temp/prod && pnpm install --frozen-lockfile

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN pnpm prisma generate
RUN pnpm build

FROM base AS release
COPY --from=prerelease /usr/src/app/.next/standalone ./
COPY --from=prerelease /usr/src/app/.next/static ./.next/static
COPY --from=prerelease /usr/src/app/public ./public
COPY --from=prerelease /usr/src/app/package.json ./package.json
COPY --from=prerelease /usr/src/app/next.config.mjs ./next.config.mjs
CMD [ "node", "server.js" ]
