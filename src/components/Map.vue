<template>
    <div id="map"></div>
</template>

<script>
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
      this.mapView = L.map('map').setView({lat: 37.8043722, lng: -122.2708026}, 13)

      let mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>'

      L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; ' + mapLink,
          maxZoom: 18
        }).addTo(this.mapView)
    },
    displayLocations: function () {
      console.log(this.mapView)
      let _this = this
      this.fetchedLocations.forEach(function (location, index) {
        var loc = location
        // L.marker([location.coordinates.latitude, location.coordinates.longitude]).addTo(_this.mapView)
        L.circleMarker(
          [loc.coordinates.latitude, loc.coordinates.longitude],
          {radius: 9, stroke: false, fillOpacity: 0.8, fillColor: '#63a541'}).addTo(_this.mapView)
          .bindPopup(loc.name)
      })
    }
  },
  mounted () {
    console.log('map is mounted')
    this.initalizeMap()
    this.displayLocations()
  },
  beforeUpdate () {
    console.log('before map update')
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
#map { height:300px;
  width:100%;
}
</style>
