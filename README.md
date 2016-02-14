# hellocoreclr
Just a playgrond..

Use 
```bash
dnu restore
npm install --prefix src
src/node_modules/.bin/bower --config.cwd=src install
```
to restore packages and use
```bash
cd src
dnx web
```
to run the app. Now open <http://localhost:5000/index.html> in you favorite browser.

Obviously you should have CoreClr RC1 and Nodejs/npm already up and running.