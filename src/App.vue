<template>
  <div id="app" class="pageWrap">
    <div class="xbLegacyNav">
      <div class="top-nav" role="navigation">
        <div class="row header-row">
          <div class="small-3 large-2 xxlarge-2 columns header-column logo-area">
            <a class="header-button" href="https://www.qa.kiva.org/">
              <svg class="icon icon-new-kiva-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-new-kiva-logo"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
