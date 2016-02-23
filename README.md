# hellocoreclr
Just a playgrond..

Use 
```bash
dnu restore
npm install --prefix src
src/node_modules/.bin/bower --config.cwd=src install
```
to restore packages. Use
```bash
dnx -p test/ test
```
to run unit tests and use
```bash
dnx -p src/ web
```
to run the app. Now open <http://localhost:5000/index.html> in you favorite browser.

Building goes like
```bash
dnu build src/project.json
```
and publish like
```bash
dnu publish src/project.json
```

Obviously you should have CoreClr RC1 and Nodejs/npm already up and running.