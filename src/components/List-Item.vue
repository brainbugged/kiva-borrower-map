<template>
    <li>
        <h4>{{ location.name }}</h4>
        <small>{{ location.coordinates.latitude }} / {{ location.coordinates.longitude }}</small>
    </li>
</template>

<script>
export default {
  name: 'app',
  props: ['location']
}
</script>

<style scoped>
    li {
        list-style-type: none;
        border-top: 1px solid #CCC;
        padding: .5rem 0;
    }
    
    h4 {
        margin: 0;
    }
</style>