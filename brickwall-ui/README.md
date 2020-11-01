# CSH BrickWall

## Local Development
You're going to need [node](https://nodejs.org/en/) and ideally use [nvm](https://github.com/nvm-sh/nvm).

### Setup with nvm

```
nvm install
nvm use
npm install
```

### Run in development

```
npm start
```

In order to run locally, you're going to need an OIDC client, by default there's a `.env` file which defines all default variables.

You can create a `.env.local` to modify and add new variables for local development.

All variables need to be prepended with `REACT_APP_`
