# Restaurants

## 1. Sujet

À partir d'un TP déjà réalisé, nous avons plusieurs objectifs à faire en plus d'une marge de manœuvre assez libre : 

1. Refaire l'interface graphique du TP2/3 de manière ergonomique, en utilisant des composants graphiques issus d'une des bibliothèques graphiques disponibles pour VueJS (vue-material, vuetify, elements, etc.). Je suggère par exemple de mettre un menu sur la gauche, le tableau au centre, etc.

2. Afficher plus d'informations que le nom et la cuisine, par exemple la ville (Borough). Regardez avec la bibliothèque graphique choisie comment afficher un message "aucun restaurant ne correspond à votre recherche" si le nom que vous cherchez n'existe pas.

3. Vous rajouterez un bouton "détails" dans chaque ligne du tableau. Quand on clique dessus, on naviguera vers /RestaurantDetail?id=xxxxxxxxx et on verra le détail du restaurant dont l'id est passé en paramètres. A vous de voir si vous allez refaire un fetch dans la BD pour récupérer à nouveau les détails du restaurant cliqué, ou si vous préférez passer les informations à afficher autrement (sous forme de props ?)

4. Dans le composant RestaurantDetail vous afficherez les informations détaillées sur le restaurant. Une photo (prise au hasard sur le web), une vidéo (optionnel), une carte OpenStreetMap ou GoogleMap avec le restaurant visible dessus (à partir de sa longitude et latitude). A vous de vous débrouiller pour trouver un composant VueJS sur le web qui va vous permettre de faire cela.

5. Ensuite No Limit si vous voulez vous amuser : persistence (plats dans MongoDB -> rajouter requêtes et WebServices), authentification (au programme du M2 avec tokens etc., mais si vous voulez déjà essayer simplement avec collection des utilisateurs dans MongoDB, requêtes et WebServices), faites ce que vous sentez...

## 2. Les points "remarquables" de notre projet

Pour ce projet, nous avons eu l'idée de partir d'un site dit "traditionnel", quelque chose de simple mais de fonctionnel. Nous avons ajouté : 
1. Page d'accueil avec un TOP 5
2. Un formulaire d'ajout de restaurant externe à la liste
3. Une refonte du menu et de la barre de navigation

### Page d'accueil et TOP 5

Ainsi nous avons ajouté une page d'accueil contenant un TOP 5 des meilleurs restaurant du moment. Pour le faire nous avons simplement fait une refonte de la page Hello World pour la transformer en page d'accueil. Pour le TOP 5, nous avons pris un Bottom Bar déjà fait de vue-matérial (lien: https://www.creative-tim.com/vuematerial/components/bottom-bar).

### Ajouter un restaurant

Pour l'Ajout d'un restaurant, on ne voyait pas vraiment pourquoi avoir mis le formulaire directement au dessus du tableau. De ce fait nous avons décidé de l'exporter dans un autre component. 

### Refonte de la barre de navigation

Pour la barre de navigation nous voulions quelque chose de sobre car cela ne devait pas gêner l'utilisateur. Alors nous avons opté pour un menu à gauche et sous forme d'icône. A l'intérieur, il y a les bons liens mais sous forme de bouton avec eux aussi des icônes pour avoir une aide visuel. 

Dans ce principe, nous voulions aussi différencier le haut du site qui ne bougera pas en fonction des pages, du bas du site qui change en fonction des components appelés via les routes. De ce fait, nous avons la barre de navigation en couleur. 
