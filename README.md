# Welcome to Scrowl!

Scrowl is a project that intends to build accessible course content for Learning Management Systems (LMS). The Course Authoring Tool is designed to be compatible with any LMS that supports the [SCORM 1.2 format](https://scorm.com/scorm-explained/technical-scorm/scorm-12-overview-for-developers/).

## Noteworthy Technologies

### [Yarn](https://yarnpkg.com/)

We use Yarn to manage dependencies instead of npm. This project and others are mono repos and we make use of yarn’s workspace feature to make management easier.

### [Lerna](https://lerna.js.org/)

This project uses Lerna to manage dependencies of local packages.

### [Parcel](https://parceljs.org/)

This project uses Parcel as a build tool.

### [React](https://reactjs.org/)

This project is built with functional react components.

### [Typescript](https://www.typescriptlang.org/)

Typescript is a powerful tool that provides erroring checking and discovery.

### [SCORM](https://scorm.com/scorm-explained/technical-scorm/scorm-12-overview-for-developers/)

This is the communication layer between course content and an LMS.

## Getting Started

With yarn being the preferred package manager, you should install it before continuing.

`npm install yarn -g`

In case you get the error `Error: EACCES: permission denied` try to install the packages using `sudo` permissions, your user's password may be requested:

`sudo npm install yarn -g`

Next lets install our dependencies.

`yarn install`

### Course Authoring

The Course Authoring Tool is the primary application being built in this repo. It is an electron app and you can start it in docker container or without docker. You can find more information about the tool [here](./apps/authoring/README.md)

> If you are on macOS you'll need to install [XQuartz](https://www.xquartz.org/) to overcome display port issues

**Docker**

`make cleanStart` - This will build the docker image and containers. You'll need to do this if it is your first time starting with docker.

`make start` - Will start the application without having to build the image and containers.

**Default**

`yarn run start:authoring`

## Useful Commands

`lerna add <package> --scope=<local-package>` - The easiest way to add a package to a local package ([Documentation](https://github.com/lerna/lerna/tree/main/commands/add)).

`yarn run lint:check:authoring` - A status check on the Course Authoring Tool to ensure style guides are met.

`yarn run lint:fix:authoring` - Rewrites files within the Course Authoring Tool in accordance to our style rules.

`yarn run test:unit:authoring` - Runs all Course Authoring Tool unit tests

`yarn run test:e2e:authoring` - Runs all Course Authoring Tool end-to-end tests

`yarn run test:authoring` - Runs all Course Authoring Tool unit and end-to-end tests

`yarn run package:authoring` - Builds the executables for the Course Authoring Tool. Output can be found at _./apps/authoring/release/build_

## Contributing

When adding a new feature or fixing a bug, make sure to branch from `develop` and name your branch something meaningful.

**Examples:**

- `feature/[FEATURE_NAME]`
- `bug/[BUG_NAME]`
- `chore/[CHORE_NAME]`

When committing changes try to include a tag at the start of the message, just to quickly communicate the type of work that was preformed.

Use `INIT` when initializing a new feature.

> INIT - Added boilerplate for feature

Use `UPDATE` when modifying or adding new code to a feature

> UPDATE - Added ability to customize the score value

Use `FIX` when making a change to correct something

> FIX - Table width wasn't being restored when resizing the window

Use `LINT` if you used a linter to rewrite one or more files

### Submitting Pull Requests

A PR should always be made in reference to a story (if using shortcut) or an issue (if using github).

Even though we have status checks for linting and tests, it is good practice to run these before submitting your PR. A PR that does not pass the status checks will not be reviewed and at least 1 review approval is required for acceptance.
