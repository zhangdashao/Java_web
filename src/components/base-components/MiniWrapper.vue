<template>
    <div class="mini-wrapper">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'MiniWrapper',
};
</script>
<style lang="scss" scoped>
    .mini-wrapper{
        background: #ffffff;
        padding: 5px 25px;
        margin-bottom: 2px;
    }
</style>

