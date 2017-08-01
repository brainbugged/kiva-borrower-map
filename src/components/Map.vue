<template>
    <div id="map"></div>
</template>

<script>
import bus from './Event-Bus'
import L from 'leaflet'

export default {
  name: 'map',
  data () {
    return {
      // mapView: {}
    }
  },
  props: ['fetchedLocations'],
  methods: {
    initalizeMap: function () {
      this.mapView = L.map('map').setView({lat: 37.8043722, lng: -122.2708026}, 15)

      let mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>'

      L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; ' + mapLink,
          maxZoom: 18
        }).addTo(this.mapView)
    },
    displayLocations: function () {
      // console.log(this.mapView)
      let _this = this
      this.fetchedLocations.forEach(function (location, index) {
        let loc = location
        let popUpTemplate = _this.buildLocationInfo(loc)
        // L.marker([location.coordinates.latitude, location.coordinates.longitude]).addTo(_this.mapView)
        L.circleMarker(
          [loc.coordinates.latitude, loc.coordinates.longitude],
          {radius: 9, stroke: false, fillOpacity: 0.8, fillColor: '#63a541'}).addTo(_this.mapView)
          .bindPopup(popUpTemplate)
      })
    },
    buildLocationInfo: function (loc) {
      // Build the location details in the most ugly way possible
      let locAddress = ''
      for (var i = 0; loc.location.display_address.length > i; i++) {
        locAddress += loc.location.display_address[i]
        if (i <= loc.location.display_address.length) {
          locAddress += '<br>'
        }
      }

      let popUpTemplate = '<h4>' + loc.name + '</h4>' +
        '<small><b>Phone:</b><br> ' + loc.display_phone + '</small>' +
        '<br><small><b>Address:</b><br> ' + locAddress + '</small>' +
        '<br><small><a href="' + loc.url + '" target="_blank">View on Yelp</a></small>'

      return popUpTemplate
    }
  },
  watch: {
    // Watch our dynmaic props to response when they are updated
    fetchedLocations () {
      this.displayLocations()
    }
  },
  mounted () {
    console.log('map is mounted')
    this.initalizeMap()
    this.displayLocations()
  },
  beforeUpdate () {
    console.log('before map update')
  },
  created () {
    // Sample Usage of Event Bus
    bus.$on('home-loaded', function (msg) {
      console.log(msg)
    })
  }
}

/*
// user geolocation data
let x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;

    //
    let userLocation = { "lat": position.coords.latitude,
                    "lng" : position.coords.longitude
      }

    return userLocation

}

  <button onclick="getLocation()">I am Here</button>

// // user geolocation marker -- doesn't work
// let userMarker = showPosition(position)
// alert(userMarker.lat, userMarker.lng)
// L.marker([userMarker.lat, userMarker.lng], title="here i am!").addTo(map)

let popup = L.popup()
// .setLatLng(test_marker )
.setContent('<p>Test: Fists of Flower </p>')
.openOn(map);

marker.bindPopup(popupContent).openPopup()
*/
</script>

<style type="text/css">
#map { height:600px;
  width:100%;
}
</style>
