window.onload = init;

function init() {
    new Vue({
        el: "#app",
        data: {
            restaurants: [
                /*{
                    nom: 'café de Paris',
                    cuisine: 'Française'
                },
                {
                    nom: 'Sun City Café',
                    cuisine: 'Américaine'
                }*/
            ],
            nom: '',
            cuisine: '',
            restaurantsNombreTotal: 0,
            NombrePage: 0,
            pageSize: 10,//par défaut la taille des pages est 10
            nbrPage: 0,
            valSlider: 5,
            msg: "",
            NomRestauRecherche: ""
        },
        mounted() {

            console.log("AVANT RENDU HTML");
            this.getRestaurantsFromServer();

        },
        methods: {
            ChercherRestaurant:
                //_.debounce() de Function dans lodash est utilisée pour créer une fonction anti -rebond 
                //qui retarde la fonction donnée jusqu'à ce que
                // le temps d'attente indiqué en millisecondes se soit écoulé
                //appelé que si on a pas tapé une touche pendant un certain délai car ça évite de surcharger le serveur
                //fonction anonyme 
                _.debounce(function () { this.getRestaurantsFromServer(); }, 1000),
            ActionPrecedent() {
                if (this.NombrePage === 0) return;//cad ne fait rien
                this.NombrePage--;
                this.getRestaurantsFromServer();
            },
            ActionSuivant() {
                if (this.NombrePage === this.DernierPage) return;//cad ne fait rien
                this.NombrePage++;
                this.getRestaurantsFromServer();
            },
            getRestaurantsFromServer() {

                let url = "http://localhost:8080/api/restaurants?";
                url += "page=" + this.NombrePage;
                url += "&pagesize=" + this.pageSize;
                url += "&name=" + this.NomRestauRecherche;
                // dans le cas de GET le fetch prend un seul parametre qui est url au contraire de POST
                fetch(url)
                    .then((responseJSON) => {
                        responseJSON.json().then((resJS) => {
                            // Maintenant res est un vrai objet JavaScript
                            //afficheReponseGET(res);
                            //  console.log(resJS);
                            this.restaurants = resJS.data;
                            this.restaurantsNombreTotal = resJS.count;
                            this.nbrPage = Math.round(this.restaurantsNombreTotal / this.pageSize);

                        });
                    })
                    .catch(function (err) {
                        console.log(err);


                    });
            },
            supprimerRestaurant(r) {
               // this.restaurants.splice(index, 1);
               let url = "http://localhost:8080/api/restaurants/" + r._id;
               fetch(url, {
                method: "DELETE",
            })
                // comme c'est est asynchrone on fait ça
                //=> cette notation remplace le mot clé fonction
                //là en fait on récupère une réponse JSON on la transforme  à un objet JS
                .then((responseJSON) => {
                    responseJSON.json()
                        .then((resJS) => {
                            // Maintenant res est un vrai objet JavaScript
                            console.log(resJS.msg);
                            this.msg = resJS.msg;
                            //on rafraichit la vue
                            this.getRestaurantsFromServer();
                        });
                })
                .catch(function (err) {
                    console.log(err);
                });
           
            },
            ajouterRestaurant(event) {
                // eviter le comportement par defaut
             //event.preventDefault();

                /* //ce code là il permet juste de remplire le tableau restaurant mais pas dans la BD
                this.restaurants.push(
                     {
                         name: this.nom,
                         cuisine: this.cuisine
                     }
                 );*/

                const newRestaurant=  {
                    name: this.nom,
                    cuisine: this.cuisine
                }
                
                // Récupération des toutes les valeurs des champs du formulaire
                // en prévision d'un envoi multipart en ajax/fetch
                //FormData est un API qui prend un formulaire comme parametre et qui permet de récupérer tout les données
                let donneesFormulaire = new FormData();
                donneesFormulaire.append("nom", newRestaurant.nom);
                donneesFormulaire.append("cuisine", newRestaurant.cuisine);

                let url = "http://localhost:8080/api/restaurants";
                // là dans le cas de POST fetch prend deux paramètre url et un 2eme parametre qui montre le type de methode (POST)
                //(car on veut insérer qqc)
                // et l'attribut body qui est le corp de la requete qui va contenir les donnees du formulaire 
                fetch(url, {
                    method: "POST",
                    body: donneesFormulaire
                })
                    // comme c'est est asynchrone on fait ça
                    //=> cette notation remplace le mot clé fonction
                    //là en fait on récupère une réponse JSON on la transforme  à un objet JS
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((resJS) => {
                                // Maintenant res est un vrai objet JavaScript
                                console.log(resJS.msg);
                                this.msg = resJS.msg;
                                //on rafraichit la vue
                                this.getRestaurantsFromServer();
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                this.nom = "";
                this.cuisine = "";
            },
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            }
        }
    })
}
