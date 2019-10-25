<template>
  <div>康养公寓下单</div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },
  created () {
    this.$store.commit("editIndex", {info: "departmentOrder"});
  }
};
</script>

<style lang="less" scoped></style>