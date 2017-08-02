<template>
  <div class="search-bar">
    <div class="row header-row">
      <form class="search-form clearfix">
        <div class="small-12 medium-5 large-6 columns">
          <input v-model="searchTerm" v-on:focus="selectAll" class="custom-location" type="text" />
        </div>
        <div class="small-6 medium-4 large-3 columns">
          <select v-model="radius">
            <option value="1">Radius in Miles</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div class="small-6 medium-3 large-3 columns">
          <button v-on:click.prevent="geoCodeSearch" class="button setting">Search</button>
        </div>
      </form>
    </div>
  </div>
</template>

<<script>
export default {
  name: 'search',
  data () {
    return {
      radius: 1,
      searchTerm: 'Search by City, State or Zip Code',
      latitude: 37.8043722,
      longitude: -122.2708026
    }
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
  width: auto;
  padding: 1rem 0;
}
@media only screen and (min-width: 681px) {
  .top-nav .columns {
    /* width: inherit; */
  }
}
</style>
