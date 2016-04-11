# hellocoreclr

Just a playground...

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

to run the app. Now open <http://localhost:5000/> in you favorite browser.

Building goes like

```bash
dnu build HelloCoreClrApp/project.json HelloCoreClrApp.Test/project.json HelloCoreClrApp.Ui/project.json
```

and publish like

```bash
dnu publish HelloCoreClrApp.Ui/project.json --no-source --out dist
```

Please read <http://docs.asp.net/en/latest/publishing/linuxproduction.html> for the steps that should follow.

Obviously you should have CoreClr RC1 and Nodejs/npm already up and running.

For a nice programming experience I'm using Visual Studio Code with the following extensions:
> C#, tslint, standardjs, HTMLHint, Wallabyjs for Visual Studio Code, markdownlint, Spelling and Grammar Checker

Note that Wallabyjs is a commercial extension. Use the following command to set up required node packages for these extensions.

```bash
npm install tslint standard htmlhint
```

Use the following command for assembling the web application on save.

```bash
HelloCoreClrApp.Ui/node_modules/.bin/gulp watch --cwd HelloCoreClrApp.Ui
```