'use strict';

const fs = require('fs');
const Path = require('path');

// Oakland, CA
const OAKLAND = {
    lat: 37.8043722,
    lng: -122.2708026
};

let jsonData;
let boundaries;

// Async Method for reading file.
// fs.readFile('../data/yelp_datastore.json', (err, data) => {
//     if (err) throw err;
//     jsonData = JSON.parse(data);
//     console.log(jsonData.length + ' records now in memory.');
// });

// syncrohous method for reading file
// Used here as everything requires it at this point
function getRawLocations() {
    jsonData = JSON.parse(fs.readFileSync('data/yelp_datastore.json'), 'utf8');
    console.log(jsonData.length + ' records now in memory.');
    return jsonData;
}

function setBoundaries(location, radius) {
    boundaries = minMaxCoordinates(location, radius);
    return boundaries;
}

/* Filter function to extract locations within range of our limit
 * @param jsonData - array of location objects
*/
function filterLocations(jsonData, customBounds) {
    if (typeof customBounds !== 'object') {
        console.log('No custom boundaries provided falling back to defaults..');
        boundaries = boundaries;
    } else {
        boundaries = customBounds;
    }
    // console.log(boundaries);

    let filteredResults = [];

    jsonData.forEach(function(obj, index) {
        if (isWithinBounds(obj.coordinates.latitude, obj.coordinates.longitude)) {
            filteredResults.push(obj);
            // console.log(obj.coordinates.latitude, obj.coordinates.longitude, index);
        }
    }, this);

    console.log(filteredResults.length + ' entries');
    return filteredResults;
}

/* Compare location to min/max bounds
 * @param lat
 * @param lng
*/
function isWithinBounds(lat, lng) {
    if (lat >= boundaries.latmin
        && lat <= boundaries.latmax
        && lng >= boundaries.lngmin
        && lng <= boundaries.lngmax) {
            return true;
    }

    return false;
}

/* Function to determine min/max bounds for a given radius around a location
 * @param lat - latitude of initial point
 * @param lng - longitude of initial point
 * @param searchRadius - distance in miles from center
*/
function minMaxCoordinates(latLngObject, searchRadius) {
    let bounds = {};
    let latitude = latLngObject ? parseFloat(latLngObject.lat) : OAKLAND.lat;
    let longitude = latLngObject ? parseFloat(latLngObject.lng) : OAKLAND.lng;
    let radius = searchRadius ? searchRadius : 1; // in miles

    bounds.latmin = latitude - (radius / 69);
    bounds.latmax = latitude + (radius / 69);
    // console.log('lat (min/max): ' + bounds.latmin + ' / ' + bounds.latmax);

    bounds.lngmin = longitude - radius / Math.abs(Math.cos(latitude * (Math.PI / 180)) * 69);
    bounds.lngmax = longitude + radius / Math.abs(Math.cos(latitude * (Math.PI / 180)) * 69);
    // console.log('lng (min/max): ' + bounds.lngmin + ' / ' + bounds.lngmax);

    return bounds;
}

// initalize all locations
getRawLocations();
// initialize default boundaries
setBoundaries();

// export for use in node app
module.exports = {
    getRawLocations,
    minMaxCoordinates,
    isWithinBounds,
    filterLocations,
    jsonData,
    boundaries,
    OAKLAND
}
