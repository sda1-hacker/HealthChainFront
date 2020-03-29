<!-- 所有用户 -->
<template>

  <!-- 用户信息 -->
  <div>
  <table class="layui-hide" id="demo" lay-filter="test"></table>

  <script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
    <!-- <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a> -->
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
  </script>
  </div>

</template>

<script>
export default {
  data(){
    return {
      userList: []
    }
  },
  methods: {
    initData(vueObj){
      const that = this;
      this.$http.get("/admin/userInfoData.json", {}).then(function({data: res}){
        if("200" === res._code){
          vueObj.userList = res._data.userList.data

          // 将列表数据显示在表格中
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
              ,data: vueObj.userList     // 列表[]
              ,cols: [[
                {field:'id', title: 'id', sort: true}
                ,{field:'account', title: '用户名'}
                ,{field:'nickName', title: '昵称'}
                ,{field:'password', title: '密码'}
                ,{field:'ethAddress', title: '以太坊地址'}
                ,{field:'sex', title: '性别'}
                ,{field:'address', title: '住址'}
                ,{field:'birth', title: '出生日期'}
                ,{field:'tel', title: '电话'}
                ,{field:'balance', title: '账户余额'}
                ,{fixed: 'right', width: 165, align:'center', toolbar: '#barDemo'}  // 工具栏
              ]]
            });

              // 监听表格按钮事件
              table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
              var data = obj.data //获得当前行数据
              ,layEvent = obj.event; //获得 lay-event 对应的值
              if(layEvent === 'detail'){
                layer.msg('查看操作');

                layer.open({
                  type: 2,
                  title: "用户信息",
                  content: "/userInfo",  // 相当于发送了一个get请求，得到一个页面，页面在这里以弹窗的形式显示,  返回一个vue组件，在组件里面加载数据
                  shadeClose: true,
                  area: ["90%", "588px"],
                  maxmin: true
                })

              } else if(layEvent === 'del'){
                layer.confirm('真的删除行么', function(index){
                  obj.del(); //删除对应行（tr）的DOM结构
                  layer.close(index);
                  //向服务端发送删除指令
                  that.$http.get("/admin/userInfoData_delete.json", {}).then(function({data: res}){
                    console.log("执行删除操作")
                    that.userList = res._data.userList.data
                    console.log("删除成功")
                    console.log(that.userList)
                  })

                });
              }
              // else if(layEvent === 'edit'){
              //   layer.msg('编辑操作');
              // }
            });

          });



        }
        else {
          layui.use(['layer'], function(){layui.layer.msg('数据加载失败...')})
        }
      })
    }
  },
  mounted: function(){
    this.initData(this);
  }
}
</script>
