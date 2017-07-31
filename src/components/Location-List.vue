<template>
    <div class="location-list">
        <ul id="locations">
            <ListItem
                v-for="(location, index) in fetchedLocations"
                v-bind:location="location"
                v-bind:index="index"
                v-bind:key="location.id">
            </ListItem>
        </ul>
    </div>
</template>

<script>
import ListItem from './List-Item.vue'

export default {
  name: 'app',
  props: ['fetchedLocations'],
  methods: {},
  mounted () {
    console.log('List is mounted')
  },
  components: {
    ListItem
  }
}
</script>

<style scoped>
    .location-list {
        padding: 1rem;
        text-align: left;
    }
    ul {
        margin: 0;
        padding: 0;
    }
</style>