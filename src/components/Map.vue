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
      // lat: this.lat,
      // lng: this.lng
      // currentLocationLayer: {}
    }
  },
  props: ['fetchedLocations', 'lat', 'lng', 'bounds'],
  methods: {
    initalizeMap: function () {
      this.mapView = L.map('map').setView({lat: this.lat, lng: this.lng}, 15)

      // // uncomment for Open Street Maps
      let openStreetTile = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      let mapTile = openStreetTile
      let mapLink = 'https://www.openstreetmap.org'

      // // uncomment for Mapbox styles
      // let accessToken = 'pk.eyJ1IjoibWZhYnJvcyIsImEiOiJjaW9raTI1NzgwMDFndXVqYmJ5bnF5bnIxIn0.DmUQmGI5wqeiGZLMw7BJ8g'
      // // different map styles for changing in mapTile
      // let mapStyles = {
      //   'default': 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=',
      //   'satellite': 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=',
      //   'traffic': 'https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token='
      // }
      // let mapTile = mapStyles.traffic + accessToken
      // let mapLink = 'https://www.mapbox.com'

      L.tileLayer(
          mapTile, {
            attribution: 'Map data &copy; ' + mapLink,
            maxZoom: 18
          }).addTo(this.mapView)

      // create layer group to more easily manage markers
      this.currentLocationLayer = L.layerGroup()
      this.currentLocationLayer.addTo(this.mapView)
    },
    displayLocations: function () {
      this.setMapViewWithBounds()
      this.updateLocationLayer()
    },
    updateLocationLayer: function () {
      console.log('Removing ' + this.currentLocationLayer.getLayers().length + ' layers...')
      this.currentLocationLayer.clearLayers()
      let _this = this
      this.fetchedLocations.forEach(function (location, index) {
        let loc = location
        let popUpTemplate = _this.buildLocationInfo(loc)
        let marker = L.circleMarker(
          [loc.coordinates.latitude, loc.coordinates.longitude],
          {radius: 9, stroke: false, fillOpacity: 0.8, fillColor: '#63a541'})
          .bindPopup(popUpTemplate)
        // add marker to layer group
        _this.currentLocationLayer.addLayer(marker)
      })
      // Add the Layer Group to the Map
      // this.currentLocationLayer.addTo(this.mapView)
      console.log(this.currentLocationLayer.getLayers().length + ' layers added to layerGroup')
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
    },
    setMapViewWithBounds: function () {
      if (this.bounds && this.bounds.latmin) {
        this.mapView.fitBounds([
          [this.bounds.latmin, this.bounds.lngmin],
          [this.bounds.latmax, this.bounds.lngmax]
        ])
      }
    },
    centerMap: function () {
      console.log('centering')
      this.mapView.setView({lat: this.lat, lng: this.lng})
    }
  },
  watch: {
    // Watch our dynmaic props to response when they are updated
    fetchedLocations () {
      this.displayLocations()
    },
    lat () {
      this.centerMap()
    },
    lng () {
      this.centerMap()
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
</script>

<style type="text/css">
#map { height:600px;
  width:100%;
}
</style>
