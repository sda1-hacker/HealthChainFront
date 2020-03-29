<template>
<div>
  <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
  <legend>身份审核</legend>
  </fieldset>

  <div class="layui-upload"  style = "text-align:left">
    <div class="layui-upload-list">
      <table class="layui-table">
        <thead>
          <tr><th>文件名</th>
          <th>大小</th>
          <th>状态</th>
          <th>操作</th>
        </tr></thead>
        <tbody id="demoList"></tbody>
      </table>
    </div>

    <div class="layui-btn-container">
      <button type="button" class="layui-btn layui-btn-normal" id="testList">选择文件</button>&nbsp;
      <button type="button" class="layui-btn" id="testListAction">开始上传</button>
    </div>
  </div>
  <div style = "text-align:right">
     <button type="button" class="layui-btn" @click="check" id="testListAction">查看审核状态</button>
  </div>
</div>
</template>

<script>
export default {
  mounted(){
    layui.use('upload', function(){
      var $ = layui.jquery
      ,upload = layui.upload;

      //多文件列表示例
      var demoListView = $('#demoList')
      ,uploadListIns = upload.render({
        elem: '#testList'
        ,url: 'https://httpbin.org/post' //改成您自己的上传接口
        ,accept: 'file'
        ,multiple: true
        ,auto: false
        ,bindAction: '#testListAction'
        ,choose: function(obj){
          var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
          //读取本地文件
          obj.preview(function(index, file, result){
            var tr = $(['<tr id="upload-'+ index +'">'
              ,'<td>'+ file.name +'</td>'
              ,'<td>'+ (file.size/1024).toFixed(1) +'kb</td>'
              ,'<td>等待上传</td>'
              ,'<td>'
                ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
              ,'</td>'
            ,'</tr>'].join(''));

            //单个重传
            tr.find('.demo-reload').on('click', function(){
              obj.upload(index, file);
            });

            //删除
            tr.find('.demo-delete').on('click', function(){
              delete files[index]; //删除对应的文件
              tr.remove();
              uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
            });

            demoListView.append(tr);
          });
        }
        ,done: function(res, index, upload){
          if(res.files.file){ //上传成功
            var tr = demoListView.find('tr#upload-'+ index)
            ,tds = tr.children();
            tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
            tds.eq(3).html(''); //清空操作
            return delete this.files[index]; //删除文件队列已经上传成功的文件
          }
          this.error(index, upload);
        }
        ,error: function(index, upload){
          var tr = demoListView.find('tr#upload-'+ index)
          ,tds = tr.children();
          tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
          tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
        }
      });

    })

  },
  methods:{
    check(){
      //从审核状态表中获取对应的审核状态
      layer.msg("审核中")
      // layer.msg("已通过")
      // layer.msg("未通过")
    }
  }
}
</script>>
