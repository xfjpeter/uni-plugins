<template>
  <view>
    <view class="mb">
      <view class="title">常规用法：</view>
      <v-tabs v-model="current" :tabs="tabs2" @change="changeTab"></v-tabs>
    </view>
    <view class="mb">
      <view class="title">无下划线、无胶囊：</view>
      <v-tabs v-model="current" :tabs="tabs" :bold="true" line-height="0" line-radius="0" @change="changeTab"></v-tabs>
    </view>
    <!-- <view class="mb">
      <view class="title">键值、平铺用法：</view>
      <v-tabs v-model="activeTab" :scroll="false" :bold="true" :tabs="tabs1" field="name"></v-tabs>
    </view> -->
    <view class="mb">
      <view class="title">胶囊用法、背景、padding：</view>
      <v-tabs v-model="current" padding="10px 0" pills-border-radius="60rpx" bg-color="#f6f6f6" :tabs="tabs" :pills="true" :bold="true" line-height="0" activeColor="#fff" @change="changeTab"></v-tabs>
    </view>
    <view class="mb">
      <view class="title">完整参数用法：</view>
      <v-tabs
        v-model="current"
        :tabs="tabs"
        color="#333"
        activeColor="#fff"
        fontSize="28rpx"
        :bold="true"
        :scroll="true"
        height="60rpx"
        lineHeight="10rpx"
        lineColor="#2979ff"
        :lineScale="0.5"
        lineRadius="10rpx"
        :pills="true"
        pillsColor="#2979ff"
        pillsBorderRadius="10rpx"
      ></v-tabs>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      current: 0,
      activeTab: 1,
      tabs: ['军事', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻'],
      tabs2: ['全部', '待付款', '待消费', '已完成', '已评价', '已过期', '已退款'],
      tabs1: [
        {
          name: '全部',
          value: 1
        },
        {
          name: '待支付',
          value: 2
        },
        {
          name: '进行中',
          value: 3
        },
        {
          name: '已完成',
          value: 4
        }
      ]
    }
  },
  methods: {
    changeTab (index) {
      console.log('当前 index :' + index)
    }
  }
}
</script>

<style lang="scss" scoped>
.mb {
  margin-bottom: 60rpx;
}
</style>
