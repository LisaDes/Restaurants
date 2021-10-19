<template>
  <div class="hello">
    <h1>Nombre de restaurants : {{ totalRestaurant }}</h1>
    <p>
      Chercher par nom :
      <input @input="chercherRestaurant()" type="text" v-model="nomRecherche" />
    </p>
        <p>
      Chercher par ville :
      <input @input="chercherRestaurant()" type="text" v-model="villeRecherche" />
    </p>

    <p>
      Nombre de restaurant par page :
      <input
        @change="getRestaurantFromServer()"
        type="range"
        min="2"
        max="100"
        value="10"
        v-model="pageSize"
      />{{ pageSize }}
    </p>
    <md-button
      class="chgtPage md-raised"
      :disabled="page === 1"
      @click="pagePrecedent()"
      >Précédent</md-button
    >&nbsp;&nbsp;
    <md-button
      class="chgtPage md-raised"
      :disabled="page === nbPageTotal"
      @click="pageSuivante()"
      >Suivant</md-button
    >
    <p>Page {{ page }} sur {{ nbPageTotal }}</p>
    <br />
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nom" md-sort-by="name">{{
          item.name
        }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
          item.cuisine
        }}</md-table-cell>
        <md-table-cell md-label="Ville" md-sort-by="ville">{{
          item.borough
        }}</md-table-cell>
        <md-table-cell md-label="Note la plus récente" md-sort-by="note">{{
          item.grades[0].score
        }}</md-table-cell>
        <md-table-cell md-label="Actions">
          <router-link :to="'/restaurant/' + item._id">[Détail]</router-link>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-button class="md-raised" :disabled="page === 0" @click="pagePrecedent()"
      >Précédent</md-button
    >&nbsp;&nbsp;
    <md-button
      class="md-raised"
      :disabled="page === nbPageTotal"
      @click="pageSuivante()"
      >Suivant</md-button
    >&nbsp;
    <p>Page {{ page }} sur {{ nbPageTotal }}</p>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "ListeDesRestaurants",
  data: function () {
    return {
      restaurants: [],
      name: "",
      cuisine: "",
      totalRestaurant: 0,
      page: 1,
      pageSize: 10,
      nbPageTotal: 0,
      nomRecherche: "",
      villeRecherche:""
    };
  },
  methods: {
    pagePrecedent() {
      if (this.page === 1) return;
      this.page--;
      this.getRestaurantFromServer();
    },
    pageSuivante() {
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantFromServer();
    },
    getRestaurantFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pageSize;
      url += "&name=" + this.nomRecherche;

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.totalRestaurant = resJS.count;
            this.nbPageTotal = Math.round(this.totalRestaurant / this.pageSize);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    chercherRestaurant: _.debounce(function () {
      this.getRestaurantFromServer();
    }, 300),

    supprimerRestaurant(index) {
      this.restaurants.splice(index, 1);
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },
  mounted() {
    this.getRestaurantFromServer();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.phone-viewport {
  width: 322px;
  height: 200px;
  display: inline-flex;
  align-items: flex-end;
  overflow: hidden;
  border: 1px solid rgba(#000, 0.26);
  background: rgba(#000, 0.06);
}
.chgtPage {
  display:inline-block;
  align-content: left;
  align-items: left;
  justify-content: center;
}

</style>
