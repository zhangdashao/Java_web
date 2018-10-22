<template>
    <div :class="['question-toolbox',{'toolbox-border':isHover}]" @mouseover="handleMouseEnter" @mouseout="handleMouseLeave">
        <slot></slot>
        <hr>
        <div style="height:32px;" v-show="!isHover"></div>
        <el-row v-show="isHover" type="flex" justify="start">
            <el-button-group>
                <el-button type="primary" @click="operateSign('add')">此题后插入新题</el-button>
                <el-button type="primary" @click="operateSign('edit')">编辑</el-button>
                <el-button type="primary" @click="emitAction('remove')">删除</el-button>
                <el-button type="primary" @click="emitAction('up')">上移</el-button>
                <el-button type="primary" @click="emitAction('down')">下移</el-button>
                <el-button type="primary" @click="emitAction('front')">最前</el-button>
                <el-button type="primary" @click="emitAction('behind')">最后</el-button>
            </el-button-group>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'QuestionToolbox',
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isHover: false,
    };
  },
  methods: {
    handleMouseEnter() {
      this.isHover = true;
    },
    handleMouseLeave() {
      this.isHover = false;
    },
    emitAction(type) {
      this.$emit('hanldeEmit', {
        type,
        index: this.index,
      });
    },
    operateSign(type) {
      this.$emit('doOperateSign', { type, index: this.index });
    },
  },
};
</script>
<style lang="scss" scoped>
.question-toolbox {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid transparent;
}
.toolbox-border {
    border: 1px solid #cccccc;
}
</style>

