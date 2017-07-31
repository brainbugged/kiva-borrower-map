<template>
  <div class="container">
    <div class="map-holder">
      <MapView v-bind:fetchedLocations="locations"></MapView>
    </div>
    <h1>{{ msg }}</h1>
    <div class="list-holder">
      <LocationList v-bind:fetchedLocations="locations"></LocationList>
    </div>
  </div>
</template>

<script>
import LocationList from './Location-List.vue'
import * as axios from 'axios'
import MapView from './Map.vue'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Kiva US Borrowers',
      locations: []
    }
  },
  components: {
    LocationList,
    MapView
  },
  methods: {
    fetchLocations: function (query) {
      let _this = this
      console.log(query)
      axios.get('/locations').then((data) => {
        console.log(data)
        data.data.forEach(function (element) {
          _this.locations.push(element)
        }, this)
      })
    }
  },
  mounted () {
    console.log('Home is mounted')
    this.fetchLocations('test query')
  },
  beforeCreate () {
    console.log('BEFORE Home is created')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leaflet-fake-icon-image-2x {
  background-image: url(../../node_modules/leaflet/dist/images/marker-icon-2x.png);
}
.leaflet-fake-icon-shadow {
  background-image: url(../../node_modules/leaflet/dist/images/marker-shadow.png);
}
  @import "../../node_modules/leaflet/dist/leaflet.css";
  .map-holder {
    display: block;
    height: 300px;
    width: 100%;
  }
    #map { height:300px;
      width:100%;
    }
</style>
