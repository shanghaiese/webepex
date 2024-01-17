<template>
  <div>
    <div class="wrap">
      <div class="head">权易宝网站地图</div>
      <div class="content">
        <ul class="item">
          <li class="title">账户</li>
          <li class="text" @click="goToPage('/registerPersonal')">注册</li>
          <li class="text" @click="goToPage('/login')">登录</li>
          <li class="last text" @click="goToPage('/passwordFind')">忘记密码</li>
          <li class="title">车位</li>
        </ul>
        <ul class="item">
          <li class="title">关于我们</li>
          <li class="last text" @click="goToPage('/aboutUs')">关于权易宝</li>
          <li class="title">长租公寓</li>
        </ul>
        <ul class="item">
          <li class="title">康养公寓</li>
          <li class="last text" @click="goToPage('/departmentList')">绿地国际康养城 颐尚居 颐尊（无忧）会籍</li>
          <li class="title">商铺</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    this.$store.commit("editIndex", { info: "map" });
  },
  methods: {
    goToPage(pa) {
      if (pa === "/login") {
        this.$router.replace({
          path: "/login",
          query: { redirect: this.$router.currentRoute.fullPath }
        });
      }else{
        this.$router.push(pa);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 1200px;
  margin: 0 auto;
  padding-top: 58px;
  color: #333333;
  .head {
    font-size: 24px;
    text-align: center;
    margin-bottom: 40px;
  }
  .content {
    display: flex;
    .item {
      flex: 1;
      li {
        color: #caa14f;
        font-size: 14px;
        margin-top: 20px;
      }
      .last {
        margin-bottom: 40px;
      }
      .text:hover {
        cursor: pointer;
      }
      .title {
        margin-bottom: 10px;
        font-size: 20px;
        color: #333333;
      }
    }
  }
}
</style>
