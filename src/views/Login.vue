<template>
  <el-row type="flex" class="row-bg" justify="center">
    <!-- 左边介绍 -->
    <el-col :xl="6" :lg="7">
      <h2>欢迎来到VueAdmin管理系统</h2>
      <el-image
        :src="require('@/assets/logo.png')"
        style="heigth: 180px; with: 180px"
      ></el-image>

      <p>项目名：VueAdmin管理系统</p>
      <p>登录：用户名：test，密码：123456</p>
    </el-col>

    <!-- 中间分割线 -->
    <el-col :span="1">
      <el-divider direction="vertical" content-position="center"/>
    </el-col>

    <!-- 右侧表单 -->
    <el-col :xl="6" :lg="7">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code" style="width: 380px">
          <el-input
            v-model="loginForm.code"
            style="width: 172px; float: left"
          ></el-input>
          <el-image :src="captchaImg" class="captchaImg" ></el-image>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "test",
        password: "123456",
        code: "",
        token:"", //随机码
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {min: 3,max: 10,message: "长度在 3 到 10 个字符",trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {min: 6,max: 20,message: "长度在 6 到 20 个字符",trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 5, max: 5, message: "长度为 5 个字符", trigger: "blur" },
        ],
      },
      captchaImg:null,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //   alert("登录成功!");
        // 提交表单一般用post请求提交到后端
            this.$axios.post('/login',this.loginForm).then(res => {
                const jwt = res.headers['authorization']
                this.$store.commit('SET_TOKEN', jwt)
                this.$router.push("/index") //跳转路由
            })
        } else {
          console.log("验证码输入错误，登录失败!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha() {
         this.$axios.get('/captcha').then(res => {

             console.log('/captcha')
             console.log(res)

            //  res - code、msg、data
             this.loginForm.token = res.data.data.token
             this.captchaImg = res.data.data.captchaImg
        })
    },
  },
  //页面渲染时加载getCaptcha
    created() {
        this.getCaptcha()
    },

};
</script>

<style scoped>

    .el-row {
        display: flex;
        background-color: #fafafa;
        /* 整体居中 */
        height: 100vh;
        align-items: center;
        /* 图片居中 */
        text-align: center;
    }
    .el-divider {
        width: 1px;
        height: 200px;
    }

    /* 验证码 */
    .captchaImg {
        float: left;
        margin-left: 8px;
        border-radius: 4px;
    }
</style>