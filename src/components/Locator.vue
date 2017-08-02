<template>
    <div id='locator'></div>
</template>

<script>
export default {
  name: 'userLocate',
  // is this how to register button to appear in the #locator?
  template: '<button onclick="getLocation()">i am here</button>',
  data () {
    return {
      // userLocate: {}
    }
  },
  methods: {
    // why is compiler saying 'let is a reserved word?' when I'm trying to make it a variable?
    let locatorDiv = document.getElementById('locator')

    // trying to translate html5 geolocation code to vue??s
    getLocation: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        locatorDiv.innerHTML = 'Geolocation is not supported by this browser.'
      }
    },
    showPosition: function (position) {
      locatorDiv.innerHTML = 'Latitude: ' + position.coords.latitude +
        '<br>Longitude: ' + position.coords.longitude

        // returns userLocation so it can be used the center the map?
        let userLocation = {'lat': position.coords.latitude,
          'lng': position.coords.longitude
        }
        return userLocation
      }
    }
  }

</script>
