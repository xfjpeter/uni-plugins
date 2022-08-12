<template>
  <view class="container">
    <view class="mb">
      <view class="title">常规用法：</view>
      <v-tabs v-model="current" :tabs="tabs3" @change="changeTab"></v-tabs>
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
      <v-tabs
        v-model="current"
        padding="10px 0"
        pills-border-radius="60rpx"
        bg-color="#f6f6f6"
        :tabs="tabs"
        :pills="true"
        :bold="true"
        line-height="0"
        activeColor="#fff"
        @change="changeTab"
      ></v-tabs>
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

    <view class="mb">
      <v-tabs v-model="current" :tabs="tabs4" @change="changeTab" field="name" :scroll="false" />
      <button @click="toggleDisabledStatus">{{ isDisabled ? '启用' : '禁用' }}(退款/售后)</button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      isDisabled: true,
      current: 1,
      activeTab: 1,
      tabs: ['军事', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻'],
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
      ],
      tabs2: ['全部', '待付款', '待消费', '已完成', '已评价', '已过期', '已退款'],
      tabs3: ['选项一', '选项二'],
      tabs4: [
        { id: 1, name: '待付款', disabled: false },
        { id: 2, name: '待收货', disabled: false },
        { id: 3, name: '待评价', disabled: false },
        { id: 4, name: '退款/售后', disabled: true },
        { id: 5, name: '我的订单', disabled: false }
      ]
    }
  },
  methods: {
    changeTab (index) {
      console.log('当前 index :' + index)
    },
    toggleDisabledStatus () {
      this.isDisabled = !this.isDisabled
      this.tabs4[3].disabled = this.isDisabled
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx;
}
.mb {
  margin-bottom: 60rpx;
}
</style>
