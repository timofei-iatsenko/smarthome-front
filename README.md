# Climate Control Mobile Web App


> IoT Angular 2 Project based on [Angular2 Webpack Starter](https://github.com/AngularClass/angular2-webpack-starter)

This project is home ClimateControl mobile web app, it is client side for [Smarthome](https://github.com/thekip/smarthome) project 

![image](https://cloud.githubusercontent.com/assets/1586852/18437841/6e0e5a2a-7907-11e6-87b8-30445acaf658.png)

### Quick start
> Clone/Download the repo

```bash
# clone repo
git clone https://github.com/thekip/smarthome-front

# change directory to our repo
cd smarthome-front

# install the repo with npm
npm install

# install TypeScript typings
./node_modules/.bin/typings install

# start the server
npm start
```
go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser


## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v4.1.x`+ and NPM `2.14.x`+

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `typings` (`npm install --global typings`)
* `typescript` (`npm install --global typescript`)

## Installing
* `clone` clone repo
* `npm install` to install all dependencies
* `typings install` to install necessary typings
* `npm run server` to start the dev server in another tab

## Running the app
After you have installed all dependencies you can now run the app. Run `npm run server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

### server
```bash
# development
npm run server
# production
npm run build:prod
npm run server:prod
```

## Other commands

### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
```

### watch and build files
```bash
npm run watch
```

# License
 [MIT](/LICENSE)
