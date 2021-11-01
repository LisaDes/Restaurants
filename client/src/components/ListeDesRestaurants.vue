<template>
  <div class="hello">
    <h1>Nombre de restaurants : {{ totalRestaurant }}</h1>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
      <p> Chercher par nom :
          <input type="text" v-model="nomRecherche" />
      </p> 
      <p> 
        <md-button class="md-raised" @click="chercherRestaurant()">Rechercher</md-button>
      </p> 
      </div>
      <div class="md-layout-item">
      <p> Nombre de restaurants par page :
        <input @change="getRestaurantFromServer()" type="range" min="2" max="100" value="10" v-model="pageSize"/>
        {{ pageSize }}
      </p>
      </div>
    </div>
    
    <md-button class="chgtPage md-raised" :disabled="page === 1" @click="pagePrecedent()">
      Précédent </md-button>
    &nbsp;&nbsp;
    <md-button class="chgtPage md-raised" :disabled="page === nbPageTotal" @click="pageSuivante()"> 
      Suivant</md-button>
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
        <md-table-cell md-label="Ville" md-sort-by="borough">{{
          item.borough
        }}</md-table-cell>
        <md-table-cell md-label="Note la plus récente" md-sort-by="score in restaurant.grades[0]" md-numeric>{{
          item.grades[0].score
        }}</md-table-cell>
        <md-table-cell md-label="Actions">
          <md-button class="md-primary">
            <router-link :to="'/restaurant/' + item._id">[Détail]</router-link>
          </md-button>
          <md-button class="md-accent" @click="supprimerRestaurant(item)">[Supprimer]</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <div v-if="totalRestaurant === 0">
      <md-empty-state
        md-icon="search"
        md-label="Aucun restaurant trouvé"
        md-description="Vérifiez l'orthographe et relancez votre recherche"
      >
      </md-empty-state>
    </div>

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
      villeRecherche: "",
      score: 0,
    };
  },
  methods: {
    /** fonction pour aller à la page précédente */
    pagePrecedent() {
      if (this.page === 1) return;
      this.page--;
      this.getRestaurantFromServer();
    },

    /** fonction pour aller à la page suivante */
    pageSuivante() {
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantFromServer();
    },

    /** fonction pour récupérer les données depuis le serveur */
    async getRestaurantFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pageSize;
      url += "&name=" + this.nomRecherche;
      //url += "&ville=" + this.villeRecherche;

      await fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.totalRestaurant = resJS.count;
            this.nbPageTotal = Math.round(this.totalRestaurant / this.pageSize);
          });
        })
        .catch((err) => {
          console.log("erreur dans la fonction getRestaurantFromServer "+err);
        });
    },

    /** fonction pour rechercher un restaurant dans la base de données*/
    chercherRestaurant: _.debounce(function() {
      this.page = 1; //pour revenir à la page 1 des restaurants
      this.getRestaurantFromServer();
    }, 300),

    /** fonction pour supprimer un restaurant de la base de données*/
    supprimerRestaurant(index) {
      this.restaurants.splice(index, 1);
      let url = "http://localhost:8080/api/restaurants/" + index._id;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            //on rafraichit la vue
            this.getRestaurantFromServer();
          });
        })
        .catch(function (err) {
          console.log("erreur dans le fetch de supprimerRestaurant "+err);
        });
    },

    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },

  async mounted() {
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
  display: inline-block;
  align-content: left;
  align-items: left;
  justify-content: center;
}
</style>
