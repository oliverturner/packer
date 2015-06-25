# Packer

A webpack utility bundle for hot reloading in development and optimisation in production

## Development dependencies

Contributors will need to run

`npm i -g gulp docco eslint babel-eslint`

## Available tasks

Run tests, lint the source

`npm test`

Generate the documentation

`npm run docs`

Lint source, run tests, update version, push tags to github, publish to npm

`npm run release -- [major | minor | patch]`

Watch ./src run tests on change

`npm start`
