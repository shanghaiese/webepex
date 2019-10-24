<template>
  <div>关于我们</div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },
  created() {
    this.$store.commit("editIndex", {info: "aboutUs"});
  }
};
</script>

<style lang="less" scoped></style>
