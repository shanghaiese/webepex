<template>
  <div>法律信息</div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    this.$store.commit("editIndex", {info: "lawInfo"});
  }
};
</script>

<style lang="less" scoped></style>
