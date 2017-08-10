// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Include Some Global Styles + Icons
require('./assets/export/styles.css')
// require('styleguide/export/styles.css')
// require('styleguide/source/css/scss/app.scss')

// Inject icons into DOM
// > Update to pull in raw text of file and inject into dom (skip the ajax call)
// let icons = require('./assets/images/icons.svg')

// Ajax include
import * as axios from 'axios'
let icons = require('styleguide/export/images/icons.svg')
console.log(icons)

axios.get(icons)
  .then((data) => {
    insertIcons(data)
  })

let insertIcons = function (iconReq) {
  var div = document.createElement('div')
  div.innerHTML = iconReq.data
  document.body.insertBefore(div, document.body.childNodes[0])
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
