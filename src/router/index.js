import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
// import Menu from '../views/sys/Menu.vue'
// import Role from '../views/sys/Role.vue'
// import User from '../views/sys/User.vue'

import axios from 'axios'
import store from '../store'

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
      component: () => import('@/views/sys/UserCenter.vue'),
      meta: {
        title:"个人中心"
      },
    },
    {
      path: '/PassWord',
      name: 'PassWord',
      component: () => import('@/views/sys/PassWord.vue'),
      meta: {
        title:"修改密码"
      },
    },
    // {
    //   path: '/sys/menu',
    //   name: 'SysMenu',
    //   component: Menu,
    //   meta: {
    //     title:"菜单管理"
    //   },
    //   },
    //   {
    //     path: '/sys/role',
    //     name: 'SysRole',
    //     component: Role,
    //     meta: {
    //       title:"角色管理"
    //   },
    //   },{
    //     path: '/sys/user',
    //     name: 'SysUser',
    //     component: User,
    //     meta: {
    //       title:"用户管理"
    //   },
    //   },
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


// 动态导航路由
router.beforeEach((to,from,next) => {

  let hasRoute = store.state.menus.hasRoute

  if (!hasRoute) {
    axios.get('/sys/menu/nav',{
      headers:{
        Authorization:localStorage.getItem('token')
      }
    }).then(res => {
      //动态绑定导航菜单
      //拿到MenuList
      store.commit('setMenuList',res.data.data.nav)
      //拿到用户权限
      store.commit('setPermList',res.data.data.authoritys)
  
      //动态绑定导航路由
      let newRoutes = router.options.routes
  
      res.data.data.nav.forEach(menu => {
        if(menu.children){
          menu.children.forEach(e => {
  
            //导航菜单转成路由
            let route = menuToRoute(e)
  
            //把路由添加到路由管理中，Home的子路由
            if (route) {
              newRoutes[0].children.push(route)
            }
          })
        }
      })
      // router.addRoutes(newRoutes)
      for(let i=0,length=newRoutes.length;i<length;i+=1){
        const element=newRoutes[i];
        router.addRoute(element);
      }

      hasRoute = true
      store.commit("changeRouteStatus",hasRoute)
    })
  }

  next();
})

// 导航转成路由
const menuToRoute = (menu) =>{
  // component为空直接返回
  if (!menu.component) {
    return null
  }

  let route = {
    name:menu.name,
    path:menu.path,

    meta: {
      icon:menu.icon,
      title:menu.title
    }
  }

  // 隐式导入路由
  route.component = () => import('@/views/' + menu.component + '.vue' )

  return route
}
export default router
