<template>
    <div class="base-checkout">
        <h5>{{`${qnumber+1}、${data.content}`}}</h5>
        <el-checkbox-group v-model="value">
            <el-checkbox v-for="(item,index) in data.optData" :key="index" :label="item.optText" :value="item.optValue"></el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
export default {
  name: 'BaseCheckout',
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
      value: [],
    };
  },
};
</script>
