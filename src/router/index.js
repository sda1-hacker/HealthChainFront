import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import Reg from '../views/login/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Reg',
    name: 'Reg',
    component: Reg
  }
]


const router = new VueRouter({
  routes
})

export default router
