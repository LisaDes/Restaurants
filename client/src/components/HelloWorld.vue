<template>
  <div id="hello">
    <h1 style="text-align:center">{{msg}}</h1>
    <div>
      <h2 style="margin-left:20px">TOP 5 des restaurants du moment</h2>
      
      <div class="phone-viewport">
        <md-bottom-bar md-sync-route>
          <img src="../assets/Test.jpg">
          <md-bottom-bar-item to="/restaurant/61498206b78fc79dd36f722e" exact md-label="Détails" md-icon="info"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Restaurant"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Favoris" md-icon="favorite"></md-bottom-bar-item>
          </md-bottom-bar>
      </div>
      <div class="phone-viewport">
        <md-bottom-bar md-sync-route>
          <img src="../assets/Test.jpg">
          <md-bottom-bar-item to="/restaurant/61498206b78fc79dd36f722e" exact md-label="Détails" md-icon="info"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Restaurant"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Favoris" md-icon="favorite"></md-bottom-bar-item>
          </md-bottom-bar>
      </div>
      <div class="phone-viewport">
        <md-bottom-bar md-sync-route>
          <img src="../assets/Test.jpg">
          <md-bottom-bar-item to="/restaurant/61498206b78fc79dd36f722e" exact md-label="Détails" md-icon="info"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Restaurant"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Favoris" md-icon="favorite"></md-bottom-bar-item>
          </md-bottom-bar>
      </div>
      <div class="phone-viewport">
        <md-bottom-bar md-sync-route>
          <img src="../assets/Test.jpg">
          <md-bottom-bar-item to="/restaurant/61498206b78fc79dd36f722e" exact md-label="Détails" md-icon="info"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Restaurant"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Favoris" md-icon="favorite"></md-bottom-bar-item>
          </md-bottom-bar>
      </div>
      <div class="phone-viewport">
        <md-bottom-bar md-sync-route>
          <img src="../assets/Test.jpg">
          <md-bottom-bar-item to="/restaurant/61498206b78fc79dd36f722e" exact md-label="Détails" md-icon="info"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Restaurant"></md-bottom-bar-item>
          <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Favoris" md-icon="favorite"></md-bottom-bar-item>
         </md-bottom-bar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    this.getRestaurantFromServer();
  },methods: {
    getRestaurantFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pageSize;
      url += "&name=" + this.nomRecherche;

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
  #hello{
    text-align: left;
  }

  .phone-viewport {
    width: 250px;
    height: 200px;
    display: inline-flex;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
    margin-left:15px;
  }
</style>
