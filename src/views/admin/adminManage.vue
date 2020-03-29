<template>
<div>
  <div id="container">
    <div class="layui-inline">
      <table style="display: inline-block" class="layui-hide" id="adminTable" lay-filter="adminUpadte"></table>
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

    }
  },
  mounted(){
    this.$http.get('/admin/findAdminList.json', {}).then(({data: res}) => {this.initTable(res)})
  },
  methods: {
    // 初始化表格
    initTable(res){
      if(res._code !== '200'){
        alert('非root管理员不可见')
        return
      }
      const that = this
      layui.use('table', function(){
        var table = layui.table
        // 获取数据
        table.render({
          id: 'listReload',
          elem: '#adminTable'
          ,height: 420
          ,title: '用户表'
          ,page: true //开启分页
          ,toolbar: 'default'
          ,defalutToolbar: []
          ,response: {
            statusCode: 200 //规定成功的状态码，默认：0
          }
          ,data: res._data
          ,cols: [[ //表头
            {field: 'id', title: '管理员ID', width:140, align: 'center'}
            ,{field: 'account', title: '管理员账号', width:200, align: 'center'}
            ,{field: 'password', title: '密码', width: 200, align: 'center'}
            ,{field: 'ethAddress', title: '以太坊账号', width:200, align: 'center'}
            ,{field: 'authority', title: '权限', width: 200, align: 'center'}
            ,{width: 140, align:'center', toolbar: '#handler'}
          ]]
        })

        // 监听工具条
        table.on('toolbar(adminUpadte)', function(obj){
          if(obj.event === 'add'){
            layer.open({
              type: 1,
              title: '添加管理员',
              skin: 'layui-layer-molv',
              content: `<div style="padding: 15px 50px 15px 15px"><label for="account">账户：</label><input id="account"/><br><br>
                        <label for="accopasswordunt">密码：</label><input id="password"/><br><br>
                        <label for="authority">权限：</label><select id="authority"><option value="normal">normal</option><option value="disable">disable</option>}</select></div>`,
              btn: ['添加', '取消'],
              yes: function (index, layero) {
                const admin = {}
                admin.account = document.getElementById('account').value;
                admin.password = document.getElementById('password').value;
                admin.authority = document.getElementById('authority').value;
                that.addAdmin(table, admin, index)
              }
            })
          } else{
            layer.msg('未开放')
          }
        });

        // 监听删除和查看按钮
        table.on('tool(adminUpadte)', function(obj){
          switch(obj.event){
            case 'edit':
              // table.reload("listReload", {data: [{"id": 1}]})
              layer.open({
                type: 1,
                title: '修改管理员',
                skin: 'layui-layer-molv',
                content: `<div style="padding: 15px 50px 15px 15px"><label for="account">账户：</label><input id="account" value="${obj.data.account}"/><br><br>
                          <label for="accopasswordunt">密码：</label><input id="password" value="${obj.data.password}"/><br><br>
                          <label for="authority">权限：</label><select id="authority">${obj.data.authority === 'root'? '<option value="root">root</option>':'<option value="normal">normal</option><option value="disable">disable</option>'}</select></div>`,
                btn: ['修改', '取消'],
                yes: function (index, layero) {
                  const admin = {}
                  admin.account = document.getElementById('account').value;
                  admin.password = document.getElementById('password').value;
                  admin.authority = document.getElementById('authority').value;
                  that.updateAdmin(obj, admin, index)
                }
              })
              break;
            case 'del':
              layer.confirm('真的删除此管理员吗', function(index){
                that.delAdmin(obj, index);
              });
              break;
          }

            //向服务端发送删除指令
        })
      })
    },

    // 增加管理员
    addAdmin(table, admin, index){
      const that = this
      if(admin.account === '' || admin.password === '' || admin.authority === ''){
        layer.msg('字段不能为空')
        return
      }
      this.$http.get('/admin/addAdmin.json', {}).then(({data: res}) => {
        if('200' === res._code){
          this.$http.get('/admin/findAdminList.json', {}).then(({data: res}) => {
            table.reload("listReload", {data: res._data})
            layer.close(index);
            layer.msg('添加成功')
          })
        } else {
          layer.close(index);
          layer.msg('添加失败')
        }
      })
    },

    // 更新管理员
    updateAdmin(obj, admin, index){
      if(admin.account === '' || admin.password === '' || admin.authority === ''){
        layer.msg('字段不能为空')
        return
      }
      this.$http.get('/admin/updateAdmin.json', {}).then(({data: res}) => {
        if('200' === res._code){
          obj.update(admin)
          layer.close(index);
          layer.msg('修改成功')
        } else {
          layer.close(index);
          layer.msg('修改失败')
        }
      })
    },

    // 删除管理员
    delAdmin(admin, index){
      if(admin.data.authority === 'root'){
        layer.msg('不能删除root用户')
        return
      }
      this.$http.get('/admin/delAdminById.json', {}).then(({data: res}) => {
        if('200' === res._code){
          admin.del();
          layer.close(index);
          layer.msg('删除成功')
        } else {
          layer.close(index);
          layer.msg('删除失败')
        }
      })
    }
  }
}
</script>
<style scoped>
  #container{
    text-align: center;
  }
</style>
