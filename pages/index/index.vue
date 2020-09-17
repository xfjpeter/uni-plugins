<template>
  <view class="">
    <view class="example">
      <navigator url="../tabs/tabs">v-tabs 基本示例</navigator>
      <navigator url="../tabs/order">tabs + swiper 订单展示</navigator>
      <navigator url="../tabs/tabs-static">tabs 固定在顶部</navigator>
      <navigator url="../navbar/navbar">navbar 示例</navigator>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.example {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30rpx;
  box-sizing: border-box;

  navigator {
    width: 48%;
    margin-bottom: 30rpx;
    color: #ffffff;
    background-color: #2979ff;
    border-radius: 10rpx;
    padding: 30rpx;
    box-sizing: border-box;
  }
}
</style>