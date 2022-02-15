import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Menu from '../views/sys/Menu.vue'
import Role from '../views/sys/Role.vue'
import User from '../views/sys/User.vue'



// import Login from '../views/Login.vue' //可采用懒加载方式，此时不需要你引入
// import UserCenter from '../views/sys/UserCenter.vue'

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
        component: Index,
        meta: {
          title:"首页"
        },
    },
    {
      path: '/userCenter',
      name: 'UserCenter',
      component: () => import('../views/sys/UserCenter.vue'),
      meta: {
        title:"个人中心"
      },
    },
    {
      path: '/PassWord',
      name: 'PassWord',
      component: () => import('../views/sys/PassWord.vue'),
      meta: {
        title:"修改密码"
      },
    },
    {
      path: '/sys/menu',
      name: 'SysMenu',
      component: Menu,
      meta: {
        title:"菜单管理"
      },
      },
      {
        path: '/sys/role',
        name: 'SysRole',
        component: Role,
        meta: {
          title:"角色管理"
      },
      },{
        path: '/sys/user',
        name: 'SysUser',
        component: User,
        meta: {
          title:"系统管理"
      },
      },
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      title:"登录账号"
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
