import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/Login.vue'
import register from '../views/login/Register.vue'
import admin from '../views/admin/Admin.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/admin',
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

/* 挂载路由导航守卫，防止访问没有权限的页面 */
// router.beforeEach((to, from, next) => {
//   if(to.path === '/login') next()
//   const token = window.sessionStorage.getItem('token')
//   // 如果token不存在，则重定向到登录页面
//   if(!token) next('/login')
//   next()
// })

export default router
