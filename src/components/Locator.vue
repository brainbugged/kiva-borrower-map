<template>
  <button class="button setting" v-on:click.prevent="getLocation">Near Me</button>
</template>

<script type="text/javascript">
export default {
  name: 'locator',
  methods: {
    locatorDiv: function () {
      return document.getElementById('userLocation')
    },
    getLocation: function () {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(this.showPosition)
      } else {
        // error handling
        // 'Geolocation is not supported by this browser.'
      }
    },
    showPosition: function (position) {
      this.$emit('getLocation', position.coords)
    }
  }
}
</script>
