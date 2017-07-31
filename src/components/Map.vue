<template>
    <div id="map"></div>
</template>

<script>
import L from 'leaflet'

export default {
  name: 'map',
  props: ['fetchedLocations'],
  methods: {
    initalizeMap: function () {
      let testMarker = [37.7887078, -122.1957755]

      let map = L.map('map').setView({lat: 37.774, lng: -122.4194}, 10)

      let mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>'

      L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; ' + mapLink,
          maxZoom: 18
        }).addTo(map)
      L.marker(testMarker).addTo(map)
    }
  },
  mounted () {
    console.log('List is mounted')
    this.initalizeMap()
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


<style scoped>

</style>
