<template>
  <div>
    <img class="image" src="../assets/Test.jpg" />
    <h2>Détail du restaurant qui a pour id : {{ id }}</h2>
    <h2>Nom du restaurant : {{ restaurant.name }}</h2>
    <h2>Situé dans la ville : {{ restaurant.borough }}</h2>
    <h2>Note du restaurant : {{ restaurant.grades[0].score }}</h2>
    <h2>
      Adresse du restaurant : {{ restaurant.address.building }},
      {{ restaurant.address.street }} , {{ restaurant.borough }}
      {{ restaurant.address.zipcode }}
    </h2>
    <h2>
      Coordonnées du restaurant : {{ restaurant.address.coord[0] }}
      {{ restaurant.address.coord[1] }}
    </h2>
    <h2>Localisation du restaurant :</h2>

    <div id="mapResto">
	    <!-- Ici s'affichera la carte -->
	  </div>
    
  </div>
</template>

<script>
export default {
  name: "Restaurant",
  props: {},
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      restaurant: null, 
      coordonnees: {
        lat:0,
        lng:0
      }
    };
  },
  mounted() {
    console.log("Avant affichage");
    console.log("ID = " + this.id);
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.restaurant.name);
        this.restaurant = data.restaurant;
      });
  },
  methods: {
    initMap() {
      //var lat = this.restaurant.address.coord[0];
      //var lon = this.restaurant.address.coord[1];
     
      
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  display: inline-flex;
  max-width: 100%;
  height: auto;
  width: 50%;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.mapResto{
  height: 500px;
}
</style>
