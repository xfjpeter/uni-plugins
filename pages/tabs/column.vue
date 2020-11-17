<template>
  <view class="container">
    <v-tabs-column
      :tabs="tabs"
      :is-tabbar="false"
      position="left"
      active-color="#f00"
      inactive-color="#444"
      bg-color="#f3f3f3"
      active-bg-color="#fff"
      v-model="current"
      padding="30rpx 30rpx"
      bold="bold"
      :active-style="{
        color: '#f00',
        fontWeight: 'bold',
        fontSize: '32rpx'
      }"
      @change="changeTab"
    >
      <view class="p" v-for="i in 100" :key="i">{{ i }}我只是静态的文字，展示作用</view>
    </v-tabs-column>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 3,
      tabs: [
        '服装',
        '手机',
        '鞋子',
        '衬衣',
        'T桖',
        '键盘',
        '电脑',
        '手机',
        '玩具',
        '电瓶车',
        '背包',
        '手表',
        '餐具',
        '服装',
        '手机',
        '鞋子',
        '衬衣',
        'T桖',
        '键盘',
        '电脑',
        '手机',
        '玩具',
        '电瓶车',
        '背包',
        '手表',
        '餐具'
      ]
    }
  },
  methods: {
    changeTab(index) {
      uni.showToast({
        title: '当前选中的是：' + this.tabs[index],
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.p {
  font-size: 24rpx;
  color: #333;
  padding: 10rpx 30rpx;
}
</style>
