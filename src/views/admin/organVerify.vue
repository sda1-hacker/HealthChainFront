<template>
<table class="layui-hide" id="demo" lay-filter="test">
</table>
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
        ,url: '/layuiadmin/json/table/organizationstatus.js' //数据接口
        ,title: '用户表'
        ,page: true //开启分页
        ,toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
    //     ,totalRow: true //开启合计行
        ,cols: [[ //表头
          {type: 'checkbox', fixed: 'left'}
          ,{field: 'id', title: 'ID', width:80, sort: true, fixed: 'left', align:'center'}
          ,{field: 'account', title: '用户账号', width:100, align:'center'}
          ,{field: 'ethaddress', title: '以太坊账号', width: 100, align:'center'}
          ,{field: 'organizationName', title: '机构名', width:80, align:'center'}
          ,{field: 'type', title: '机构类型', width: 100, align:'center'}
          ,{field: 'certificateStatus', title: '审核状态', width:150, align:'center'}
          ,{fixed: 'right', width: 165, align:'center', toolbar: '#barDemo'}
        ]]
      });
    });
  }
}

</script>>
