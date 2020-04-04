<!-- 钱包 -->
<template>
  <div>

    <!-- 个人信息 -->


    <div class="layui-form layui-card-header layuiadmin-card-header-auto">
        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label">账户地址:</label>
            <div class="layui-input-block">
              <input type="text" name="loginname" placeholder="请输入" autocomplete="off" class="layui-input" v-model="ethAddress" readonly="readonly">
            </div>
          </div>

          <div class="layui-inline">
            <label class="layui-form-label">账户余额:</label>
            <div class="layui-input-block">
              <input type="text" name="loginname" placeholder="请输入" autocomplete="off" class="layui-input" v-model="balance" readonly="readonly">
            </div>
          </div>
        </div>
    </div>

    <div class="layui-form layui-card-header layuiadmin-card-header-auto">
        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label">收款方账号:</label>
            <div class="layui-input-block">
              <input type="text" name="loginname" placeholder="请输入" autocomplete="off" class="layui-input" v-model="recieveAddress">
            </div>
          </div>

          <div class="layui-inline">
            <label class="layui-form-label">转账金额:</label>
            <div class="layui-input-block">
              <input type="text" name="telphone" placeholder="请输入" autocomplete="off" class="layui-input" v-model="transactEth">
            </div>
          </div>

          <div class="layui-inline">
            <label class="layui-form-label">转账备注:</label>
            <div class="layui-input-block">
              <input type="text" name="email" placeholder="请输入" autocomplete="off" class="layui-input" v-model="transactRemarks">
            </div>
          </div>
        </div>
    </div>

    <div class="layui-form layui-card-header layuiadmin-card-header-auto">
        <div class="layui-form-item">
          <div class="layui-inline">
            <button class="layui-btn layuiadmin-btn-admin" @click="transfer" lay-submit lay-filter="LAY-user-back-search">
              转账
            </button>
          </div>
        </div>
      </div>


    <!-- 所有交易记录 -->
    <table class="layui-hide" id="test"></table>
  </div>


</template>

<script>
export default {

  data(){
    return {
        // 页面加载时的数据
        ethAddress: "",
        balance: "",
        transactionRecordList: {},

        // 转账需要的数据
        sendAddress: "",
        recieveAddress: "",
        transactEth: "",
        transactRemarks: ""
    }
  },
 methods: {
  initDta(vueObj){
      const that = this;
      this.$http.post(http + "/api/admin/getWalletInfo", {token: window.sessionStorage.getItem('token'),
      ethAddress: window.sessionStorage.getItem('adminInfo').ethAddress}).then(function({data: res}){
        if("200" === res._code){

          vueObj.ethAddress = window.sessionStorage.getItem('adminInfo').ethAddress
          vueObj.balance = res._data.balance

          // 将列表数据显示在表格中
          layui.use('table', function(){
            var table = layui.table;
            table.render({
              elem: '#test'
              // , url: "" // url 访问 返回值是  {"code": 0,"msg": "","count": 100, "data": []}
              ,url: http + "/api/admin/transactionRecord"
              ,method:'post'
              ,where:{token: window.sessionStorage.getItem('token'), sendAddress: window.sessionStorage.getItem('adminInfo').ethAddress}
              ,page: true //开启分页
              ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
              ,cols: [[
                {field:'id',  title: 'id', sort: true}
                ,{field:'sendAddress', title: '付款方地址'}
                ,{field:'recieveAddress', title: '收款方地址'}
                ,{field:'transactEth',  title: '交易金额'}
                ,{field:'transactTime', title: '交易时间'}
                ,{field:'transactAddr', title: '交易地址'}
                ,{field:'transactRemarks', title: '备注'}
              ]]
            });
          });


        }else {
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })
   },


   transfer(){
    console.log("进入转账操作。。。。")
      const that = this;
      that.$http.get( http + "/api/admin/transfer", {token: window.sessionStorage.getItem('token'),
      id: window.sessionStorage.getItem('adminInfo').id, receiverEthAddr: this.recieveAddress,
      value: this.transactEth, transactRemarks: that.transactRemarks}).then(function({data: res}){
        if("200" === res._code){
          console.log("转账...")
          that.sendAddress = that.ethAddress  // 付款方是本人
          layer.msg(that.transactEth)
          layui.use(['layer'], function(){layui.layer.msg('转账成功...')})
          that.balance = res.userBalance
        }else {
          layui.use(['layer'], function(){layui.layer.msg('转账失败...')})
        }
    })
 },
 },


 mounted: function() {
   this.initDta(this);
 }
}
</script>
