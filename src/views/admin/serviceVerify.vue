<!-- 服务审核页面 -->
<template>
  <!-- 需要审核的医疗服务 -->
  <div>
    <table class="layui-hide" id="demo" lay-filter="test"></table>

    <script type="text/html" id="barDemo">
      <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="ispassed">审核通过</a>
      <!-- <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a> -->
      <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="nopassed">不通过</a>
    </script>
  </div>

</template>

<script>

export default {
  data(){
    return {
      medicalServiceList: []
    }
  },
  methods: {
    initData(vueObj){
      const that = this;
      this.$http.get("/admin/findMedicalServiceByConditions.json", {}).then(function({data: res}){

        if("200" === res._code){

          vueObj.medicalServiceList = res._data.medicalServiceList.data

          layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider'], function(){
            var laydate = layui.laydate //日期
            ,laypage = layui.laypage //分页
            ,layer = layui.layer //弹层
            ,table = layui.table //表格
            ,carousel = layui.carousel //轮播
            ,upload = layui.upload //上传
            ,element = layui.element //元素操作
            ,slider = layui.slider //滑块

            table.render({
              elem: '#demo'
              ,height: 420
              ,title: '用户表'
              ,page: true //开启分页
              ,toolbar: 'default' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
              ,totalRow: true //开启合计行
              // , url: "" // url 访问 返回值是  {"code": 0,"msg": "","count": 100, "data": []}
              ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
              ,response: {
                statusCode: 200
              }
              ,data: vueObj.medicalServiceList     // 列表[]
              ,cols: [[
                {field:'id', title: 'id', sort: true}
                ,{field:'serviceName', title: '服务名称'}
                ,{field:'serviceDetails', title: '服务详情'}
                ,{field:'cost', title: '费用'}
                ,{field:'oid', title: '机构id'}
                ,{field:'auditResult', title: '审核结果'}
                ,{fixed: 'right', width: 165, align:'center', toolbar: '#barDemo'}  // 工具栏
              ]]
            });

            //监听行工具事件
              table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                var data = obj.data //获得当前行数据
                ,layEvent = obj.event; //获得 lay-event 对应的值
                if(layEvent === 'ispassed'){

                  that.$http.get("/admin/medicalServiceIsPadded.json", {}).then(function({data: res}){
                    layer.msg('审核通过,ok');

                  })
                } else if(layEvent === 'nopassed'){

                  that.$http.get("/admin/medicalServiceIsPadded.json", {}).then(function({data: res}){
                    layer.msg('审核不通过..');

                  })
                }
              });

          });




        }
        else {
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })
    },

  },
  mounted: function() {
    this.initData(this)
  }
};
</script>
