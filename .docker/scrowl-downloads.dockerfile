FROM sezarosg/electron_app:latest
WORKDIR /scrowl-project
RUN mkdir apps/scrowl-downloads && \
  rm -rf ./**/yarn.lock ./**/node_modules
COPY ./apps/scrowl-downloads/package.json ./apps/scrowl-downloads/
COPY ./turbo.json ./turbo.json
RUN chown -R node /scrowl-project/apps/scrowl-downloads
USER node
RUN npx yarn install