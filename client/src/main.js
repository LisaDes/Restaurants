import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import HelloWorld from './components/HelloWorld.vue'
import ListeDesRestaurants from './components/ListeDesRestaurants.vue'
import Restaurant from './components/Restaurant.vue'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueRouter)

//on définit une route
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: ListeDesRestaurants
    },{
      path: '/hello',
      component: HelloWorld,
      props:{
        msg: "Coucou la MIAGE"
      }
    },{
      path: '/restaurant/:id',
      component: Restaurant
    }
  ],
  mode: 'history'
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
