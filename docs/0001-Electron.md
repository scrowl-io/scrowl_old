# Electron

## Context

Electron is the only technology currently that allow us to utilize web technologies and web developers to build desktop applications. Electron is being used by many big name companies like Microsoft for VS Code, Slack, Discord and Figma to name a few.

## Decision

Since other technologies like Flutter are neither battle tested nor out of beta we decided to use the well established Electron app.

## Status

Accepted.

## Consequences

- Slow performance is a well known issue if the app is not built properly... it is not “just” a site anymore.
- There is a security risk involved with Electron apps it utilizes Nodejs on the client’s device. So developers need to understand and how to architect the application in a secure manner
- Not all Nodejs modules can “just work” for Electron app and even if it does it my not be optimize to use the IPC pattern
- Here is a list: https://www.notion.so/Electron-s-weaknesses-to-watch-out-for-5fcbf40e31fb43b0af846490be669cc5
