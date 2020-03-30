<template>
<div>
  <div id="container">
    <div class="layui-inline">
      <table style="display: inline-block" class="layui-hide" id="serviceTable" lay-filter="serviceUpadte"></table>
    </div>
  </div>

  <script type="text/html" id="handler">
    <a class="layui-btn layui-btn-xs" lay-event="edit">修改</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
  </script>
</div>
</template>
<script>
export default {
  data(){
    return {
      table: {}
    }
  },
  mounted(){
    this.$http.get('/third/findMedicalServiceByConditions.json', {}).then(({data: res}) => {this.initTable(res)})
  },
  methods: {
    // 初始化表格
    initTable(res){
      const that = this
      layui.use('table', function(){
        that.table = layui.table
        // 获取数据
        that.table.render({
          id: 'listReload',
          elem: '#serviceTable'
          ,height: 420
          ,title: '服务表'
          ,page: true //开启分页
          ,toolbar: 'default'
          ,defalutToolbar: []
          ,response: {
            statusCode: 200 //规定成功的状态码，默认：0
          }
          ,data: res._data.medicalServiceList.data
          ,cols: [[ //表头
            {field: 'id', title: '医疗服务ID', width:140, align: 'center'}
            ,{field: 'serviceName', title: '服务名称', width:200, align: 'center'}
            ,{field: 'serviceDetails', title: '服务详情', width: 200, align: 'center'}
            ,{field: 'cost', title: '服务费用（Wei）', width:200, align: 'center'}
            ,{field: 'auditResult', title: '审核状态', width: 200, align: 'center'}
            ,{width: 140, align:'center', toolbar: '#handler'}
          ]]
        })

        // 监听工具条
        that.table.on('toolbar(serviceUpadte)', function(obj){
          if(obj.event === 'add'){
            layer.open({
              type: 1,
              title: '添加服务',
              skin: 'layui-layer-molv',
              content: that.getServiceDialog(),
              btn: ['添加', '取消'],
              yes: function (index, layero) {
                const service = {}
                service.serviceName = document.getElementById('serviceName').value;
                service.cost = document.getElementById('cost').value;
                service.serviceDetails = document.getElementById('serviceDetails').value;
                that.addService(service, index)
              }
            })
          } else{
            layer.msg('未开放')
          }
        });

        // 监听删除和查看按钮
        that.table.on('tool(serviceUpadte)', function(obj){
          switch(obj.event){
            case 'edit':
              layer.open({
                type: 1,
                title: '修改管理员',
                skin: 'layui-layer-molv',
                content: that.getServiceDialog(obj.data),
                btn: ['修改', '取消'],
                yes: function (index, layero) {
                  const service = {}
                  service.serviceName = document.getElementById('serviceName').value;
                  service.cost = document.getElementById('cost').value;
                  service.serviceDetails = document.getElementById('serviceDetails').value;
                  that.updateService(obj, service, index)
                }
              })
              break;
            case 'del':
              layer.confirm('真的删除此服务吗', function(index){
                that.delService(obj, index);
              });
              break;
          }
        })
      })
    },

    // 增加服务
    addService(service, index){
      const that = this
      if(service.serviceName === '' || service.serviceDetails === '' || service.cost === ''){
        layer.msg('字段不能为空')
        return
      }
      if(isNaN(service.cost) || parseInt(service.cost) < 0){
        layer.msg('费用输入不合法')
        return
      }
      this.$http.get('/third/addMedicalService.json', {}).then(({data: res}) => {
        if('200' === res._code){
          this.$http.get('/third/findMedicalServiceByConditions.json', {}).then(({data: res}) => {
            that.table.reload("listReload", {data: res._data.medicalServiceList.data})
            layer.close(index);
            layer.msg('添加成功')
          })
        } else {
          layer.close(index);
          layer.msg('添加失败')
        }
      })
    },

    // 更新服务
    updateService(obj, service, index){
      if(service.serviceName === '' || service.serviceDetails === '' || service.cost === ''){
        layer.msg('字段不能为空')
        return
      }
      if(isNaN(service.cost) || parseInt(service.cost) < 0){
        layer.msg('费用输入不合法')
        return
      }
      this.$http.get('/third/updateMedicalService.json', {}).then(({data: res}) => {
        if('200' === res._code){
          obj.update(service)
          layer.close(index);
          layer.msg('修改成功')
        } else {
          layer.close(index);
          layer.msg('修改失败')
        }
      })
    },

    // 删除服务
    delService(service, index){
      this.$http.get('/third/delMedicalServiceById.json', {}).then(({data: res}) => {
        if('200' === res._code){
          service.del();
          layer.close(index);
          layer.msg('删除成功')
        } else {
          layer.close(index);
          layer.msg('删除失败')
        }
      })
    },

    // 获取服务对话框
    getServiceDialog(service, readonly=''){
      return `<div style="padding: 15px 50px 15px 15px"><label for="serviceName">服务名称：</label><input id="serviceName" ${readonly} value="${service===undefined?'':service.serviceName}" /><br><br>
             <label for="cost">服务费用：</label><input id="cost" type="number" min="0" ${readonly} value="${service===undefined?'':service.cost}"/><br><br>
             <label for="serviceDetails">服务详情：</label><textarea id="serviceDetails" cols="25" rows="5" style="resize: none" ${readonly}>${service===undefined?'':service.serviceDetails}</textarea></div>`
    }
  }
}
</script>
<style scoped>
  #container{
    text-align: center;
  }
</style>
