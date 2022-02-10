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

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-operation"></i>
        <span>系统管理</span>
      </template>

      <router-link to="/sys/user">
        <el-menu-item index="1-1">
          <i class="el-icon-s-custom"></i>
          <template slot="title">用户管理</template>
        </el-menu-item>
      </router-link>

      <router-link to="/sys/role">
        <el-menu-item index="1-2">
          <i class="el-icon-rank"></i>
          <template slot="title">角色管理</template>
        </el-menu-item>
      </router-link>

      <router-link to="/sys/menu">
        <el-menu-item index="1-3">
          <i class="el-icon-menu"></i>
          <template slot="title">菜单管理</template>
        </el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>系统工具</span>
      </template>
      <el-menu-item index="2-1">
        <i class="el-icon-s-order"></i>
        <template slot="title">数字字典</template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
</style>