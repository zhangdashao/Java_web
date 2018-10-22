<template>
    <div class="padding-wrapper">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'PaddingWrapper',
};
</script>

<style lang="scss" scoped>
    .padding-wrapper{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 20px 40px;
        font-size: 16px;
    }
</style>

