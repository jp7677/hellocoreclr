# hellocoreclr

Just a playground...

Use

```bash
dnu restore
npm install --prefix HelloCoreClrApp.Ui
HelloCoreClrApp.Ui/node_modules/.bin/tsd install angular angular-ui-router mocha chai
HelloCoreClrApp.Ui/node_modules/.bin/bower --config.cwd=HelloCoreClrApp.Ui install
HelloCoreClrApp.Ui/node_modules/.bin/tsc -p HelloCoreClrApp.Ui
```

to restore packages, bindings and for compiling TypeScript files. Use

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
dnu publish HelloCoreClrApp.Ui/project.json
```

(Though publishing isn't perfect yet...)

Obviously you should have CoreClr RC1 and Nodejs/npm already up and running.

For a nice programming experience I'm using Visual Studio Code with the following extensions:
> C#, tslint, standardjs, HTMLHint, Wallabyjs for Visual Studio Code, markdownlint, Spelling and Grammar Checker

Use the following command to set up required node packages for these extensions.

```bash
npm install tslint standard htmlhint
```

Note that Wallabyjs is a commercial extension.
