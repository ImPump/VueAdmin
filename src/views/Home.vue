<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <strong>VueAdmin后台管理系统</strong>
        <div class="header-avatar block">
          <!-- 头像 -->
          <el-avatar
            class="el-avatar"
            size="medium"
            :src="userInfo.avatar"
          ></el-avatar>
          <!-- 下拉菜单 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-link href="https://space.bilibili.com/13491144">视频讲解</el-link>
          <el-link href="http://markerhub.com">网站</el-link>
        </div>
      </el-header>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "./inc/SideMenu.vue";
export default {
  components: { SideMenu },
  name: "Home",
  data() {
    return {
      userInfo: {
        id: "-1",
        username: "admin",
        avatar: "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
      },
    };
  },
  created () {
    this.getUerInfo()
  },
  methods: {
    getUerInfo(){
      this.$axios.get("sys/userInfo").then(res => {
        this.userInfo = res.data.data
      })
    }
  }
};
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
  background-color: #ddd;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
}

.el-main {
  background-color: #ddd;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* 变成小手 */
.el-dropdown-link {
  cursor: pointer;
}

.el-header {
  background-color: #7cd;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>          
  