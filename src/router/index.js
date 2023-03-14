import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/registerUser.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import( '../views/Checkout.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import( '../views/Contact.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import( '../views/Admin.vue')
  },{
    path: '/singleProduct/:id',
    name: 'singleProduct',
    component: () => import( '../views/SingleProduct.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
