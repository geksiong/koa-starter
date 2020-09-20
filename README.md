# A Koa JS Starter Project

> This is currently an on-going work-in-progress. Expect breaking changes as I study similar starters by others and form my own opinions.

This project aims to provide a starter layout, configuration and workflow for a Koa API backend project.

## Features

- **Language**
  - Typescript, installed as a dev dependency
- **Code formatting and linting**
  - editorconfig
  - Prettier + ESLint
    - using recommended ruleset
- **Development**
  - yarn for package management
  - nodemon + ts-node for faster development in TS

## Koa Middleware

- koa-router
- koa-bodyparser
- koa-logger
- koa-json
- koa-jwt

## To do list

- [x] dotenv support
- [ ] koa-helmet
- [x] koa-jwt
- [ ] user auth and jwt issuance
- [ ] cors
- [ ] choose a logger framework
- [ ] choose a database ORM lib
- [ ] Docker support
- [ ] Cron jobs
- [ ] Swagger documentation
- [ ] validation
- [ ] tests

## Getting Started

* Install dependencies: `yarn install`
* Run project in TS: `yarn dev`
* Build project: `yarn build`
  * output in `./dist` folder
* Run compiled JS in output folder: `yarn start`
* Clean output folder: `yarn clean`
