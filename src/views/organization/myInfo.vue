<template>
<div class="layui-form" lay-filter="layuiadmin-form-useradmin" id="layuiadmin-form-useradmin" style="padding: 20px 0 0 0;">
    <div class="layui-form-item">
      <label class="layui-form-label">用户名</label>
      <div class="layui-input-inline">
        <input type="text" name="account" autocomplete="off" class="layui-input" v-model="account" readonly="readonly">
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">密码</label>
      <div class="layui-input-inline">
        <input type="text" name="password" autocomplete="off" class="layui-input" v-model="password">
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">以太坊地址</label>
      <div class="layui-input-inline">
        <input type="text" name="ethAddress" autocomplete="off" class="layui-input" v-model="ethAddress" readonly="readonly">
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">机构名称</label>
      <div class="layui-input-inline">
        <input type="text" name="organizationName" autocomplete="off" class="layui-input" v-model="organizationName" readonly="readonly">
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">医疗机构类型</label>
      <div class="layui-input-inline">
        <input type="text" name="type" autocomplete="off" class="layui-input" v-model="type">
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">认证结果</label>
      <div class="layui-input-inline">
        <input type="text" name="certificateResult" autocomplete="off" class="layui-input" v-model="certificateResult">
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">认证文件</label>
      <div class="layui-input-inline">
        <input type="text" name="certificateFiles" autocomplete="off" class="layui-input" v-model="certificateFiles" >
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">认证时间</label>
      <div class="layui-input-inline">
        <input type="text" name="certificateTime" autocomplete="off" class="layui-input" v-model="certificateTime" readonly="readonly">
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">账户余额</label>
      <div class="layui-input-inline">
        <input type="text" name="balance" autocomplete="off" class="layui-input" v-model="balance" readonly="readonly">
      </div>
    </div>

    <div class="layui-form-item">
      <div class="layui-input-block">
        <button type="button" class="layui-btn" @click="updateUserInfo()" lay-submit lay-filter="setmyinfo">确认修改</button>
        <button type="reset" class="layui-btn layui-btn-primary">重新填写</button>
      </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      "id": "",
      "account": "",
      "password": "",
      "ethAddress": "",
      "organizationName": "",
      "type": "..",
      "certificateResult": "",
      "certificateFiles": "",
      "certificateTime": "",
      "balance": ""
    }
  },
  methods: {
    initData(vueObj){
      this.$http.get("/third/orgInfo.json", {}).then(function({data: res}){
        if("200" === res._code){
          console.log(res)
          vueObj.id = res._data.id,
          vueObj.account = res._data.account,
          vueObj.password = res._data.password,
          vueObj.ethAddress = res._data.ethAddress,
          vueObj.organizationName = res._data.organizationName,
          vueObj.type = res._data.type,
          vueObj.certificateResult = res._data.certificateResult,
          vueObj.certificateFiles = res._data.certificateFiles,
          vueObj.certificateTime = res._data.certificateTime,
          vueObj.balance = res_data.balance
        }
        else{
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })
    },

    updateUserInfo(){
      const that = this;
      this.$http.get("/third/orgInfo_back.json", {}).then(function({data: res}){
        if("200" === res._code){
          that.id = res._data.id,
          that.account = res._data.account,
          that.password = res._data.password,
          that.ethAddress = res._data.ethAddress,
          that.organizationName = res._data.organizationName,
          that.type = res._data.type,
          that.certificateResult = res._data.certificateResult,
          that.certificateFiles = res._data.certificateFiles,
          that.certificateTime = res._data.certificateTime,
          that.balance = res_data.balance
          layer.msg("修改成功!")
        }
        else{
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })
    }
  },
  mounted: function(){
    this.initData(this)
  }
}
</script>
