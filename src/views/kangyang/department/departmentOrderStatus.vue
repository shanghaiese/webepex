<template>
  <div>康养公寓订单状态</div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },
  created () {
    this.$store.commit("editIndex", {info: "departmentOrderStatus"});
  }
};
</script>

<style lang="less" scoped></style>