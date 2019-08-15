<template>
    <h2 class="base-title">
        {{title}}
    </h2>
</template>

<script>
export default {
  name: 'BaseTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
  .base-title{
    font-weight: normal;
    text-indent: 10px;
    margin-top: 0;
  }
</style>

