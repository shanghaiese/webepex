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
              <p class="data_item">{{projectData.projetName}}</p>
            </div>
            <div>
              <p class="data_title">项目地址</p>
              <p class="data_item">{{projectData.address}}</p>
            </div>
            <div>
              <p class="data_title">项目交付日期</p>
              <p class="data_item">{{projectData.deliveryTime}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">项目类型</p>
              <p class="data_item" v-if="projectData.assetType !== undefined">{{projectData.assetType.name}}</p>
            </div>
            <div>
              <p class="data_title">经度/纬度</p>
              <p class="data_item">{{projectData.lon}}/{{projectData.lat}}</p>
            </div>
            <div>
              <p class="data_title">申请日期</p>
              <p class="data_item">{{projectData.createTime}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">项目状态</p>
              <p class="data_item" v-if="projectData.auditStatus !== undefined">{{projectData.auditStatus.name}}</p>
            </div>
            <div>
              <p class="data_title">装修情况</p>
              <p class="data_item">{{projectData.decoration}}</p>
            </div>
            <!-- <div>
              <p class="data_title">项目建成日期</p>
              <p class="data_item">{{projectData.completeTime}}</p>
            </div> -->
            <div>
              <p class="data_title">资产运营商</p>
              <p class="data_item">{{projectData.assignOperator}}</p>
            </div>
          </li>
        </ul>
        <!-- <div class="intro" style="font-size:14px;padding:0 32px;">
          <p class="data_title data_comm">项目介绍</p>
          <p
            class="data_item data_comm"
          >{{projectData.description}}</p>
        </div> -->
      </div>
      <div class="info" style="border:1px solid #E8E8E8;">
        <div
          style="padding:18px 32px;background:rgba(250,250,250,1);border-bottom:1px solid #E8E8E8;"
        >证书信息</div>
        <ul class="list_wrapper">
          <li v-for="(item,key) in infoData" :key="key">
            <div style="cursor: pointer; width:200px; color: #CAA14F" @click="toProtocol(key)" class="title">{{item.title}}</div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import http from "@/api/taotaozi_api.js";
export default {
  data() {
    return {
      projectData: {},
      infoData: [
        {
          title: "《建设用地规划许可证》",
        },
        {
          title: "《土地证》",
        },
        {
          title: "《一期建设工程规划许可证》",
        },
        {
          title: "《一期施工许可证》",
        }
      ],//--证书数据
      dialogVisible: false,
      dialogImageUrl: "",
      projectId: null
    };
  },
  methods: {
    // 预览大图
    goToBigImage(url) {
      this.dialogVisible = true;
      this.dialogImageUrl = url;
    },
    toProtocol (key) {
      console.log(key)
      console.log(this.projectId)
      
      switch (key) {
        case 0:
          window.open('https://uat-api.e-pex.com/upload/apartment/' + this.projectId + '/constructionpermit.pdf');
          break;
        case 1:
          window.open('https://uat-api.e-pex.com/upload/apartment/' + this.projectId + '/landcertificate.pdf');
          break;
        case 2:
          window.open('https://uat-api.e-pex.com/upload/apartment/' + this.projectId + '/planningpremit.pdf');
          break;
        case 3:
          window.open('https://uat-api.e-pex.com/upload/apartment/' + this.projectId + '/constructionpermit.pdf');
          break;
        default:
          break;
      }
    },
    getData() {
      http.projectDetail({
        id:this.projectId
      })
      .then(res=>{
        console.log(res);
        if(res.code===200) {
          this.projectData = res.data;
        }
      })
    }
  },
  created() {
    this.$store.commit("editIndex", {info: "projectDetail"});
    let id = window.sessionStorage.getItem("projectId");
    if(!!id) {
      this.projectId = id;
      this.getData();
    }
  }
};
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
        height: 16px;
        line-height: 16px;
      }
    }
  }
}
.list_wrapper {
  margin-top: 24px;
  padding: 0 32px;
  overflow: hidden;
  li {
    width: calc(33.33% - 10px);
    float: left;
    margin-bottom: 24px;
    .title {
      color: #666666;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .bg {
      width: 120px;
      height: 120px;
      margin: 0;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      .tip {
        color: white;
        background: rgba(0, 0, 0, 0.5);
        font-size: 24px;
        width: 100%;
        height: 0px;
        line-height: 32px;
        text-align: center;
        position: absolute;
        bottom: 0px;
        left: 0;
        overflow: hidden;
        transition: 0.5s;
        margin: 0;
      }
      &:hover .tip {
        height: 32px;
      }
    }
  }
}
</style>