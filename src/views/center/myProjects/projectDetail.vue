<template>
  <div>
    <div class="pro_detail_wrapper" style="width:1200px;margin:0 auto;padding-top:58px;">
      <div class="title" style="color:24px;font-size:24px;margin-bottom:36px;">项目信息</div>
      <div class="content" style="border:1px solid #E8E8E8;margin-bottom:25px;">
        <div
          style="padding:18px 32px;background:rgba(250,250,250,1);border-bottom:1px solid #E8E8E8;"
        >项目内容</div>
        <ul class="first">
          <li>
            <div>
              <p class="data_title">项目名称</p>
              <p class="data_item">青浦国际康养城</p>
            </div>
            <div>
              <p class="data_title">项目地址</p>
              <p class="data_item">上海市青浦区北青路9138号</p>
            </div>
            <div>
              <p class="data_title">项目交付日期</p>
              <p class="data_item">2019-08-19</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">项目类型</p>
              <p class="data_item">康养</p>
            </div>
            <div>
              <p class="data_title">经度/纬度</p>
              <p class="data_item">115.8566°/37.78722°</p>
            </div>
            <div>
              <p class="data_title">申请日期</p>
              <p class="data_item">2019-08-19</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">项目状态</p>
              <p class="data_item">审核通过</p>
            </div>
            <div>
              <p class="data_title">装修情况</p>
              <p class="data_item">精装</p>
            </div>
            <div>
              <p class="data_title">资产运营商</p>
              <p class="data_item">上海圣维物业管理有限公司</p>
            </div>
          </li>
        </ul>
        <div class="intro" style="font-size:14px;padding:0 32px;">
          <p class="data_title data_comm">项目介绍</p>
          <p
            class="data_item data_comm"
          >项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍</p>
        </div>
      </div>
      <div class="info" style="border:1px solid #E8E8E8;">
        <div
          style="padding:18px 32px;background:rgba(250,250,250,1);border-bottom:1px solid #E8E8E8;"
        >证书信息</div>
        <ul class="list_wrapper">
          <li>
            <div class="title">《建设用地规划许可证》</div>
            <div class="bg"></div>
          </li>
          <li>
            <div class="title">《建设工程规划许可证》</div>
            <div class="bg"></div>
          </li>
          <li>
            <div class="title">《建设用地规划许可证》</div>
            <div class="bg"></div>
          </li>
          <li>
            <div class="title">《国有土地使用证》</div>
            <div class="bg"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style lang="less" scoped>
.data_title {
  color: #666666;
}
.data_item {
  color: #333333;
}
.data_comm {
  margin: 0;
  margin-bottom: 5px;
  padding: 0;
}
.first {
  display: flex;
  font-size: 14px;
  padding: 0 32px;
  li {
    flex: 1;
    div {
      margin: 24px 0;
      p {
        margin: 0;
        margin-bottom: 5px;
        padding: 0;
      }
    }
  }
}
.list_wrapper {
  margin-top: 24px;
  padding:0 32px;
  overflow: hidden;
  li{
    width:calc(33.33% - 10px);
    float: left;
    margin-bottom: 24px;
    .title {
      color:#666666;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .bg{
      width:120px;
      height: 120px;
      background: green;
    }
  }

}
</style>