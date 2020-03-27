<template>
<div>
<div class="layadmin-user-login layadmin-user-display-show" id="LAY-user-login" style="display: none;">

    <div class="layadmin-user-login-main">
      <div class="layadmin-user-login-box layadmin-user-login-header">
        <h2>智能健康互联</h2>
        <p>------以太坊------</p>
      </div>
      <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
        <div class="layui-form-item">
          <label class="layadmin-user-login-icon layui-icon layui-icon-username" for="LAY-user-login-username"></label>
          <input v-model="account" type="text" name="admnumber" id="LAY-user-login-username" lay-verify="required" placeholder="用户名" class="layui-input" >
        </div>
        <div class="layui-form-item">
          <label class="layadmin-user-login-icon layui-icon layui-icon-password" for="LAY-user-login-password"></label>
          <input v-model="password" type="password" name="admpassword" id="LAY-user-login-password" lay-verify="required" placeholder="密码" class="layui-input">
        </div>
        <div class="layui-form-item">
          <div class="layui-row">
            <div class="layui-col-xs7">
              <label class="layadmin-user-login-icon layui-icon layui-icon-vercode" for="LAY-user-login-vercode"></label>
              <input type="text" name="vercode" id="LAY-user-login-vercode" placeholder="图形验证码" class="layui-input input-val">
            </div>
            <div class="layui-col-xs5">
              <div style="margin-left: 10px;">
                 <canvas id="canvas" width="100" height="43"></canvas>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="layui-form-item" style="margin-bottom: 20px;">
          <input type="checkbox" name="remember" lay-skin="primary" title="记住密码">
          <a href="forget.html" class="layadmin-user-jump-change layadmin-link" style="margin-top: 7px;">忘记密码？</a>
        </div> -->
        <div class="layui-form-item">
          <button @click="login" class="layui-btn layui-btn-fluid btn" lay-submit lay-filter="LAY-user-login-submit">登 入</button>
        </div>
        <!-- <div class="layui-trans layui-form-item layadmin-user-login-other">
          <label>社交账号登入</label>
          <a href="javascript:;"><i class="layui-icon layui-icon-login-qq"></i></a>
          <a href="javascript:;"><i class="layui-icon layui-icon-login-wechat"></i></a>
          <a href="javascript:;"><i class="layui-icon layui-icon-login-weibo"></i></a>

          <a href="" class="layadmin-user-jump-change layadmin-link">注册帐号</a>
        </div> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      account: '',
      password: '',
    }
  },
  methods: {
    login(){
      const that = this;
      this.$http.get('test.json', {}).then(function({data: res}){
        if('200' === res._code){
          if(that.account === res._data.account && that.password === res._data.password){
            // 设置token，记录登录状态
            window.sessionStorage.setItem('token', res._data.token.toString())
            that.$router.push("/admin")
          } else {
            layui.use(['layer'], function(){layui.layer.msg('用户名或密码不正确')})
          }
        } else{
          layui.use(['layer'], function(){layui.layer.msg('请求出错')})
        }
      })
    }
  }

}
</script>
