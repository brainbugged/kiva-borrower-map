<template>
    <div id='locator'>
      <button v-on:click="getLocation">i am here</button>
        <h2 id="userLocation"></h2>
    </div>
</template>

<script type="text/javascript">
export default {
  name: 'userLocate',
  data () {
    return {
      // userLocate: {}
    }
  },
  methods: {
    locatorDiv: function () {
      return document.getElementById('userLocation')
    },
    getLocation: function () {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(this.showPosition)
      } else {
        this.locatorDiv().innerHTML = 'Geolocation is not supported by this browser.'
      }
    },
    showPosition: function (position) {
      this.locatorDiv().innerHTML = 'Latitude: ' + position.coords.latitude +
        '<br>Longitude: ' + position.coords.longitude

      this.$emit('getLocation', position.coords)
    }
  }
}
</script>
