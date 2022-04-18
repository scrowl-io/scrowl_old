# Welcome to Scrowl!

## Noteworthy Technologies

### [Yarn](https://yarnpkg.com/)

We use Yarn to manage dependencies instead of npm. This project and others are mono repos and we make use of yarn’s workspace feature to make management easier.

### [Lerna](https://lerna.js.org/)

This project uses Lerna to manage dependencies of local packages.

### [React](https://reactjs.org/)

This project is built with functional react components.

### [Typescript](https://www.typescriptlang.org/)

Typescript is a powerful tool that provides erroring checking and discovery

## Getting Started

With yarn being the preferred package manager, you should install it before continuing.

`npm install yarn -g`

In case you get the error `Error: EACCES: permission denied` try to install the packages using `sudo` permissions, your user's password may be requested:

`sudo npm install yarn -g`

Next lets install our dependencies.

`yarn install`

### Course Authoring

The course authoring tool is the primary application being built in this repo. It is an electron app and you can start it in docker container or without docker.

> If you are on macOS you'll need to install [XQuartz](https://www.xquartz.org/) to overcome display port issues

**Docker**

`make cleanStart` - This will build the docker image and containers. You'll need to do this if it is your first time starting with docker.

`make start` - Will start the application without having to build the image and containers.

**Default**

`yarn workspace @scrowl/courseauthoring run start`

## Useful Commands

`lerna add <package> --scope=<local-package>` - The easiest way to add a package to a local package ([Documentation](https://github.com/lerna/lerna/tree/main/commands/add)).
