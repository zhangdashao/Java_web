<template>
    <div class="base-radio">
      <h5>{{`${qnumber+1}、${data.content}`}}</h5>
        <el-radio-group v-model="value">
            <el-radio v-for="(item,index) in data.optData" :key="index" :label="item.optText" :value="item.optValue">{{item.optText}}</el-radio>
        </el-radio-group>
    </div>
</template>

<script>
export default {
  name: 'BaseRadio',
  props: {
    data: {
      type: Object,
      default() {
        return { };
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
