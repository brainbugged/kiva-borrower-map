<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <!-- <div class="locator-holder">
      <Locator v-on:getLocation="showUserLocation"></Locator>
    </div> -->
    <!-- SearchBar component we watch for the executeQuery event and fire our local executeQuery method -->
    <SearchBar v-on:executeQuery="executeQuery"></SearchBar>
    <!-- conditional messaging -->
    <p v-if="noLocationMsg"><i>{{ noLocationMsg }}</i></p>
    <p v-if="resultsMsg"><i>{{ resultsMsg }}</i></p>
    <div class="map-holder">
      <!-- MapView component with fetchedLocations dynamically bound using v-bind shorthand -->
      <MapView :fetchedLocations="locations" :lat="lat" :lng="lng" :bounds="bounds"></MapView>
    </div>
    <!-- <div class="list-holder"> -->
      <!-- LocationList  component with fetchedLocations dynamically bound using v-bind standard -->
      <!-- <LocationList v-bind:fetchedLocations="locations"></LocationList> -->
    <!-- </div> -->
  </div>
</template>

<script>
import bus from './Event-Bus'
import SearchBar from './Search-Bar.vue'
// import LocationList from './Location-List.vue'
import * as axios from 'axios'
import MapView from './Map.vue'
import Locator from './Locator.vue'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Kiva US Borrowers',
      locations: [],
      lat: 37.8043722,
      lng: -122.2708026,
      bounds: {},
      noLocationMsg: '',
      resultsMsg: ''
    }
  },
  components: {
    // LocationList,
    MapView,
    Locator,
    SearchBar
  },
  methods: {
    // Fetch our initial batch of Locations
    fetchLocations: function (query) {
      // store query
      this.previousQuery = query
      // cache compoenent instance
      let _this = this
      axios.get('/locations').then((data) => {
        console.log(data)
        if (data.data.locations.length > 0) {
          _this.updateLocations(data.data)
        } else {
          _this.expandRadius()
        }
      })
    },
    executeQuery: function (queryData) {
      // clear error message
      this.noLocationMsg = ''
      this.resultsMsg = ''
      // store query
      this.lastAttemptedQuery = queryData
      // cache compoenent instance
      let _this = this
      // update lat lng for map center
      this.lat = queryData.latitude
      this.lng = queryData.longitude

      axios.get('/locations', {
        params: {
          radius: queryData.radius,
          lat: queryData.latitude,
          lng: queryData.longitude
        }
      }).then((data) => {
        console.log(data)
        if (data.data.locations.length > 5) {
          _this.updateLocations(data.data)
          _this.lastSuccessfulQuery = queryData
          _this.resultsMsg = 'Showing results for ' + queryData.searchTerm + ' within ' + queryData.radius + ' miles.'
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
    // ,
    // showUserLocation: function (userLocation) {
    //   console.log(userLocation)
    //   this.lat = userLocation.latitude
    //   this.lng = userLocation.longitude
    // }
  },
  beforeMount () {
    this.fetchLocations('test query')
  },
  mounted () {
    console.log('Home is mounted')
    // sample event emitted via event bus
    bus.$emit('home-loaded', 'home is loaded')
    // SearchBar.$on('executeQuery', function () {
    //   console.log('query locations intiated from search form')
    // })
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
