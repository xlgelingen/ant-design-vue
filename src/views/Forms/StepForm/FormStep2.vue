<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账号"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        {{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入付款密码',
                },
              ],
            },
          ]"
          type="password"
          placeholder="请输入付款密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button style="margin-left: 20px" @click="onPrev">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    //创建form实例，$form通过vue.use(Form)来挂载到vue实例上，就可以通过this.$form来访问
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    },
  },
  methods: {
    onPrev() {
      this.$router.push("/form/step-form/info");
    },
    handleSubmit() {
      const { form, $store, step } = this;
      form.validateFields((err, values) => {
        console.log(err, values);
        if (!err) {
          console.log(values);
          //注意：step2和step1的提交事件是不一样的，一个是store.commit()，一个是store.dispatch()通过action来提交
          // 以载荷形式分发
          $store.dispatch("form/submitStepForm", {
            //把第一步的结果保留下来...step
            payload: { ...step, ...values },
          });
          // 以对象形式分发
          // $store.dispatch({
          //     type: "form/submitStepForm",
          //     payload: { ...step, ...values }
          // });
        }
      });
    },
  },
};
</script>

<style></style>

