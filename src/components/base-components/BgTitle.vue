<template>
    <div class="bg-title">
        <h1>{{title}}</h1>
    </div>
</template>
<script>
export default {
  name: 'BaseBgTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
    .bg-title{
        height: 90px;
        width: 100%;
        background: url('../../assets/image/title_bg.jpg') 0 0 no-repeat;
        background-size: cover;
        h1{
            color: #ffffff;
            font-size: 24px;
            font-weight: normal;height: 90px;
            line-height: 90px;
            text-indent: 35px;
            margin: 0;
        }
    }
</style>

