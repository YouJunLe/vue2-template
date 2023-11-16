import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Three3DPcd from '../views/Three3DPcd.vue'
import Three3DPly from '../views/Three3DPly.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/pcd',
    name: 'threePCD',
    component: Three3DPcd
  },
  {
    path: '/ply',
    name: 'threePLY',
    component: Three3DPly
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
