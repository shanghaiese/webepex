<template>
  <div>网站地图</div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    this.$store.commit("editIndex", {info: "map"});
  }
};
</script>

<style lang="less" scoped></style>
