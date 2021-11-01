<template>
  <div>
    <h1>Détails du restaurant {{ restaurant.name }} </h1>
    &nbsp;&nbsp;
    <div name="details" class="md-layout md-gutter">

      <div class="md-layout-item">
        <img class="image" src="../assets/Test.jpg" />
      </div>

      <div class="md-layout-item">
        
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
      </div>

    </div>

    &nbsp;&nbsp;

    <h2>Localisation du restaurant :</h2>

    <div id="mapResto">
      <l-map name="carte" style="height: 300px; width: 400px; margin-left: auto; margin-right: auto;"
        :zoom="zoom"
        :center="centre"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="LMarker"></l-marker>
      </l-map>
    </div>

  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "Restaurant",
  components:{
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {},
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      restaurant: null, 
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: latLng(77.43952, -45.592834),
      LMarker: latLng(77.43952, -45.592834),
      zoom: 18,
      popupContent: "nom du resto",
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
        this.centre = latLng(this.restaurant.address.coord[1],this.restaurant.address.coord[0]);
        this.LMarker = this.centre;
        //this.popup = L.popup().setLatLng(latLng).setContent("hello").openOn(url);
        //this.LMarker.openPopup(popupContent,latLng);
      });
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.image {
  display: inline-flex;
  max-width: 100%;
  height: auto;
  width: 65%;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.md-layout-item{
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
}

</style>
