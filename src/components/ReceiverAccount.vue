<template>
  <a-input-group compact>
    <a-select v-model="type" style="width: 120px;" @change="handleTypeChange">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行账户</a-select-option>
    </a-select>
    <a-input style="width: calc(100% - 120px);" v-model="number" @change="handleNumberChange"/>
  </a-input-group>
</template>

<script>
  export default {
    props: {
      //接收父组件传递来的value属性
      value: {
        type: Object,
      },
    },
    data() {
      const { type, number } = this.value;
      return {
        type: type || "alipay",
        number: number || ""
      };
    },
    watch: {
      value(val) {
        // 当value变化时，会调用这个函数
        //Object.assign(this, val)是将val拷贝到this上
        //this指的是子组件实例本身
        //在这里value是父组件传来的prop，当父组件的value变化时，会同步给子组件的type、number
        //以保持子组件中展示的数据与父组件传递的数据同步。
        Object.assign(this, val);
      }
    },
    methods: {
      handleTypeChange(val) {
        /* $emit 是 Vue.js 提供的方法，用于触发事件。
        它的第一个参数是要触发的事件名，第二个参数是要传递给事件处理函数的数据。 */
        //触发了一个自定义事件 change，并将一个包含了更新后的type值的value对象传递给父组件
        /* 父组件中监听了 ReceiverAccount 组件发出的 change 事件，
    通过一个事件处理函数来处理 change 事件，在父组件中，这个事件处理函数没有直接定义在模板中，
    而是通过 v-decorator 配置传递给 ReceiverAccount 组件，
    实际上是由 Ant Design Vue 的 Form 组件来处理的，它会处理 change 事件，调用相关的校验规则。*/
        /*当handleTypeChange被调用、handleNumberChange被调用的时候，使得父组件的value发生变化，
        也会调用watch中的函数*/
        this.$emit("change", { ...this.value, type: val });
      },
      handleNumberChange(e) {
        this.$emit("change", { ...this.value, number: e.target.value });
      }
    },
  };
</script>

<style></style>
