<template>
  <div class="layui-form-item">
    <table class="layui-hide" id="demo" lay-filter="test"></table>
    <script type="text/html" id="barDemo">
      <!-- <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a> -->
      <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" >删除</a>
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

      //执行一个 table 实例
      table.render({
        elem: '#demo'
        ,height: 420
        ,url: '/layuiadmin/json/table/organization.js' //数据接口
        ,title: '机构用户表'
        ,page: true //开启分页
        ,toolbar: 'true' //开启工具栏，只显示右侧工具栏
    //     ,totalRow: true //开启合计行
        ,cols: [[ //表头
          {type: 'checkbox', fixed: 'left'}
          ,{field: 'id', title: 'ID', width:80, sort: true, fixed: 'left', totalRowText: '合计：', align:'center'}
          ,{field: 'account', title: '用户账号', width:100, align:'center'}
          ,{field: 'ethaddress', title: '以太坊账号', width: 100, align:'center'}
          ,{field: 'organizationName', title: '机构名', width:80, align:'center'}
          ,{field: 'type', title: '机构类型', width:100, align:'center'}
          ,{field: 'certificateResult', title: '认证结果', width:150, align:'center'}
          ,{field: 'certificateFiles', title: '认证文件', width: 200, align:'center'}
          ,{field: 'certificateTime', title: '认证时间', width: 100, align:'center'}
          ,{field: 'balance', title: '余额', width: 135, sort: true, totalRow: true, align:'center'}
          ,{fixed: 'right', title:'操作',  width: 165, align:'center', toolbar: '#barDemo'}
        ]]
      });
        //监听行工具事件
      table.on('tool(test)', function(obj){
        var data = obj.data;
        //console.log(obj)
        if(obj.event === 'del'){
          layer.confirm('真的删除行么', function(index){
            obj.del();
            layer.close(index);
          });
        } else if(obj.event === 'edit'){
          layer.prompt({
            formType: 2
            ,value: data.email
          }, function(value, index){
            obj.update({
              email: value
            });
            layer.close(index);
          });
        }
      });
    });
  }
}

</script>>
