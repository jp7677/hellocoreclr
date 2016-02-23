# hellocoreclr
Just a playgrond..

Use 
```bash
dnu restore
npm install --prefix HelloCoreClrApp
HelloCoreClrApp/node_modules/.bin/bower --config.cwd=HelloCoreClrApp install
HelloCoreClrApp/node_modules/.bin/tsc -p HelloCoreClrApp
```
to restore packages and for compiling Typescript files. Use
```bash
dnx -p HelloCoreClrApp.Test test
```
to run c# unit tests.

Use
```bash
dnx -p HelloCoreClrApp web
```
to run the app. Now open <http://localhost:5000/> in you favorite browser.

Building goes like
```bash
dnu build HelloCoreClrApp/project.json
```
and publish like
```bash
dnu publish HelloCoreClrApp/project.json
```
(Though publishing isn't perfect yet...)

Obviously you should have CoreClr RC1 and Nodejs/npm already up and running.

Install Typescript bindings with
```bash
HelloCoreClrApp/node_modules/.bin/tsd install angular
```
