<template>
  <view class="container">
    <view class="mb">
      <view class="title">两个的情况</view>
      <v-tabs v-model="cur1" :tabs="['第一个', '第二个']" :scroll="false" :line-scale="0.1" @change="changeTab0" />
    </view>
    <view class="mb">
      <view class="title">常规用法：</view>
      <button type="default" @click="togglePopup">点我切换状态</button>
    </view>
    <view class="mb">
      <!-- <view class="title">无下划线、无胶囊：</view> -->
      <v-tabs v-model="current1" :tabs="tabs1" line-height="0" line-radius="0" />
    </view>
    <view class="mb">
      <view class="title">键值、平铺用法：</view>
      <v-tabs v-model="current4" :scroll="false" :tabs="tabs4" field="name"></v-tabs>
    </view>
    <view class="mb">
      <view class="title">胶囊用法、背景、padding：</view>
      <v-tabs
        v-model="current3"
        padding="10px 0"
        pills-border-radius="60rpx"
        bg-color="#f6f6f6"
        :tabs="tabs3"
        :pills="true"
        line-height="0"
        activeColor="#fff"
        @change="changeTab"></v-tabs>
    </view>
    <view class="mb">
      <view class="title">完整参数用法：</view>
      <v-tabs
        v-model="current4"
        :tabs="tabs4"
        color="#333"
        activeColor="#fff"
        fontSize="28rpx"
        :scroll="true"
        height="60rpx"
        lineHeight="10rpx"
        lineColor="#2979ff"
        :lineScale="0.5"
        lineRadius="10rpx"
        :pills="true"
        pillsColor="#2979ff"
        pillsBorderRadius="10rpx">
        <view class="tab-title" slot-scope="{ row, index }">
          <text>{{ row.name }},{{ index }}</text>
          <text>-1111</text>
        </view>
      </v-tabs>
    </view>

    <view class="mb">
      <v-tabs v-model="current4" :tabs="tabs4" @change="changeTab" field="name" :scroll="false" />
      <button @click="toggleDisabledStatus">{{ isDisabled ? '启用' : '禁用' }}(退款/售后)</button>
    </view>

    <uni-popup ref="popup" type="bottom" @maskClick="togglePopup">
      <view v-if="showTabs === true">
        <v-tabs :line-animation="!showTabs" v-model="current1" :tabs="tabs1" @change="changeTab"></v-tabs>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isDisabled: true,
      cur1: 0,
      current1: 1,
      tabs1: ['军事', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻'],
      current2: 2,
      tabs2: ['全部', '待付款', '待消费', '已完成', '已评价', '已过期', '已退款'],
      current3: 3,
      tabs3: ['军事', '国内', '新闻新闻', '军事', '国内', '新闻', '军事', '国内', '新闻'],
      showTabs: false,
      current4: 2,
      tabs4: [
        {
          id: 1,
          name: '待付款',
          disabled: false
        },
        {
          id: 2,
          name: '待收货',
          disabled: false
        },
        {
          id: 3,
          name: '待评价',
          disabled: false
        },
        {
          id: 4,
          name: '退款/售后',
          disabled: true
        },
        {
          id: 5,
          name: '我的订单',
          disabled: false
        }
      ]
    }
  },
  methods: {
    togglePopup() {
      if (this.showTabs) {
        this.$refs.popup.close()
        this.showTabs = false
      } else {
        this.$refs.popup.open('bottom')
        this.showTabs = true
      }
    },
    changeTab0(index) {
      console.log({ index, current: this.cur1 })
    },
    changeTab(index) {
      console.log('当前 index :' + index)
    },
    toggleDisabledStatus() {
      this.isDisabled = !this.isDisabled
      this.tabs4[3].disabled = this.isDisabled
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx;
  box-sizing: border-box;
}

.mb {
  margin-bottom: 60rpx;
}
</style>
