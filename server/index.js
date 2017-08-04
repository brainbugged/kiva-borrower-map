const path = require('path');

const express = require('express');
const app = express();

// this module includes methods for filtering locations
// it also loads all locations into memory
let dataHelpers = require('./json-transforms');

/* /locations endpoint
 * - endpoint to handle filtering location results
 * - Customize with query params to alter location + radius of query
 * @query lat, lng, radius
 */
app.get('/locations', (req, res) => {
  // console.log(req.query); // checkout query params in request
  let bounds, radius, location, filteredLocations;

  // check for custom query, object will have some keys if query was attached to request
  if (Object.keys(req.query).length > 0) {
    // setup custom location object
    location = {};
    location.lat = (req.query.lat) ? req.query.lat : dataHelpers.OAKLAND.lat;
    location.lng  = (req.query.lng) ? req.query.lng : dataHelpers.OAKLAND.lng;

    // Check for custom radius
    radius = (req.query.radius) ? req.query.radius : null;
  }
  // update bounds using custom values if defined
  bounds = dataHelpers.minMaxCoordinates(location, radius);

  filteredLocations = dataHelpers.filterLocations(dataHelpers.jsonData, bounds);

  // return filtered locations
  res.type('json');
  res.status(200).json({locations: filteredLocations, bounds: bounds});
});

/* Initialize serving of static files pointing to our Vuejs dist folder
 * - Our Vuejs build will output html/css/js to this folder
 * - This setup will server these at the root as we have't passed an optional destination
 */
app.use(express.static(path.join(__dirname, '../dist')));

// Tell the app to listen for connections
app.listen(8081, ()=>{
  console.log('API listening on port 8081');
});
