<template>
  <div class="search-bar">
    <div class="row">
      <div class="locator-holder small-12 large-3 column">
        <locator v-on:getLocation="showUserLocation"></locator>
      </div>
      <form class="search-form clearfix small-12 large-9 column end">
        <div class="small-12 medium-4 column">
          <input v-model="searchTerm" v-on:focus="selectAll" class="custom-location" type="text" />
        </div>
        <div class="small-6 medium-4 column">
          <select v-model="radius">
            <option value="1">Radius (Miles)</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div class="small-6 medium-4 column">
          <button v-on:click.prevent="geoCodeSearch" class="button setting">Search</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Locator from './Locator.vue'

export default {
  name: 'search-bar',
  data () {
    return {
      radius: 1,
      searchTerm: 'City, State or Zip Code',
      latitude: 37.8043722,
      longitude: -122.2708026
    }
  },
  components: {
    Locator
  },
  methods: {
    geoCodeSearch () {
      console.log('Searching ' + this.searchTerm + ' within ' + this.radius + ' miles.')
      const geocoder = new window.google.maps.Geocoder()
      let address = this.searchTerm
      let _this = this
      geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
          _this.latitude = results[0].geometry.location.lat()
          _this.longitude = results[0].geometry.location.lng()
          console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng())
          _this.initializeLocationQuery()
        } else {
          alert('Geocode was not successful for the following reason: ' + status)
        }
      })
    },
    initializeLocationQuery: function () {
      this.$emit('executeQuery', JSON.parse(JSON.stringify(this.$data)))
    },
    showUserLocation: function (userLocation) {
      console.log(userLocation)
      this.searchTerm = 'Your Location'
      this.latitude = userLocation.latitude
      this.longitude = userLocation.longitude
      this.initializeLocationQuery()
    },
    selectAll: function (event) {
      // Workaround for Safari bug
      // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
      setTimeout(function () {
        event.target.select()
      }, 0)
    }
  }
}
</script>

<style scoped>
.search-form {
  display: block;
  padding: 0;
}
.search-bar button {
  margin: 0;
  height: 1.5rem;
  line-height: 1.5rem;
}
.search-bar input {
  height: 1.5rem;
  line-height: 1.5rem;
}
.search-bar select {
  margin: 0;
  height: 1.5rem;
  line-height: auto;
  padding: 0 .25rem 0;
}
.locator-holder {
  padding: 0 0 1rem;
}
</style>
