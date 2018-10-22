<template>
    <div class="base-select">
        <h5>{{`${qnumber+1}、${data.content}`}}</h5>
        <el-select v-model="value" placeholder="请选择">
            <el-option v-for="(item,index) in data.optData" :key="index" :label="item.optText" :value="item.optValue">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    qnumber: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      value: '',
    };
  },
};
</script>
