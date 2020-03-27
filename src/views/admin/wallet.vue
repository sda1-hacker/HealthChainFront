<!-- 钱包 -->
<template>

</template>

<script>
export default {

  data(){
    return {
        ethAddress: "",
        balance: "",
        transactionRecordList: ""
    }
  },
 methods: {
   initDta: function(vueObj){
      const that = this;
      this.$http.get("/admin/wallet.json", {}).then(function({data: res}){
        if("200" === res._code){
          vueObj.ethAddress = res.ethAddress,
          vueObj.balance = res.balance,
          vueObj.transactionRecordList = transactionRecordList;
        }else {
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })
   }
 },
 mounted: function() {
   this.initDta(this);
   console.log("钱包数据已经家在");
 }
}
</script>>
