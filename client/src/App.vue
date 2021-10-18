<template>
  <div id="app">
    <div id="menu">
      <md-menu md-direction="bottom-end" :mdCloseOnClick="closeOnClick" md-offset-x=20>
        <md-button md-menu-trigger class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item to='/'>Home</md-menu-item>
          <md-menu-item to='/restaurants'>Liste des Restaurants</md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
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
#menu{
  text-align: left;
}
#marque{
  text-align: center;
}
</style>
