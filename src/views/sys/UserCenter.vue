<template>
  <el-descriptions
    class="margin-top"
    title="个人中心（随机生成数据）"
    :column="3"
    :size="size"
    border
  >
    <template slot="extra">
      <el-button
        type="primary"
        size="small"
      >操作</el-button>
    </template>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        真实姓名
      </template>
      {{userInfo.chinesename}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        身份证号
      </template>
      {{userInfo.id}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-collection"></i>
        籍贯
      </template>
      {{userInfo.province}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      {{userInfo.phone}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-takeaway-box"></i>
        邮箱
      </template>
      {{userInfo.email}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-position"></i>
        ip地址
      </template>
      {{userInfo.ip}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      {{userInfo.address}} 中山大道 1188 号
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: "UserCenter",
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        chinesename: "",
        phone: "",
        province: "",
        address: "",
        email: "",
        ip: "",
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
  },
};
</script>

<style>
.el-descriptions {
  margin-top: 20px;
  padding: 0 20px;
  text-align: center;
}
</style>