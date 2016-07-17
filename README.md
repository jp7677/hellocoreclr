# hellocoreclr

Just a playground...

Obviously you should have Net Core 1.0 and Nodejs/npm 4.x already up and running for everything that follows.

## Production build and publish

Use

```bash
dotnet restore
```

to restore packages.

Building, assembling and publishing goes like

```bash
dotnet publish --configuration Release --output artefacts/approot src/app
dotnet publish --output artefacts ui
```

Find the result within the ```artefacts/``` folder. Please read <http://docs.asp.net/en/latest/publishing/linuxproduction.html> how to go ahead with installation and front-end servers.

## Testing setup

Use

```bash
dotnet restore
npm install --prefix ui
ui/node_modules/.bin/bower install --config.cwd=ui
ui/node_modules/.bin/typings install --cwd ui
ui/node_modules/.bin/gulp --cwd ui
```

to restore packages, bindings and for assembling the web application. Use

```bash
dotnet test test/app.tests
ui/node_modules/.bin/karma start ui/karma.conf.js
```

to run C# and TypeScript/JavaScript unit tests.

Use

```bash
export ASPNETCORE_ENVIRONMENT=Staging
dotnet run --project src/app
```

to run the web server. Now open <http://localhost:5000/> in you favorite browser. Enjoy source maps in your browser when testing manually.

## Development setup

For a nice programming experience I'm using Visual Studio Code with the following extensions:
> C#, tslint, standardjs, stylelint, HTMLHint, Wallabyjs for Visual Studio Code, markdownlint, Spelling and Grammar Checker

Note that Wallabyjs is a commercial extension.
Use the following command to set up required node packages for these extensions if you haven't installed them globally.

```bash
npm install tslint standard stylelint htmlhint
```

Use again

```bash
dotnet restore
npm install --prefix ui
ui/node_modules/.bin/bower install --config.cwd=ui
ui/node_modules/.bin/typings install --cwd ui
ui/node_modules/.bin/gulp --cwd ui
```

to restore packages and bindings. Finally run the following commands in separate terminals for building and testing on file save.

```bash
export ASPNETCORE_ENVIRONMENT=Development
cd src/app;dotnet watch run
ui/node_modules/.bin/karma start --no-single-run ui/karma.conf.js
cd test/app.tests;dotnet watch test
ui/node_modules/.bin/gulp watch:browsersync --cwd ui
```

Your favorite browser should fire up and should open <http://localhost:3000/>. Happy coding!

## To-do

- Gulp: Throw hinting errors when running in non-watch mode.
- App: Rethink the way we find the webroot. Eventually we shouldn't use webroot and static files at all in a production scenario.
