# hellocoreclr

Just a playground...

Obviously you should have CoreClr RC1 and Nodejs/npm 4.x already up and running for everything that follows.

## Production build and publish

Use

```bash
dnu restore
npm install --production --prefix HelloCoreClrApp.Ui
HelloCoreClrApp.Ui/node_modules/.bin/bower install --config.cwd=HelloCoreClrApp.Ui
HelloCoreClrApp.Ui/node_modules/.bin/typings install --cwd HelloCoreClrApp.Ui
HelloCoreClrApp.Ui/node_modules/.bin/gulp production --cwd HelloCoreClrApp.Ui
```

to restore packages, bindings and for assembling the web application in production mode. Use

```bash
dnx -p HelloCoreClrApp.Ui web
```

to start the web server. Now open <http://localhost:5000/> in you favorite browser for a short test.

Publish goes like

```bash
dnu publish HelloCoreClrApp.Ui/project.json --no-source --out dist
```

Please read <http://docs.asp.net/en/latest/publishing/linuxproduction.html> how to go ahead with installation and front-end servers.

## Testing setup

Use

```bash
dnu restore
npm install --prefix HelloCoreClrApp.Ui
HelloCoreClrApp.Ui/node_modules/.bin/bower install --config.cwd=HelloCoreClrApp.Ui
HelloCoreClrApp.Ui/node_modules/.bin/typings install --cwd HelloCoreClrApp.Ui
HelloCoreClrApp.Ui/node_modules/.bin/gulp --cwd HelloCoreClrApp.Ui
```

to restore packages, bindings and for assembling the web application. Use

```bash
dnx -p HelloCoreClrApp.Test test
HelloCoreClrApp.Ui/node_modules/.bin/karma start HelloCoreClrApp.Ui/karma.conf.js
```

to run C# and TypeScript/JavaScript unit tests.

Use

```bash
dnx -p HelloCoreClrApp.Ui web
```

to run the web server. Now open <http://localhost:5000/> in you favorite browser. Enjoy source maps in your browser when testing manually.

## Development setup

For a nice programming experience I'm using Visual Studio Code with the following extensions:
> C#, tslint, standardjs, stylelint, HTMLHint, Wallabyjs for Visual Studio Code, markdownlint, Spelling and Grammar Checker

Note that Wallabyjs is a commercial extension. Furthermore hinting style sheets doesn't work yet out of the box, see <https://github.com/shinnn/vscode-stylelint/issues/8>.
Use the following command to set up required node packages for these extensions if you haven't installed them globally.

```bash
npm install tslint standard stylelint htmlhint
```

Use again

```bash
dnu restore
npm install --prefix HelloCoreClrApp.Ui
HelloCoreClrApp.Ui/node_modules/.bin/bower install --config.cwd=HelloCoreClrApp.Ui
HelloCoreClrApp.Ui/node_modules/.bin/typings install --cwd HelloCoreClrApp.Ui
```

to restore packages, bindings and for assembling the web application. Finally run the following commands in separate terminals for building and testing on file save.

```bash
cd HelloCoreClrApp.Test; dnx watch-test
HelloCoreClrApp.Ui/node_modules/.bin/karma start --no-single-run HelloCoreClrApp.Ui/karma.conf.js
cd HelloCoreClrApp.Ui; dnx watch-web
HelloCoreClrApp.Ui/node_modules/.bin/gulp watch:browsersync --cwd HelloCoreClrApp.Ui
```

Your favorite should fire up and should open <http://localhost:3000/>. Happy coding!

## To-do

- CoreClr: Update to RC2 once it's ready.
- Gulp: Implement image optimization <https://www.npmjs.com/package/gulp-image-optimization>.
- Gulp: Throw hinting errors when running in non-watch mode.
