import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default{
  state: {
    menuList: [],
    permList:[],

    hasRoute :false,

    inputValue: "Index",
    dynamicTags: [
        {
          title: "首页",
          name: "Index",
        },
        {
          title: "用户管理",
          name: "SysUser",
        },
        {
          title: "角色管理",
          name: "SysRole",
        },
        {
          title: "菜单管理",
          name: "SysMenu",
        },
      ],
  },
  mutations: {
    setMenuList(state, menus){
        state.menuList = menus;
    },
    setPermList(state, perms){
        state.permList = perms;
    },

    changeRouteStatus(state,hasRoute){
        state.hasRoute = hasRoute;
        sessionStorage.setItem("hasRoute",hasRoute);
    }
  },
  actions: {
  },

}
