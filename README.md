# kiva-borrower-map

> Presentation of Kiva Borrowers businesses on a map. Uses a combintation of known business entities with a Yelp link along with the Yelp api to gather accurate location data to power the map.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# serve with hot reload at localhost:8080 + API at localhost:8081 (make sure to install PM2 - npm install pm2 -g)
npm run dev-api

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Running Node Server
You can install pm2 and use that or just start the node portion of the app directly.
_Always run from the root of the project PM2 ( pm2 start server/index.js ) or Node ( node server/index.js )._
