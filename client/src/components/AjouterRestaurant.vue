<template>
  <div>
    <h1>Formulaire d'ajout d'un restaurant</h1> &nbsp;

    <form @submit.prevent="ajouterRestaurant($event)">
      <label>
        Nom : <input name="name" type="text" required v-model="name" > 
      </label>
      &nbsp;
      <label>
        Cuisine : <input name="cuisine" type="text" required v-model="cuisine"> 
      </label>
       &nbsp;
      <label>
        Ville : <input name="borough" type="text" required v-model="borough"> 
      </label>
      <p> <md-button type="submit">Ajouter </md-button> </p>
    </form>

    <h2> {{ msg }} </h2>
    <h1>Nombre de restaurants : {{ totalRestaurant }}</h1>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: 'AjouterRestaurant',
  props: {
    
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  data: function () {
    return {
      restaurant:[],
      name: "",
      cuisine: "",
      borough: "",
      totalRestaurant: 0,
      msg:"",
    }
  },
  methods : {
    /** fonction pour récupérer les données de restaurants dans la base de données */
    getRestaurantFromServer() {
      let url = "http://localhost:8080/api/restaurants?";

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.totalRestaurant = resJS.count;
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    /** fonction pour ajouter un restaurant à la base de données */
    ajouterRestaurant($event) {
      //event.preventDefault();
      console.log("entrée dans l'ajout");
      let form = $event.target;
      let donneesFormulaire = new FormData(form);
      console.log(donneesFormulaire);
      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
          method: "POST",
          body: donneesFormulaire,
      })
      .then((responseJSON) => {
        responseJSON.json().then((resJS) => {
            console.log(resJS.msg);
            this.msg = resJS.msg;
            //this.getRestaurantFromServer();
          });
      })
      .catch((err) => {
        console.log("erreur dans l'ajout "+err);
      });

      //vider les champs après saisie
      this.name = "";
      this.cuisine = "";
      this.borough = "";
    }
  },

  mounted() {
    console.log("AVANT AFFICHAGE / AVANT RENDU HTML");
    this.getRestaurantFromServer();
    console.log("apres maj");
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
