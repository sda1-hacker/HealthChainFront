<template>
<div class="layui-form" lay-filter="layuiadmin-form-useradmin" id="layuiadmin-form-useradmin" style="padding: 20px 0 0 0;">
    <div class="layui-form-item">
      <label class="layui-form-label">单次授权消耗的以太币(wei)</label>
      <div class="layui-input-inline">
        <input type="text" name="username" autocomplete="off" class="layui-input" v-model="payforHealthData" >
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">授权有效时间间隔(秒)</label>
      <div class="layui-input-inline">
        <input type="text" name="username" autocomplete="off" class="layui-input" v-model="validSection" >
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">上传有效时间间隔(秒)</label>
      <div class="layui-input-inline">
        <input type="text" name="username" autocomplete="off" class="layui-input" v-model="uploadSection">
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">用户上传数据可获得的奖励(wei)</label>
      <div class="layui-input-inline">
        <input type="text" name="username" autocomplete="off" class="layui-input" v-model="award" >
      </div>
    </div>

    <div class="layui-form-item">
      <div class="layui-input-block">
        <button type="button" class="layui-btn" @click="updateContractInfo()" lay-submit lay-filter="setmyinfo">确认修改</button>
      </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      payforHealthData: "",      // 单次授权消耗的以太币
      validSection: "",          // 授权有效时间间隔
      uploadSection: "",         // 上传有效时间间隔
      award: ""                  // 用户上传数据可获得的奖励
    }
  },
  methods: {
    initData(vueObj){
      const that = this;
      that.$http.get(http + "/api/admin/getContractInfo_payforHealthData", {}).then(function({data: res}){
        if("200" === res._code){
          console.log(res)
          vueObj.payforHealthData = res._data.payforHealthData;
        }
        else{
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })

      that.$http.get(http + "/api/admin/getContractInfo_uploadSection", {}).then(function({data: res}){

        if("200" === res._code){
          console.log(res)
          vueObj.uploadSection = res._data.uploadSection;
        }
        else{
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })

      that.$http.get(http + "/api/admin/getContractInfo_validSection", {}).then(function({data: res}){

        if("200" === res._code){
          console.log(res)
          vueObj.validSection = res._data.validSection;
        }
        else{
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })

      that.$http.get(http + "/api/admin/getContractInfo_award", {}).then(function({data: res}){

        if("200" === res._code){
          console.log(res)
          vueObj.award = res._data.award
        }
        else{
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })
    },

    updateContractInfo(){
      const that = this;
      that.$http.post(http + "/api/admin/setContractInfo_payforHealthData", {token:window.sessionStorage.getItem('token'),
      payforHealthData: this.payforHealthData}).then(function({data: res}){
        if("200" === res._code){
          this.payforHealthData = res._data.payforHealthData;
          layer.msg("修改成功!");
          location.reload();
        }
        else{
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })

      that.$http.post(http + "/api/admin/setContractInfo_uploadSection", {token:window.sessionStorage.getItem('token'),
      uploadSection: this.uploadSection}).then(function({data: res}){
        if("200" === res._code){
          this.uploadSection = res._data.uploadSection;
          layer.msg("修改成功!");
          location.reload();
        }
        else{
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })

      that.$http.post(http + "/api/admin/setContractInfo_validSection", {token:window.sessionStorage.getItem('token'),
      validSection: this.validSection}).then(function({data: res}){
        if("200" === res._code){
          this.validSection = res._data.validSection;
          layer.msg("修改成功!");
          location.reload();
        }
        else{
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })

      that.$http.post(http + "/api/admin/setContractInfo_award", {token:window.sessionStorage.getItem('token'),
      award: this.award}).then(function({data: res}){
        if("200" === res._code){
          this.award = res._data.award;
          layer.msg("修改成功!");
          location.reload();
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
