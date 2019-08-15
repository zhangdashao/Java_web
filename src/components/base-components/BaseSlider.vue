<template>
    <div class="base-slider">
        <h5>{{`${qnumber+1}、${data.content}`}}</h5>
        <el-row>
            <el-col :span="16" class="slider-center">
                <span>{{data.optData.minText}}</span>
                <el-slider style="width:70%;" v-model="value" :max="data.optData.maxValue" :min="data.optData.minValue"></el-slider>
                <span>{{data.optData.maxText}}</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'BaseSlider',
  props: {
    data: {
      type: Object,
      default() {
        return {
          value: '',
        };
      },
    },
    qnumber: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      value: 0,
    };
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
    .base-slider{
        .slider-center{
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }
</style>

