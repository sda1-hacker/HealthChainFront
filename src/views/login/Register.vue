<template>
  <div class="layadmin-user-login layadmin-user-display-show" id="LAY-user-login" style="display: none;">
    <div class="layadmin-user-login-main">
      <div class="layadmin-user-login-box layadmin-user-login-header">
        <h2>智能健康互联</h2>
        <p>注册</p>
      </div>
      <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
        <div class="layui-form-item">
          <label class="layadmin-user-login-icon layui-icon layui-icon-cellphone" for="LAY-user-login-cellphone"></label>
          <input v-model="tel" type="text" name="cellphone" id="LAY-user-login-cellphone" lay-verify="phone" placeholder="手机" class="layui-input">
        </div>
        <div class="layui-form-item">
          <div class="layui-row">
            <div class="layui-col-xs7">
              <label class="layadmin-user-login-icon layui-icon layui-icon-vercode" for="LAY-user-login-vercode"></label>
              <input v-model="vercode" type="text" name="vercode" id="LAY-user-login-vercode" lay-verify="required" placeholder="验证码" class="layui-input">
            </div>
            <div class="layui-col-xs5">
              <div style="margin-left: 10px;">
                <button type="button" class="layui-btn layui-btn-primary layui-btn-fluid" id="LAY-user-getsmscode" >获取验证码</button>
              </div>
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layadmin-user-login-icon layui-icon layui-icon-password" for="LAY-user-login-password"></label>
          <input v-model="password" type="password" name="password" id="LAY-user-login-password" lay-verify="pass" placeholder="密码" class="layui-input">
        </div>
        <div class="layui-form-item">
          <label class="layadmin-user-login-icon layui-icon layui-icon-password" for="LAY-user-login-repass"></label>
          <input v-model="repassword" type="password" name="repass" id="LAY-user-login-repass" lay-verify="required" placeholder="确认密码" class="layui-input">
        </div>
        <div class="layui-form-item">
          <label class="layadmin-user-login-icon layui-icon layui-icon-username" for="LAY-user-login-nickname"></label>
          <input v-model="account" type="text" name="nickname" id="LAY-user-login-nickname" lay-verify="nickname" placeholder="昵称" class="layui-input">
        </div>
        <div class="layui-form-item">
          <input v-model="agreecheck" type="checkbox" name="agreement" lay-skin="primary" title="同意用户协议" checked>
        </div>
        <div class="layui-form-item">
          <button class="layui-btn layui-btn-fluid" lay-submit lay-filter="LAY-user-reg-submit" @click="register">注 册</button>
        </div>
        <div class="layui-trans layui-form-item layadmin-user-login-other">


          <a href="/" class="layadmin-user-jump-change layadmin-link layui-hide-xs">用已有帐号登入</a>
          <a href="login.html" class="layadmin-user-jump-change layadmin-link layui-hide-sm layui-show-xs-inline-block">登入</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
        tel: '',               //手机号
        vercode: '',           //验证码
        password: '',          //密码
        repassword: '',        //确认密码
        account: '',           //昵称
        agreecheck:false        //同意协议框
    }

  },
  methods:{
    register(){
      if( this.password.toString() != this.repassword.toString() ){
        layui.layer.msg('两次输入的密码不一致')
        return
      }
    }
  }
}
</script>
