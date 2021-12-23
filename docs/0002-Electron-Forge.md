# Electron Forge

## Context

Electron app need a lot of of bootstrapping and boiler-plating just to get started. Is in part due to the pack that Electron app essentially combines a react and a node project into one plus Electron specific technologies like packaging the app to different distributions or auto updating the app.

Here is a table looking into few tools that tries to accomplish the above:

[https://www.notion.so/Electron-boilerplates-b3c516b889284bb4abc42b8bf45b5c17](https://www.notion.so/Electron-boilerplates-b3c516b889284bb4abc42b8bf45b5c17)

## Decision

Electron Forge was chosen because it has just enough configurations but minimal enough.
A good compromise between configurability in the future and convenience today.

## Status

Accepted.

## Consequences

- Limited on the Platforms output (should be good enough though)
- [There will be a big change in up coming release](https://github.com/electron-userland/electron-forge#rotating_light-construction-warning-construction-rotating_light) (Not sure how important this is)
