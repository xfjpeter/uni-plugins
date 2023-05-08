<template>
  <view>
    <div>
      <span @click="show = true">点我调用键盘：{{ inputValue }}</span>
    </div>
    <v-keyboard type="tel" :show.sync="show" :value.sync="inputValue" @confirm="onConfirm" :max-length="11"></v-keyboard>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      show: false
    }
  },
  methods: {
    onConfirm(value) {
      alert(`当前输入完成，输入的内容是：${value}`)
    },
    toggleKeyboard() {
      this.show = true
    }
  }
}
</script>

<style lang=" scss" scoped></style>
