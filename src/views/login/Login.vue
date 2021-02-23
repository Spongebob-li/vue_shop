<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login-avatar">
        <img src="~assets/img/Login/login.jpg" alt="" />
      </div>
      <!-- 登录表单区域 -->

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_from"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码输入 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getLogin } from "network/login";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" }, // trigger 失去焦点的时候触发校验规则
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮事件
    resetLoginForm() {
      //   console.log(this); 打印出来的是组件的实例对象,通过定义的ref，使用$refs访问到定义的loginFormRef
      this.$refs.loginFormRef.resetFields();
    },
    // 登录表单的预验证
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        // console.log(valid);
        if (!valid) return;
      });  
   
      // console.log('55'); // 可以正常打印

      getLogin(this.loginForm.username, this.loginForm.password).then(
          (res) => {
            // console.log(res);
            if(res.meta.status !== 200) return this.$message.error('登录失败');
            this.$message.success('登陆成功');
          //  1. 将登录成功之后后台返回的token，保存在sessionStorage 中
          // 1.1 项目中除了登录之外的其他api接口，必须在登录成功之后才能访问
          // 1.2  token 只应在当前网页的会话期间生效，所以将token 保存在 sessionStorage 
            console.log(res);
          window.sessionStorage.setItem("token",res.data.token)
          // 2. 通过编程时导航跳转到登录成功的后台主页，路由地址是 /home
          this.$router.push("/home")
          }
        );
      
        
    },
  
    
  },
  created() {

  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: absolute;
  left: 50%; /* 父盒子宽度的50% */
  top: 50%; /* 父盒子高度的50% */
  transform: translate(-50%, -50%); /* 子盒子自身宽高的50% */

  .login-avatar {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
