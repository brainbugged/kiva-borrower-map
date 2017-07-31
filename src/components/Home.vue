<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div class="list-holder">
      <LocationList v-bind:fetchedLocations="locations"></LocationList>
    </div>
  </div>
</template>

<script>
import LocationList from './Location-List.vue'
import * as axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Kiva US Borrowers',
      locations: []
    }
  },
  components: {
    LocationList
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
  h1 {
    margin: 0;
    padding: 1rem .5rem;
  }
</style>
