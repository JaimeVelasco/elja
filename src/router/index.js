import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendario from '../views/Calendario.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'calendario',
    component: Calendario
  },
  {
    path: '/lista',
    name: 'lista',
    // route level code-splitting
    // this generates a separate chunk (lista.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "lista" */ '../views/Lista.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
