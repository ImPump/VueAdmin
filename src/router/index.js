import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Menu from '../views/sys/Menu.vue'
import Role from '../views/sys/Role.vue'
import User from '../views/sys/User.vue'


// import Login from '../views/Login.vue' //可采用懒加载方式，此时不需要你引入

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
    {
        path: 'index',
        name: 'Index',
        meta: {
          title:"首页"
        },
        component: Index
    },
    {
      path: '/sys/menu',
      name: 'SysMenu',
      component: Menu
      },
      {
        path: '/sys/role',
        name: 'SysRole',
        component: Role
      },{
        path: '/sys/user',
        name: 'SysUser',
        component: User
      },
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
