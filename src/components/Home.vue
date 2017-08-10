<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <!-- SearchBar component we watch for the executeQuery event and fire our local executeQuery method -->
    <search-bar v-on:executeQuery="executeQuery"></search-bar>
    <!-- conditional messaging -->
    <p v-if="noLocationMsg"><i>{{ noLocationMsg }}</i></p>
    <p v-if="resultsMsg"><i>{{ resultsMsg }}</i></p>
    <div class="map-holder">
      <!-- MapView component with fetchedLocations dynamically bound using v-bind shorthand -->
      <map-view :fetchedLocations="locations" :lat="lat" :lng="lng" :bounds="bounds"></map-view>
    </div>
     <div class="list-holder"> 
      <!-- LocationList  component with fetchedLocations dynamically bound using v-bind standard -->
       <location-list v-bind:fetchedLocations="locations"></location-list> 
     </div> 
  </div>
</template>

<script>
import bus from './Event-Bus'
import SearchBar from './Search-Bar.vue'
import LocationList from './Location-List.vue'
import * as axios from 'axios'
import MapView from './Map.vue'
import Locator from './Locator.vue'

export default {
  name: 'home',
  data () {
    return {
      msg: 'US Borrowers',
      locations: [],
      radius: 1,
      lat: 37.8043722,
      lng: -122.2708026,
      bounds: {},
      noLocationMsg: '',
      resultsMsg: ''
    }
  },
  components: {
    LocationList,
    MapView,
    Locator,
    SearchBar
  },
  methods: {
    executeQuery: function (queryData) {
      // clear error message
      this.noLocationMsg = ''
      this.resultsMsg = ''
      // store attempted query
      if (queryData) {
        this.lastAttemptedQuery = queryData
      }
      // update radius, lat, + lng for map center
      this.radius = queryData ? queryData.radius : 1
      this.lat = queryData ? queryData.latitude : 37.8043722
      this.lng = queryData ? queryData.longitude : -122.2708026

      // cache compoenent instance
      let _this = this

      axios.get('/locations', {
        params: {
          radius: _this.radius,
          lat: _this.lat,
          lng: _this.lng
        }
      }).then((data) => {
        // console.log(data)
        // Only show locations if there are mofe
        if (data.data.locations.length > 2) {
          _this.updateLocations(data.data)
          if (queryData) {
            _this.lastSuccessfulQuery = queryData
            _this.resultsMsg = 'Showing results for ' + queryData.searchTerm + ' within ' + queryData.radius + ' miles.'
          }
        } else {
          _this.expandRadius()
        }
      })
    },
    expandRadius: function () {
      let newQuery = JSON.parse(JSON.stringify(this.lastAttemptedQuery))
      newQuery.radius = parseInt(this.lastAttemptedQuery.radius) * 2
      if (newQuery.radius < 1000) {
        this.executeQuery(newQuery)
      } else {
        this.executeQuery(this.lastSuccessfulQuery)
        this.noLocationMsg = 'No results within ' + newQuery.radius + 'miles. Please try another search.'
      }
    },
    updateLocations: function (queryData) {
      this.bounds = queryData.bounds
      // Assign our locations to the component data node for locations
      this.locations = []
      this.locations = queryData.locations
    }
  },
  beforeMount () {
    this.executeQuery()
  },
  mounted () {
    // console.log('Home is mounted')
    // sample event emitted via event bus
    bus.$emit('home-loaded', 'home is loaded')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
.map-holder {
  display: block;
  height: 600px;
  /* width: 100%; */
  margin: 1.3rem;
}

@import "../../node_modules/leaflet/dist/leaflet.css";
/*
.leaflet-icon-image-2x {
  background-image: url(../assets/images/marker-icon-2x.png);
}
.leaflet-icon-shadow {
  background-image: url(../assets/images/marker-shadow.png);
} */
</style>
