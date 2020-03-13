# hellocoreclr

Just a playground...
P.S. I'm a terrible designer :)

## Continuous integration status

|  | Status |
| ---: | :---: |
| Debug build and unit tests status (Windows): | [![Debug build and unit tests status](https://ci.appveyor.com/api/projects/status/jpbt7swu8jaiuxa6/branch/master?svg=true)](https://ci.appveyor.com/project/jp7677/hellocoreclr/branch/master) |
| Unit tests coverage status: | [![Coverage status](https://codecov.io/gh/jp7677/hellocoreclr/branch/master/graph/badge.svg)](https://codecov.io/gh/jp7677/hellocoreclr) |
| Release build and unit tests status (Linux): | [![Release build Status](https://travis-ci.com/jp7677/hellocoreclr.svg?branch=master)](https://travis-ci.com/jp7677/hellocoreclr) |

## Instructions

Obviously you should have Net Core SDK 3.1.x or higher and Nodejs/npm 12.x already up and running for everything that follows.

If you prefer MariaDb you'll have to override the `connectionString` in `appsettings.json` with e.g.

```bash
export connectionString="Server=localhost;database=helloworld;uid=helloworld;pwd=helloworld;"
```

The easiest way to fire up a database is by using docker:

```bash
docker run --name mariadb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=helloworld -e MYSQL_USER=helloworld -e MYSQL_PASSWORD=helloworld -d mariadb --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
docker run --name myadmin -d --link mariadb:db -p 8080:80 phpmyadmin/phpmyadmin
```

### Production build and publish

Restore packages, building, assembling and publishing goes like

```bash
dotnet publish --configuration Release --output ../../artifacts/approot src/HelloCoreClrApp
dotnet msbuild /t:publish /p:configuration=Release /p:output=../artifacts/wwwroot ui
```

Find the result within the ```artifacts/``` folder. Please read <http://docs.asp.net/en/latest/publishing/linuxproduction.html> how to go ahead with installation and front-end servers.

### Testing setup

Use

```bash
dotnet build
dotnet build ui
```

to restore packages, bindings, building and for assembling the web application. Use

```bash
dotnet test
npm run test --prefix ui
```

to run C#, TypeScript/JavaScript unit tests and e2e tests.

Use

```bash
export ASPNETCORE_ENVIRONMENT=Staging
dotnet run --project src/HelloCoreClrApp/HelloCoreClrApp.csproj
```

to run the web server. Use

```bash
npm run serve --prefix ui
```

in a separate console to run the dedicated front end server. Open <http://localhost:3000/> in you browser. Enjoy!

### Development setup

For a nice web programming experience I'm using [Visual Studio Code](https://code.visualstudio.com/) with the following extensions:

> ESLint, stylelint, HTMLHint, markdownlint, Cucumber (Gherkin) Full Support, Debugger for Chrome, Wallaby.js for Visual Studio Code

Note that Wallaby.js is a commercial extension.

My choice for C# development is [JetBrains Rider](https://www.jetbrains.com/rider/).

Use again

```bash
dotnet build
dotnet build ui
```

to restore packages and bindings. Finally run the following commands in separate terminals for building and testing on file save.

```bash
export ASPNETCORE_ENVIRONMENT=Development
(cd src/HelloCoreClrApp;dotnet watch run)
(cd test/HelloCoreClrApp.Test;dotnet watch test)
npm run watch --prefix ui
npm run unit-tests:watch --prefix ui
```

Your favorite browser should fire up and should open <http://localhost:3000/>. Happy coding!
