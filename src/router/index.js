
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/Login.vue'
import register from '../views/login/Register.vue'
import admin from '../views/admin/Admin.vue'
import adminManage from '../views/admin/adminManage.vue'
import blockInfo from '../views/admin/blockInfo.vue'
import getData from '../views/admin/getData.vue'
import logManage from '../views/admin/logManage.vue'
import organManage from '../views/admin/organManage.vue'
import organVerify from '../views/admin/organVerify.vue'
import serviceManage from '../views/admin/serviceManage.vue'
import serviceVerify from '../views/admin/serviceVerify.vue'
import userManage from '../views/admin/userManage.vue'
import wallet from '../views/admin/wallet.vue'

import userInfo from '../views/admin/userInfo.vue'

import organizationOrg from "../views/organization/Organization.vue"
import authenticationOrg from '../views/organization/authentication.vue'
import getDataOrg from '../views/organization/getData.vue'
import myInfoOrg from '../views/organization/myInfo.vue'
import serviceManageOrg from '../views/organization/serviceManage.vue'
import uploadDataOrg from '../views/organization/uploadData.vue'
import walletOrg from '../views/organization/wallet.vue'
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
  },
  {
    path: '/admin',
    component: admin
  },
  {
    path:'/adminManage',
    component:adminManage
  },
  {
    path: '/organizationOrg',
    component: organizationOrg
  },
  {
    path:'/blockInfo',
    component:blockInfo
  },
  {
    path:'/getData',
    component:getData
  },
  {
    path:'/logManage',
    component:logManage
  },
  {
    path:'/organManage',
    component:organManage
  },
  {
    path:'/organVerify',
    component:organVerify
  },
  {
    path:'/serviceManage',
    component:serviceManage
  },
  {
    path:'/serviceVerify',
    component:serviceVerify
  },
  {
    path:'/userManage',
    component:userManage
  },
  {
    path:'/wallet',
    component:wallet
  },
  {
    path:'/authenticationOrg',
    component:authenticationOrg
  },
  {
    path:'/getDataOrg',
    component:getDataOrg
  },
  {
    path:'/myInfoOrg',
    component:myInfoOrg
  },
  {
    path:'/serviceManageOrg',
    component:serviceManageOrg
  },
  {
    path:'/uploadDataOrg',
    component:uploadDataOrg
  },
  {
    path:'/walletOrg',
    component:walletOrg
  },
  {
    path: '/userInfo',
    component: userInfo
  }
]
const router = new VueRouter({
  mode:'history',
  base:__dirname,
  routes
})

/* 挂载路由导航守卫，防止访问没有权限的页面 */
router.beforeEach((to, from, next) => {
  if(to.path === '/login' || to.path === '/register'){
    next()
    return;
  }
  const token = window.sessionStorage.getItem('token')
  // 如果token不存在，则重定向到登录页面
  if(!token) next('/login')
  next()
})

export default router
