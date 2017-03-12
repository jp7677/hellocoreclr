# hellocoreclr

Just a playground...
P.S. I'm a terrible designer :)

## Continuous integration status

|  | Status |
| ---: | :---: |
| Debug build and unit tests status (Windows): | [![Debug build and unit tests status](https://ci.appveyor.com/api/projects/status/jpbt7swu8jaiuxa6/branch/master?svg=true)](https://ci.appveyor.com/project/jp7677/hellocoreclr/branch/master) |
| Unit tests coverage status: | [![Coverage status](https://codecov.io/gh/jp7677/hellocoreclr/branch/master/graph/badge.svg)](https://codecov.io/gh/jp7677/hellocoreclr) |
| Release build status (Linux): | [![Release build Status](https://travis-ci.org/jp7677/hellocoreclr.svg?branch=master)](https://travis-ci.org/jp7677/hellocoreclr) |

## Instructions

Obviously you should have Net Core SDK 1.0 and Nodejs/npm 6.x already up and running for everything that follows.

### Production build and publish

Restore packages, building, assembling and publishing goes like

```bash
dotnet restore
dotnet publish --configuration Release --output ../../artifacts/approot src/HelloCoreClrApp
dotnet msbuild /t:publish /p:configuration=Release /p:output=../artifacts/wwwroot ui
```

Find the result within the ```artifacts/``` folder. Please read <http://docs.asp.net/en/latest/publishing/linuxproduction.html> how to go ahead with installation and front-end servers.

### Testing setup

Use

```bash
dotnet restore
dotnet build
```

to restore packages, bindings, building and for assembling the web application. Use

```bash
dotnet test test/HelloCoreClrApp.Test/HelloCoreClrApp.Test.csproj
ui/node_modules/.bin/gulp unit-tests --cwd ui --nobuild
ui/node_modules/.bin/gulp e2e-tests --cwd ui --nobuild --nomiddlewareproxy
```

to run C#, TypeScript/JavaScript unit tests and e2e tests.

Use

```bash
export ASPNETCORE_ENVIRONMENT=Staging
dotnet run --project src/HelloCoreClrApp/HelloCoreClrApp.csproj
```

to run the web server. Now open <http://localhost:5000/> in you favorite browser. Enjoy source maps in your browser when testing manually.

### Development setup

For a nice programming experience I'm using Visual Studio Code with the following extensions:
> C#, tslint, ESLint, stylelint, HTMLHint, Wallabyjs for Visual Studio Code, markdownlint, Spelling and Grammar Checker, Debugger for Chrome

Note that Wallabyjs is a commercial extension.
Use the following command to set up required node packages for these extensions if you haven't installed them globally.

```bash
npm install tslint typescript eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise stylelint stylelint-config-standard htmlhint
```

Use again

```bash
dotnet restore
dotnet build
```

to restore packages and bindings. Finally run the following commands in separate terminals for building and testing on file save.

```bash
export ASPNETCORE_ENVIRONMENT=Development
(cd src/HelloCoreClrApp;dotnet watch run)
(cd test/HelloCoreClrApp.Test;dotnet watch test)
ui/node_modules/.bin/gulp watch --cwd ui
```

Your favorite browser should fire up and should open <http://localhost:3000/>. Happy coding!

## TODO

- Remove our custom typings once Typescript 2.2 is available <https://github.com/Microsoft/TypeScript/issues/12517>.
- Remove our local OpenCover package once OpenCover with portable pdb support is available on NuGet <https://github.com/OpenCover/opencover/issues/610>.
