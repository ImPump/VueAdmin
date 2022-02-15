// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
// 参考：https://github.com/nuysoft/Mock/wiki/Mock.Random
const Random = Mock.Random
let Result = {
   code: 200,
   msg: '操作成功',
   data: null
}
/**
 * Mock.mock( url, post/get , function(options))；
 * url 表示需要拦截的 URL，
 * post/get 需要拦截的 Ajax 请求类型
 *
 * 用于生成响应数据的函数
 */
// 获取验证码图片base64编码以及一个随机码
Mock.mock('/captcha', 'get', () => {
   Result.data = {
      token: Random.string(32), // 获取一个32位的随机字符串,
      captchaImg: Random.dataImage('100x40', 'p7n5w') //生成验证码为11111的base64图片编码
   }
   return Result
})

Mock.mock('/login', 'post', () => {
   
    //无法在headers中传入jwt

    Result.code = 400
    Result.msg = '验证码错误'
    
    return Result
})

// 模拟接口
Mock.mock('/sys/userInfo', 'get', () => {
   
   Result.data = {
      id: Random.id(),
      username:Random.first(),
      chinesename:Random.cname(),
      phone:Random.string('number', 11, 11),
      province:Random.province(),
      address:Random.county(true),
      email: Random.email('163.com'),
      ip:Random.ip(),
      avatar: "https://joeschmoe.io/api/v1/male/random",
   }
    
    return Result
 })

 Mock.mock('/logout', 'post', () => {

   // Result.code = 
   // Result.msg = '退出登录'
   return Result
})

 Mock.mock('/sys/menu/nav', 'get', () => {
   
   let nav = [
      {
         name: "SysMange",
         title: "系统管理",
         icon: "el-icon-s-operation",
         path: "",
         component: "",
         children: [
           {
             name: "SysUser",
             title: "用户管理",
             icon: "el-icon-s-custom",
             path: "/sys/user",
             component: "sys/User",
             children: [],
           },
           {
             name: "SysRole",
             title: "角色管理",
             icon: "el-icon-rank",
             path: "/sys/role",
             component: "sys/Role",
             children: [],
           },
           {
             name: "SysMenu",
             title: "菜单管理",
             icon: "el-icon-menu",
             path: "/sys/menu",
             component: "sys/Menu",
             children: [],
           },
         ],
       },

       {
         name: "SysTools",
         title: "系统工具",
         icon: "el-icon-s-tools",
         path: "",
         component: "",
         children: [
           {
             name: "SysDict",
             title: "数字字典",
             icon: "el-icon-s-order",
             path: "/sys/dicts",
             component: "",
             children: [],
           },
         ],
       },
   ]
   
   let authoritys = []

   Result.data = {
      nav:nav,
      authoritys:authoritys
   }
   return Result
})