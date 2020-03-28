<template>
<div class="layui-form-item">
    <table class="layui-hide" id="demo" lay-filter="test"></table>
    <script type="text/html" id="barDemo">
      <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
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
      ,carousel = layui.carousel //轮播
      ,upload = layui.upload //上传
      ,element = layui.element //元素操作
      ,slider = layui.slider; //滑块

      var table = layui.table;
      //执行一个 table 实例
      table.render({
        elem: '#demo'
        ,height: 420
        ,url: '/layuiadmin/json/table/organizationstatus.js' //数据接口
        ,title: '用户审核表'
        ,page: true //开启分页
        ,toolbar: 'true' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
    //     ,totalRow: true //开启合计行
        ,cols: [[ //表头
          {type: 'checkbox', fixed: 'left'}
          ,{field: 'id', title: 'ID', width:80, sort: true, fixed: 'left', align:'center'}
          ,{field: 'account', title: '用户账号', width:100, align:'center'}
          ,{field: 'ethaddress', title: '以太坊账号', width: 100, align:'center'}
          ,{field: 'organizationName', title: '机构名', width:80, align:'center'}
          ,{field: 'type', title: '机构类型', width: 100, align:'center'}
          ,{field: 'certificateStatus', title: '审核状态', width:150, align:'center'}
          ,{fixed: 'right',title:'操作', width: 165, align:'center', toolbar: '#barDemo'}
        ]]
      });
      table.on('tool(test)', function(obj){
              var data = obj.data;
              //console.log(obj)
              if(obj.event === 'del'){
                layer.confirm('真的删除行么', function(index){
                  obj.del();
                  layer.close(index);
                });
              } else if(obj.event === 'edit'){
                //更新机构管理中的认证状态

                //更新当前表中的认证状态
                layer.prompt({
                  formType: 2
                  ,value: data.certificateStatus
                }, function(value, index){
                  obj.update({
                    certificateStatus: value
                  });
                  layer.close(index);
                });
              }
            });
    });


  }
}

</script>>
