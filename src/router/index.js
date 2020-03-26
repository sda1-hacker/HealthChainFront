import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/Login.vue'
import register from '../views/login/Register.vue'
import admin from '../views/admin/Admin.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: admin
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: register
  }
]


const router = new VueRouter({
  mode:'history',
  base:__dirname,
  routes
})

export default router
