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
    // locatorDiv: document.getElementById('userLocation'),
    // trying to translate html5 geolocation code to vue??s
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

      // returns userLocation so it can be used the center the map?
      console.log(position)
      // let userLocation = {'lat': position.coords.latitude,
      //   'lng': position.coords.longitude
      // }
      // return userLocation
    }
  }
}
</script>
