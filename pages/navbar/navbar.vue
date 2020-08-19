<template>
  <view class="">
    <v-navbar title="测试标题测试标题测试标题测试标题测试标题测试标题测试标题" @on-navbar-left="clickLeft" @on-navbar-center="clickCenter" @on-navbar-right="clickRight">
    </v-navbar>

    <view v-for="i in 100">
      {{ `index - ${i}` }}
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    clickLeft () {
      uni.showToast({
        title: '点击左侧',
        icon: 'none'
      })
    },
    clickCenter () {
      uni.showToast({
        title: '点击中间',
        icon: 'none'
      })
    }, clickRight () {
      uni.showToast({
        title: '点击右侧',
        icon: 'none'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>