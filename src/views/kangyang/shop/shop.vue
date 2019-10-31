<template>
  <div>
      <div class="wrapper">
          <img src="../../../assets/img/later.png" alt="">
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    created() {
        this.$store.commit("editIndex", { info: "shop" });
    }
};
</script>

<style lang="less" scoped>
.wrapper{
    width:1200px;
    margin: 0 auto;
    overflow: hidden;
    img{
        float: left;
        width: 100%;
    }
}
</style>