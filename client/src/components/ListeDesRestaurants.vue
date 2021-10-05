<template>
  <div class="hello">
    <form @submit="ajouterRestaurant($event)">
        <label>
            Nom : <input name="nom" type="text" required v-model="name">
        </label>
        <label>
            Cuisine : <input name="cuisine" type="text" required v-model="cuisine">
        </label>

        <md-button>Ajouter</md-button>
    </form>

    <h1>Nombre de restaurants : {{totalRestaurant}}</h1>
    <p>Chercher par nom : <input @input="chercherRestaurant()" type="text" v-model="nomRecherche"></p>
    <p>Nombre de page total : {{nbPageTotal}}</p>
    <p>Nombre de restaurant par page : 
        <input 
        @change="getRestaurantFromServer()"
        type="range" min=2 max=100 value=10 v-model="pageSize"
        >{{pageSize}}</p>
    <md-button class="md-raised" :disabled="page===0" @click="pagePrecedent()">Précédent</md-button>&nbsp;&nbsp;
    <md-button class="md-raised" :disabled="page===nbPageTotal" @click="pageSuivante()">Suivant</md-button>&nbsp;
    Page courante : {{page}}
    <br>
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Nom">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Cuisine">{{ item.cuisine }}</md-table-cell>
        </md-table-row>
    </md-table>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: 'ListeDesRestaurants',
  data: function() { 
            return {
                restaurants: [],
                name: '',
                cuisine: '',
                totalRestaurant: 0,
                page: 0,
                pageSize: 10,
                nbPageTotal: 0,
                nomRecherche: ''
            }
    },
        methods: {
            pagePrecedent() {
                if (this.page === 0) return;
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
            },
            chercherRestaurant:
                _.debounce(function () {
                    this.getRestaurantFromServer()
                }, 300),
            
            supprimerRestaurant(index) {
                this.restaurants.splice(index, 1);
            },
            ajouterRestaurant($event) {
                // Récupération du formulaire. Pas besoin de document.querySelector
                // ou document.getElementById puisque c'est le formulaire qui a généré
                // l'événement
                let form = $event.target;

                // Récupération des valeurs des champs du formulaire
                // en prévision d'un envoi multipart en ajax/fetch
                let donneesFormulaire = new FormData(form);

                let url = "http://localhost:8080/api/restaurants";

                fetch(url, {
                    method: "POST",
                    body: donneesFormulaire
                })
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((resJS) => {
                                // Maintenant res est un vrai objet JavaScript
                                console.log(resJS.msg)
                                this.getRestaurantFromServer();
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                this.name = "";
                this.cuisine = "";
            },
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            }
        },
        mounted() {
            this.getRestaurantFromServer();
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
