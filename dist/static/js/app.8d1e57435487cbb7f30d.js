webpackJsonp([1],[,,,,,,,,,function(t,e,n){"use strict";var o=n(3),a=n(53),i=n(44),s=n.n(i);o.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"Borrower Map",component:s.a}]})},function(t,e){},function(t,e,n){function o(t){n(38)}var a=n(1)(n(31),n(50),o,null,null);t.exports=a.exports},,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),a=n(11),i=n.n(a),s=n(9);n(10),o.a.config.productionTip=!1,new o.a({el:"#app",router:s.a,template:"<App/>",components:{App:i.a}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(46),a=n.n(o),i=n(12),s=(n.n(i),n(47)),c=n.n(s);e.default={name:"home",data:function(){return{msg:"Kiva US Borrowers",locations:[]}},components:{LocationList:a.a,MapView:c.a},methods:{fetchLocations:function(t){var e=this,n=this;console.log(t),i.get("/locations").then(function(t){console.log(t),t.data.forEach(function(t){n.locations.push(t)},e)})}},mounted:function(){console.log("Home is mounted"),this.fetchLocations("test query")},beforeCreate:function(){console.log("BEFORE Home is created")}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"list-item",props:["location"]}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(45),a=n.n(o);e.default={name:"list",props:["fetchedLocations"],methods:{},mounted:function(){console.log("List is mounted")},components:{ListItem:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(42),a=n.n(o);e.default={name:"map",data:function(){return{}},props:["fetchedLocations"],methods:{initalizeMap:function(){this.mapView=a.a.map("map").setView({lat:37.8043722,lng:-122.2708026},13);a.a.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',maxZoom:18}).addTo(this.mapView)},displayLocations:function(){console.log(this.mapView);var t=this;this.fetchedLocations.forEach(function(e,n){var o=e;a.a.circleMarker([o.coordinates.latitude,o.coordinates.longitude],{radius:9,stroke:!1,fillOpacity:.8,fillColor:"#63a541"}).addTo(t.mapView).bindPopup(o.name)})}},mounted:function(){console.log("map is mounted"),this.initalizeMap(),this.displayLocations()},beforeUpdate:function(){console.log("before map update")}}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,function(t,e,n){function o(t){n(36)}var a=n(1)(n(32),n(48),o,null,null);t.exports=a.exports},function(t,e,n){function o(t){n(37)}var a=n(1)(n(33),n(49),o,"data-v-3aedcf1c",null);t.exports=a.exports},function(t,e,n){function o(t){n(39)}var a=n(1)(n(34),n(51),o,"data-v-7ef750f0",null);t.exports=a.exports},function(t,e,n){function o(t){n(40)}var a=n(1)(n(35),n(52),o,null,null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"map-holder"},[n("MapView",{attrs:{fetchedLocations:t.locations}})],1),t._v(" "),n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("div",{staticClass:"list-holder"},[n("LocationList",{attrs:{fetchedLocations:t.locations}})],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("h4",[t._v(t._s(t.location.name))]),t._v(" "),n("small",[t._v(t._s(t.location.coordinates.latitude)+" / "+t._s(t.location.coordinates.longitude))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pageWrap",attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"location-list"},[n("ul",{attrs:{id:"locations"}},t._l(t.fetchedLocations,function(t,e){return n("ListItem",{key:t.id,attrs:{location:t,index:e}})}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{attrs:{id:"map"}})},staticRenderFns:[]}}],[30]);
//# sourceMappingURL=app.8d1e57435487cbb7f30d.js.map