# node version needs to match Electron's version 
FROM node:16.9-slim AS builder 
RUN apt-get update && apt-get install \
    git libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 libdrm2 libgbm1 \
    -yq --no-install-suggests --no-install-recommends

FROM builder AS configure
WORKDIR /app/
COPY ./package.json ./
RUN npx yarn install
RUN npx electron-rebuild
# Electron needs root for sand boxing
# see https://github.com/electron/electron/issues/17972
USER root
RUN chown root /app/node_modules/electron/dist/chrome-sandbox
RUN chmod 4755 /app/node_modules/electron/dist/chrome-sandbox

FROM builder
WORKDIR /app/
COPY --from=configure /app/node_modules ./node_modules
COPY --from=configure /app/yarn.lock ./yarn.lock
RUN chown -R node /app