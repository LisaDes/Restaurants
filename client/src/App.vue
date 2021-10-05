<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ListeDesRestaurants msg="Coucou les M1"/>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ListeDesRestaurants from './components/ListeDesRestaurants.vue'

export default {
  name: 'App',
  components: {
    ListeDesRestaurants,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
