<template>
  <div>
    <h1>Formulaire d'ajout d'un restaurant</h1> &nbsp;

    <form @submit.prevent="ajouterRestaurant">
        <label>
            Nom : <input name="name" type="text" required v-model="name" > <slot></slot>
        </label>
        &nbsp;
        <label>
            Cuisine : <input name="cuisine" type="text" required v-model="cuisine"> <slot></slot>
        </label>
        <p>
        <md-button>Ajouter </md-button> </p>
    </form>

    <h2> {{msg}} </h2>
    <h1>Nombre de restaurants : {{ totalRestaurant }}</h1>
  </div>
</template>

<script>
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
      totalRestaurant: 0,
      score: 0,
      msg:"",
    }
  },
  
  
  methods : {
    /** fonction pour récupérer les données de restaurants dans la base de données */
    async getRestaurantFromServer() {
      let url = "http://localhost:8080/api/restaurants?";

      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.totalRestaurant = resJS.count;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /** fonction pour ajouter un restaurant à la base de données */
    async ajouterRestaurant(event) {
      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants?";

      fetch(url, {
          method: "POST",
          body: donneesFormulaire,
      })
      .then((responseJSON) => {
        responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraîchit la vue
            this.getRestaurantFromServer();
          });
      })
      .catch(function (err) {
        console.log(err);
      });

      //vider les champs après saisie
      this.name = "";
      this.cuisine = "";
    }
  },

  mounted() {
    console.log("Avant affichage")
    //console.log("ID = " + this.id)
    
    let url = "http://localhost:8080/api/restaurants/"+ this.id;
    fetch(url)
    .then(response => {
      return response.json();
    }).then(data => {
      this.restaurant = data.restaurant
      //console.log(data.restaurant.name)
      console.log(data.name)
    })
    this.getRestaurantFromServer();
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
