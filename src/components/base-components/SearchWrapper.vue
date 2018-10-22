<template>
    <div class="search-wrapper">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'SearchWrapper',
};
</script>

<style lang="scss" scoped>
    .search-wrapper {
        background: #ffffff;
        padding: 30px 25px;
        margin-bottom: 20px;
    }
</style>

