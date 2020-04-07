<template>
<div>
<table class="layui-hide" id="demo" lay-filter="test"></table>
<!-- <script type="text/html" id="operate-barDemo">
  <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
  <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
  <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script> -->
</div>
</template>
<script>
export default {
  mounted(){
    layui.use(['laydate', 'laypage', 'layer', 'table'], function(){
      var laydate = layui.laydate //日期
      ,$ = layui.$
      ,laypage = layui.laypage //分页
      ,layer = layui.layer //弹层
      ,table = layui.table //表格

      //执行一个 table 实例
      table.render({
        elem: '#demo'
        ,height: 420
        ,url: http + '/api/admin/getLogList' //数据接口
        ,title: '用户表'
        ,method:'post'
        ,where:{token:window.sessionStorage.getItem('token')}
        ,page: true //开启分页

        ,cols: [[ //表头
          {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
          ,{field: 'operateId', title: '操作人编号', width:80}
          ,{field: 'operateDetails', title: '操作详情', width: 90, sort: true, totalRow: true}
          ,{field: 'operateResult', title: '操作结果', width:80, sort: true}
          ,{field: 'operateTime', title: '操作时间', width: 80, sort: true, totalRow: true}
          // ,{fixed: 'right', align:'center', title:'操作',toolbar: '#operate-barDemo', width:'17%'}
        ]]
      });


    });
  }
}
</script>
