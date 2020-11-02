# Brickwall

CSH's website for job finding purposes.

## Overview

This site is written using a [React](https://reactjs.org/) front end, with a [Express](https://expressjs.com/), and uses Sass and JavaScript ES2020.

## Local Development

### Prerequisites:

1. [Prisma](https://www.prisma.io/)
2. [Express](https://expressjs.com/)
3. [React](https://reactjs.org/)
4. [yarn](https://classic.yarnpkg.com/en/)
5. [node](https://nodejs.org/en/)
6. [nvm](https://github.com/nvm-sh/nvm)(optional)

### Instructions

1. `yarn`
2. `yarn start`

The site should now serve locally at `localhost:3000` and the api will be served at `localhost:8080/api`.

If you want to start just a single app run one of the following

- `yarn workspace @csh/brickwall-client start`
- `yarn workspace @csh/brickwall-server start`

#### Production Testing

1. `yarn`
2. `yarn prod:build`

The site should now be served at [`localhost:8080`](http://localhost:8080). The api will be at `localhost:8080/api` and all routes that do not begin with `/api` will be handled by react router on the frontend.

### Environment Variables

#### Client / Frontend

In order to run locally, you're going to need an OIDC client, by default there's a `client/.env` file which defines all default variables.

You can create a `client/.env.local` to modify and add new variables for local development or `export` vars before running.

All variables need to be prepended with `REACT_APP_` if used by the frontend

#### Server / Backend

In order to run locally, you're going to need a postgreSQL server and database. You can either create a `server/prisma/.env` or you can simply `export DATABASE_URL=postgresql://brickwall:password@postgres.host.url/brickwall?schema=public'` before running.

## Contributing

1. [Fork](https://help.github.com/en/articles/fork-a-repo) this repository
   - Optionally create a new [git branch](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell) if your change is more than a small tweak (`git checkout -b BRANCH-NAME-HERE`)
2. Make your changes locally, commit, and push to your fork
3. Create a [Pull Request](https://help.github.com/en/articles/about-pull-requests) on this repo for our Webmasters to review

## Questions/Concerns

Please file an [Issue](https://github.com/ComputerScienceHouse/BrickWall/issues/new) on this repository or contact [webmaster@csh.rit.edu](mailto:webmaster@csh.rit.edu) with inquiries about the site.
