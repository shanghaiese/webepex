<template>
  <div></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'RedirectPage',
  created () {
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({ path: `/${path}`, query });
  },
  render (h) {
    return h()
  }
}
</script>

<style lang="less" scoped></style>
