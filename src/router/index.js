import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      authRequise: true
    }
  },
  {
    path: '/recherche',
    name: 'Recherche',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Recherche.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profil.vue'),
    meta: {
      authRequise: true
    }
  },
  {
    path: '/recherche',
    name: 'Recherche',
    component: () => import(/* webpackChunkName: "about" */ '../views/Recherche.vue')
  },
  {
    path: '/singlePlant/:idPlant',
    name: 'SinglePlant',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/SinglePlant.vue')
  },
  {
    path: '/plants',
    name: 'Plants',
    component: () => import(/* webpackChunkName: "about" */ '../views/Plants.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.authRequise)) {
    if (!store.state.token) {
      next({ name: 'Login' })
    } else next()
  } else next()
})

export default router
