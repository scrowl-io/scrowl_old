# node version needs to match Electron's version 
FROM node:16.9-slim AS builder 
RUN apt-get update && apt-get install \
  git libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 libdrm2 libgbm1 \
  -yq --no-install-suggests --no-install-recommends

FROM builder AS configure
WORKDIR /scrowl-project
RUN mkdir -p apps/electron \ 
  apps/scrowl-downloads \
  packages/config \
  packages/tsconfig \
  packages/ui

COPY ./package.json ./
COPY ./apps/electron/package.json ./apps/electron/
COPY ./apps/scrowl-downloads/package.json ./apps/scrowl-downloads/
COPY ./packages/config/package.json ./packages/config/
COPY ./packages/tsconfig/package.json ./packages/tsconfig/
COPY ./packages/ui/package.json ./packages/ui/

RUN npx yarn install

# This allows you to use native Node.js modules in Electron apps 
# without your system version of Node.js matching exactly
# https://github.com/electron/electron-rebuild
RUN cd apps/electron && npx electron-rebuild

# Electron needs root for sand boxing
# see https://github.com/electron/electron/issues/17972
USER root
RUN chown root /scrowl-project/node_modules/electron/dist/chrome-sandbox
RUN chmod 4755 /scrowl-project/node_modules/electron/dist/chrome-sandbox

FROM builder
WORKDIR /scrowl-project
COPY --from=configure /scrowl-project ./
RUN chown -R node /scrowl-project