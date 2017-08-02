<template>
  <div class="container">
    <div class="map-holder">
      <!-- MapView component with fetchedLocations dynamically bound using v-bind shorthand -->
      <MapView :fetchedLocations="locations"></MapView>
    </div>
    <h1>{{ msg }}</h1>
    <!--does this bind the method getLocation  from Locator.vue to the variable userLocation? -->
    <div class="locator-holder">
      <Locator :getLocation="userLocation"></Locator>
     <h2> {{ userLocation }} </h2>
    </div>
    <div class="list-holder">
      <!-- LocationList  component with fetchedLocations dynamically bound using v-bind standard -->
      <LocationList v-bind:fetchedLocations="locations"></LocationList>
    </div>
  </div>
</template>

<script>
import bus from './Event-Bus'
import LocationList from './Location-List.vue'
import * as axios from 'axios'
import MapView from './Map.vue'
import Locator from './Locator.vue'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Kiva US Borrowers',
      locations: [],
      userLocation: 'user coordinates go here eventually'
    }
  },
  components: {
    LocationList,
    MapView,
    Locator
  },
  methods: {
    // Fetch our initial batch of Locations
    fetchLocations: function (query) {
      let _this = this
      // console.log(query)
      axios.get('/locations').then((data) => {
        console.log(data)
        // Assign our locations to the component data node for locations
        data.data.forEach(function (element) {
          _this.locations.push(element)
        }, this)
      })
    }
  },
  beforeMount () {
    this.fetchLocations('test query')
  },
  mounted () {
    console.log('Home is mounted')
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
  width: 100%;
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
