<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#74787c"
    text-color="#fff"
    active-text-color="#7de"
  >
    <router-link to="/index">
      <el-menu-item index="0">
        <i class="el-icon-s-home"></i>
        <template slot="title">首页</template>
      </el-menu-item>
    </router-link>

    <el-submenu
      v-for="(menu, index) in menuList"
      :key="index"
      :index="index"
    >
      <template slot="title">
        <i :class="menu.icon"></i>
        <span>{{menu.title}}</span>
      </template>

      <router-link
        v-for="(item, index) in menu.children"
        :key="index"
        :to="item.path"
      >
        <el-menu-item :index="item.icon">
          <i :class="item.icon"></i>
          <template slot="title">{{item.title}}</template>
        </el-menu-item>
      </router-link>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {};
  },
  // 动态检测
  computed: {
    menuList: {
      get() {
        return this.$store.state.menus.menuList;
      },
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
</style>