<template>
  <a-form :layout="formLayout">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal"> Horizontal </a-radio-button>
        <a-radio-button value="vertical"> Vertical </a-radio-button>
        <a-radio-button value="inline"> Inline </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :validate-status="fieldAStatus"
      has-feedback
      :help="fieldAHelp"
    >
      <a-input v-model="fieldA" placeholder="input placeholder" />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :validate-status="fieldBStatus"
      has-feedback
      :help="fieldBHelp"
    >
      <a-input v-model="fieldB" placeholder="input placeholder" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      fieldA: "",
      fieldB: "",
      fieldAStatus: "",
      fieldAHelp: "",
      fieldBStatus: "",
      fieldBHelp: "",
    };
  },
  watch: {
    fieldA(val) {
      if (val.length <= 5) {
        this.fieldAStatus = "error";
        this.fieldAHelp = "必须大于5个字符";
      } else {
        this.fieldAStatus = "";
        this.fieldAHelp = "";
      }
    },
    fieldB(val) {
      if (!val.length) {
        this.fieldBStatus = "error";
        this.fieldBHelp = "不能为空";
      } else {
        this.fieldBStatus = "";
        this.fieldBHelp = "";
      }
    },
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      if (this.fieldA.length <= 5 && !this.fieldB.length) {
        this.fieldAStatus = "error";
        this.fieldAHelp = "必须大于5个字符";
        this.fieldBStatus = "error";
        this.fieldBHelp = "不能为空";
      } else if (this.fieldA.length <= 5) {
        this.fieldAStatus = "error";
        this.fieldAHelp = "必须大于5个字符";
      } else if (!this.fieldB.length) {
        this.fieldBStatus = "error";
        this.fieldBHelp = "不能为空";
      } else {
        console.log({
          fieldA: this.fieldA,
          fieldB: this.fieldB,
        });
      }
    },
  },
};
</script>
