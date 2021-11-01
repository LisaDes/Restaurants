<template>
  <div id="app">
    <h1>LiWen Kouizine</h1>
    <div id="menu" style="  background-color: #D375FF;">
      <md-menu md-direction="bottom-end">
        <md-button md-menu-trigger class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item to='/' >
            <md-icon>home</md-icon>
            Home
          </md-menu-item>
          <md-menu-item to='/ListeDesRestaurants'>
            <md-icon>view_list</md-icon>
            Liste des Restaurants
          </md-menu-item>
          <md-menu-item to='/AjouterUnRestaurant'>
            <md-icon>add</md-icon>
            Ajouter un restaurant
          </md-menu-item>
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
  background-image: url('https://newcastlebeach.org/image/restaurant-background/2383785.html');
}
#menu{
  text-align: left;
}
</style>
