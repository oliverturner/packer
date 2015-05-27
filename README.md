# feei-webpacker
A webpack utility bundle for hot reloading in development and optimised in production

## Development dependencies

Contributors will need to run

`npm i -g gulp docco eslint babel-eslint`

## Available tasks

`test` Lint the source

`docs` Generate the documentation

`release -- [<newversion> | major | minor | patch | prerelease | preminor | premajor ]` Run tests, bump the version number, publish to npm

`start` Watch ./src for changes and recompile to ./dist on update
