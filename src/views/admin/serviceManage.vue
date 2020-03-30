<template>
  <div class="layui-form-item">
    <table class="layui-hide" id="demo" lay-filter="test"></table>
    <script type="text/html" id="barDemo">
    <!--
      判断审核状态，0:审核中，1:通过，2:拒绝。
      只要>0都表示已经审核，操作栏只显示删除
    -->
      <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="pass">通过</a>
      <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="refuse">拒绝</a>
      <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
  </div>
</template>

<script>
export default{
  mounted(){
    layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider'], function(){
      var laydate = layui.laydate //日期
      ,laypage = layui.laypage //分页
      ,layer = layui.layer //弹层
      ,table = layui.table //表格
     

      //执行一个 table 实例
      table.render({
        elem: '#demo'
        ,height: 420
        ,url: '/layuiadmin/json/table/organization.js' //数据接口
        ,title: '服务管理'
        ,page: true //开启分页
        ,cols: [[ //表头
          ,{field: 'id', title: 'ID', unresize:'false',sort: true, align:'center'}
          ,{field: 'serviceName', title: '服务名', align:'center'}
          ,{field: 'serviceDetails', title: '服务介绍', align:'center'}
          ,{field: 'cost', title: '服务花费', align:'center'}
          ,{field: 'oid', title: '所属机构', align:'center'}
          ,{field: 'auditResult', title: '审核结果', align:'center'}
          ,{fixed: 'right', title:'操作', align:'center', toolbar: '#barDemo'}
        ]]
      });
        //监听行工具事件
      table.on('tool(test)', function(obj){
        var data = obj.data;
        //console.log(obj)
        if(obj.event === 'del'){
          layer.confirm('真的删除这个服务吗', function(index){
            obj.del();
            layer.close(index);
          });
        } else if(obj.event === 'pass'){
          layer.prompt({
            formType: 2
            ,value: data.email
          }, function(value, index){
            obj.update({
              email: value
            });
            layer.close(index);
          });
        }else if(obj.event === 'refuse'){

        }
      });
    });
  }
}

</script>>
