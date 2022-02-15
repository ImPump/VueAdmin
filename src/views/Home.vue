<template>
  <el-container>
    <el-aside width="201px">
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
              <el-dropdown-item>
                <router-link :to="{name:'UserCenter'}">个人中心 </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="{name:'PassWord'}">修改密码 </router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- <el-link href="#">源码</el-link>
          <el-link href="#">笔记</el-link> -->
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
        id: "",
        username: "",
        avatar: "",
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$axios.get("/sys/userInfo").then((res) => {
        this.userInfo = res.data.data;
      });
    },
    logout(){
      this.$axios.post("/logout").then((res) => {
        localStorage.clear();
        sessionStorage.clear();

        this.$store.commit("resetState")

        this.$router.push("/login")
      })
    }
  },
};
</script>

<style scoped>
/* 设置容器高度 */
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
  width: 120px;
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
  