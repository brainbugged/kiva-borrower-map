import Vue from 'vue'
// In simple cases you may want to create an Event Bus that can manage events across components
// - Importing this vue instance into your components will create a scaffold to $emit and watch ($on) events from
// * in more complex systems you will want to use vuex for state management
export default new Vue()
