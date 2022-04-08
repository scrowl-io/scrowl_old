FROM sezarosg/electron_app:latest
WORKDIR /scrowl-project
RUN rm -rf ./yarn.lock ./**/node_modules
COPY ./apps/app-downloads/package.json ./apps/app-downloads/
RUN chown -R node /scrowl-project/apps/app-downloads
USER node
RUN npx yarn install