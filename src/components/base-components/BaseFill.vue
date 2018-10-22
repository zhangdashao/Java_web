<template>
    <div class="base-fill">
        <h5>{{`${qnumber+1}、${data.content}`}}</h5>
        <el-row>
            <el-col :span="8">
                <el-input v-model="value" placeholder="请输入内容"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'BaseFill',
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
