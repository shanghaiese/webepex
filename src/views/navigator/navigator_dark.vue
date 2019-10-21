<template>
  <div>
    <div class="container clearFixed">
      <ul class="nav_left clearFixed">
        <li @click="goToHomepage($event)">首页</li>
        <li @click="goToKangyang($event)">康养公寓</li>
      </ul>
      <ul class="nav_right clearFixed">
        <li>
          <el-autocomplete
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
            prefix-icon="el-icon-search"
          ></el-autocomplete>
        </li>
        <li class="clearFixed">
          <div v-show="false" class="unlogin_status clearFixed">
            <div class="register" @click="goToRegister">
              <i class="el-icon-user" style="margin-right:8px;"></i>注册
            </div>
            <div class="login" @click="goToLogin">
              <i class="el-icon-chat-line-round" style="margin-right:8px;"></i>登录
            </div>
          </div>
          <div v-show="true" class="login_status">
            <el-dropdown :hide-on-click="false">
              <span class="el-dropdown-link">
                <i class="el-icon-user"></i>
                15533334445
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="item">黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      restaurants: [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        }
      ],
      state1: ""
    };
  },
  methods: {
    goToHomepage(e) {
      this.initTextColor();
      let el = e.target;
      el.style.color = "#CAA14F";
      this.$router.push("/registerPersonal");
    },
    goToKangyang(e) {
      this.initTextColor();
      let el = e.target;
      el.style.color = "#CAA14F";
      this.$router.push("/registerEnterprise");
    },
    //----------将导航文字颜色重置
    initTextColor() {
      let lis = document.querySelectorAll(".nav_left li");
      for (let i = 0; i < lis.length; i++) {
        lis[i].style.color = "white";
      }
    },
    // --------------------------------搜索下拉部分
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    //----------------------------------跳转到注册页
    goToRegister() {
      this.$router.push("/registerPersonal");
    },
    //----------------------------------跳转到登录页
    goToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1920px;
  margin: 0 auto;
  height: 70px;
  background: rgba(49, 52, 67, 1);
  opacity: 0.92;
  background-image: url(./../../assets/img/nav_logo_light.png);
  background-repeat: no-repeat;
  background-position: 360px center;
  background-size: 112px 30px;
  .nav_left {
    float: left;
    margin-left: 580px;
    color: white;
    height: 70px;
    line-height: 70px;
    li {
      float: left;
      &:hover {
        color: #caa14f;
        cursor: pointer;
      }
    }
    li + li {
      margin-left: 56px;
    }
  }
  .nav_right {
    float: right;
    color: white;
    height: 70px;
    margin-right: 360px;
    li {
      float: left;
      line-height: 70px;
      height: 70px;
      /deep/.el-input__inner {
        background: transparent;
        border: none;
        border-bottom: 1px solid white;
        border-radius: 0;
        color: white;
      }
      .unlogin_status {
        div {
          float: left;
          &:hover {
            color: #caa14f;
            cursor: pointer;
          }
        }
        .login {
          margin-left: 30px;
        }
      }
      .login_status {
          float: left;
          color: white;
          height: 70px;
          padding:0 8px;
          /deep/.el-dropdown{
              color:white;
          }
          &:hover{
                  background: #caa14f;
              }
        //  /deep/.el-dropdown-menu__item:focus, /deep/.el-dropdown-menu__item:hover {
        //      background-color: pink !important;
        //      color: green !important;
        //  }
          .item {
              color:red !important;
          }
      }
    }
    li + li {
      margin-left: 30px;
    }
  }
}
</style>
