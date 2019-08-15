<template>
    <div class="question-appendbox">
        <el-form ref="appendForm" :model="appendForm" :rules="appendFormRules" label-width="80px" size="mini" status-icon>
            <el-row type="flex">
                <el-form-item label="题目权值" prop="question_weight">
                    <el-input v-model="appendForm.question_weight"></el-input>
                </el-form-item>
                <el-form-item label="题目类型">
                    <el-select v-model="appendForm.type" placeholder="请选择">
                        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="纬度" prop="latitudeId">
                    <el-select v-model="appendForm.latitudeId" placeholder="请选择">
                        <el-option v-for="item in latitudeList" :key="item.id" :label="item.wd_name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="isEdit">
                    <el-tooltip effect="dark" content="当前面题目选中某些选项时才出现此题" placement="top">
                        <el-button type="primary" @click="openInner">编辑关联逻辑</el-button>
                    </el-tooltip>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="题目内容" prop="content">
                    <el-input v-model="appendForm.content"></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-table v-if="isOptType" :data="optData" style="width: 100%">
                    <el-table-column label="选项文字" width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.optText"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="权值" width="180">
                        <template slot-scope="scope">
                            <el-input type="number" v-model="scope.row.optValue"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button @click="handleOpt('add',scope)" type="primary">添加</el-button>
                                <el-button @click="handleOpt('remove',scope)" type="primary">删除</el-button>
                                <el-button @click="handleOpt('up',scope)" type="primary">上移</el-button>
                                <el-button @click="handleOpt('down',scope)" type="primary">下移</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
                <el-form v-if="isSlider" :model="sliderData" label-width="80px">
                    <el-row type="flex">
                        <el-form-item label="最小值:">
                            <el-input type="number" v-model="sliderData.minValue"></el-input>
                        </el-form-item>
                        <el-form-item label="最小值显示文本:" label-width="130px">
                            <el-input v-model="sliderData.minText"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row type="flex">
                        <el-form-item label="最大值:">
                            <el-input type="number" v-model="sliderData.maxValue"></el-input>
                        </el-form-item>
                        <el-form-item label="最大值显示文本:" label-width="130px">
                            <el-input v-model="sliderData.maxText"></el-input>
                        </el-form-item>
                    </el-row>
                </el-form>
                <el-row style="margin-top:15px;">
                    <el-button type="primary" style="width:100%" size="large" @click="overEdit">完成编辑</el-button>
                </el-row>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { exchangeArrayItem, deepCloneJson, createGuid, propIsEmpty } from '$global/global-function';

export default {
  name: 'QuestionAppendbox',
  props: {
    editData: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
    relyStore: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      appendForm: {
        index: '',
        type: 'Radio',
        latitudeId: '',
        content: '',
      },
      appendFormRules: {
        question_weight: [
          { required: true, message: '请填写题目权值', trigger: 'blur' },
        ],
        latitudeId: [
          { required: true, message: '请填写题目纬度', trigger: 'change' },
        ],
        content: [
          { required: true, message: '请填写题目内容', trigger: 'blur' },
        ],
      },
      latitudeList: [],
      typeOptions: [
        {
          label: '单选',
          value: 'Radio',
        },
        {
          label: '多选',
          value: 'Checkout',
        },
        {
          label: '填空',
          value: 'Fill',
        },
        {
          label: '下拉框',
          value: 'Select',
        },
        {
          label: '滑块',
          value: 'Slider',
        },
      ],
      optData: [
        {
          optText: '选项1',
          optValue: '',
        },
        {
          optText: '选项2',
          optValue: '',
        },
      ],
      sliderData: {
        minValue: 0,
        minText: '不满意',
        maxValue: 100,
        maxText: '满意',
      },
    };
  },
  computed: {
    isOptType() {
      return this.appendForm.type === 'Radio' || this.appendForm.type === 'Checkout' || this.appendForm.type === 'Select';
    },
    isSlider() {
      return this.appendForm.type === 'Slider';
    },
  },
  mounted() {
    this.getQuestionLatitudeList();
    if (this.isEdit) {
      const editData = deepCloneJson(this.editData);
      editData.latitudeId = editData.latitude.wd_num;
      delete editData.latitude;
      let optData;
      if (editData.type === 'Radio' || editData.type === 'Checkout' || editData.type === 'Select') {
        optData = deepCloneJson(editData.optData);
        delete editData.optData;
        this.appendForm = editData;
        this.optData = optData;
      } else if (editData.type === 'Slider') {
        optData = deepCloneJson(editData.optData);
        delete editData.optData;
        this.appendForm = editData;
        this.sliderData = optData;
      } else {
        this.appendForm = editData;
      }
    }
  },
  methods: {
    getQuestionLatitudeList() {
      this.$api.getQuestionLatitudeList().then(({ data }) => {
        this.latitudeList = data;
        this.appendForm.latitudeId = this.latitudeList.length ? this.latitudeList[0].id : '';
      });
    },
    handleOpt(type, scope) {
      const defaultOpt = {
        optText: '默认选项',
        optValue: '',
      };
      switch (type) {
        case 'add':
          {
            const currentIndex = scope.$index + 1;
            this.optData.splice(currentIndex, 0, defaultOpt);
          }
          break;
        case 'remove':
          if (this.relyStore.includes(this.optData[scope.$index].optId)) {
            this.$message.error('请解除当前选项关联之后再进行删除!');
          } else {
            this.optData.length > 1 ? this.optData.splice(scope.$index, 1) : this.$message.warning('至少保留一个选项');
          }
          break;
        case 'up':
          {
            const currentIndex = scope.$index;
            const changeIndex = scope.$index - 1;
            if (!(changeIndex < 0)) {
              this.optData = exchangeArrayItem(this.optData, currentIndex, changeIndex);
            }
          }
          break;
        case 'down':
          {
            const currentIndex = scope.$index;
            const changeIndex = scope.$index + 1;
            if (!(changeIndex > this.optData.length - 1)) {
              this.optData = exchangeArrayItem(this.optData, currentIndex, changeIndex);
            }
          }
          break;
        default:
          break;
      }
    },
    overEdit() {
      this.$refs.appendForm.validate((valid) => {
        if (valid) {
          // 以上为题目基本内容校验
          const sliderData = deepCloneJson(this.sliderData);
          if (this.isOptType) {
            if (this.optData.some(item => (item.optText === '' || item.optValue === ''))) {
              this.$message.warning('请填写完整选项配置信息');
            } else {
              // 选项题 校验
              this.completeEdit();
            }
          } else if (this.isSlider && propIsEmpty(sliderData)) {
            this.$message.warning('请填写完整滑块配置信息');
          } else {
            // 填空题仅校验题目基本内容， 包含滑块题非空校验
            this.completeEdit();
          }
        }
      });
    },
    completeEdit() {
      const confirmQuestion = deepCloneJson(this.appendForm);
      const { id: wd_num, wd_code, wd_name } = this.latitudeList.find(item => (item.id === confirmQuestion.latitudeId));
      confirmQuestion.latitude = { wd_num, wd_code, wd_name };
      delete confirmQuestion.latitudeId;
      if (this.isOptType) {
        confirmQuestion.optData = deepCloneJson(this.optData);
      } else if (this.isSlider) {
        confirmQuestion.optData = deepCloneJson(this.sliderData);
      }
      if (this.isEdit && this.isOptType) {
        // 编辑状态 并且 是可关联类型 新增选项添加guid
        // 未做删除前 判断guid是否有关联关系<<<<<<<<<<<<<<<, 选项不删除不做任何guid处理，新增选项新增关联逻辑
        confirmQuestion.optData.map((item) => {
          item.hasOwnProperty('optId') ? '' : item.optId = createGuid();
        });
        this.$emit('confirmQuestion', confirmQuestion, true);
      } else if (this.isEdit) {
        // 编辑状态 不可关联类型 直接更新数据
        this.$emit('confirmQuestion', confirmQuestion, true);
      } else {
        // 新增状态创建guid
        confirmQuestion.questionId = createGuid();
        if (this.isOptType) {
          confirmQuestion.optData.map((item) => {
            item.optId = createGuid();
          });
        }
        this.$emit('confirmQuestion', confirmQuestion, false);
      }
    },
    openInner() {
      this.$emit('openInner');
    },
  },
};
</script>

