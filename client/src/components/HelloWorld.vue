<template>
  <div id="accueil">
    <h1 style="text-align:center">{{msg}}</h1>
    <div>
      <h2 style="margin-left:20px">TOP 5 des restaurants du moment</h2>
      
      <div class="phone-viewport">
        <md-bottom-bar md-sync-route>
          <img src="../assets/Test.jpg">
          <md-bottom-bar-item :to="'/restaurant/'+this.restaurants[0]._id"  md-label="Détails" md-icon="info"></md-bottom-bar-item>
          <md-bottom-bar-item  exact :md-label="this.restaurants[0].name"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Favoris" md-icon="favorite"></md-bottom-bar-item>
          </md-bottom-bar>
      </div>
      <div class="phone-viewport">
        <md-bottom-bar md-sync-route >
          <img src="../assets/Test.jpg">
          <md-bottom-bar-item :to="'/restaurant/'+ this.restaurants[1]._id" exact md-label="Détails" md-icon="info"></md-bottom-bar-item>
          <md-bottom-bar-item :md-label="this.restaurants[1].name"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Favoris" md-icon="favorite"></md-bottom-bar-item>
          </md-bottom-bar>
      </div>
      <div class="phone-viewport">
        <md-bottom-bar md-sync-route>
          <img src="../assets/Test.jpg">
          <md-bottom-bar-item :to="'/restaurant/'+ this.restaurants[2]._id" exact md-label="Détails" md-icon="info"></md-bottom-bar-item>
          <md-bottom-bar-item :md-label="this.restaurants[2].name"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Favoris" md-icon="favorite"></md-bottom-bar-item>
          </md-bottom-bar>
      </div>
      <div class="phone-viewport">
        <md-bottom-bar md-sync-route>
          <img src="../assets/Test.jpg">
          <md-bottom-bar-item :to="'/restaurant/'+ this.restaurants[3]._id" exact md-label="Détails" md-icon="info"></md-bottom-bar-item>
          <md-bottom-bar-item :md-label="this.restaurants[3].name"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Favoris" md-icon="favorite"></md-bottom-bar-item>
          </md-bottom-bar>
      </div>
      <div class="phone-viewport">
        <md-bottom-bar md-sync-route>
          <img src="../assets/Test.jpg">
          <md-bottom-bar-item :to="'/restaurant/'+ this.restaurants[4]._id" exact md-label="Détails" md-icon="info"></md-bottom-bar-item>
          <md-bottom-bar-item :md-label="this.restaurants[4].name"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Favoris" md-icon="favorite"></md-bottom-bar-item>
         </md-bottom-bar>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  name: 'Accueil',
  props: {
    msg: String
  },
  data: function(){
     return {
       restaurants:[5]
     }
  },
  mounted() {
    this.getRestaurantFromServer();
  },methods: {
    getRestaurantFromServer() {
      let url = "http://localhost:8080/api/restaurants?";

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json()
            .then((resJS) => {
              // Maintenant res est un vrai objet JavaScript
              this.restaurants = resJS.data;
              this.totalRestaurant = resJS.count;
              this.nbPageTotal = Math.round(this.totalRestaurant / this.pageSize);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #accueil{
    text-align: left;
  }

  .phone-viewport {
    width: 250px;
    height: 200px;
    display: inline-flex;
    align-items: baseline;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
    margin-left:15px;
  }
</style>
