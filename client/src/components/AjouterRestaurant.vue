<template>
  <div>
    <h1>Formulaire d'ajout de restaurant</h1>
     <form @submit="ajouterRestaurant($event)">
        <label>
            Nom : <input name="nom" type="text" required v-model="name">
        </label>
        <label>
            Cuisine : <input name="cuisine" type="text" required v-model="cuisine">
        </label>

        <md-button>Ajouter</md-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Ajout Restaurant',
  props: {
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  data: function () {
    return {
      restaurant:null
    }
  },
  mounted() {
    console.log("Avant affichage")
    console.log("ID = " + this.id)
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
    .then(response => {
      return response.json();
    }).then(data => {
      console.log(data.restaurant.name)
      this.restaurant = data.restaurant
    })
  },
  methods : {
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
            }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
