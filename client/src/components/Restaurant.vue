<template>
  <div>
    <img class="image" src="../assets/Test.jpg" />
    <h1>Détail du restaurant qui a pour id : {{ id }}</h1>
    <h1>Nom du restaurant : {{ restaurant.name }}</h1>
    <h1>Situé dans la ville : {{ restaurant.borough }}</h1>
    <h1>Note du restaurant : {{ restaurant.grades[0].score }}</h1>
    <h1>Localisation du restaurant :</h1>
    <iframe
      width="50%"
      height="50%"
      frameborder="0"
      allowfullscreen
      src="//umap.openstreetmap.fr/fr/map/new/?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false"
    >
    </iframe>
    <p><a href="//umap.openstreetmap.fr/fr/map/new/">Voir en plein écran</a></p>
  </div>
</template>

<script>
export default {
  name: "Restaurant",
  props: {
    
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      restaurant: null,
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
  methods: {},
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

</style>
