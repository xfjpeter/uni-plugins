<template>
  <view class="container">
    <v-tabs :tabs="tabs" @change="changeTab" fixed v-model="current" bg-color="#eee" padding="20rpx 0"></v-tabs>

    <button @click="clickMe">模拟搜索</button>

    <view class="list">
      <block v-if="current == index" v-for="(item, index) in tabs" :key="index">
        <view v-for="i in 1000" :key="i">{{ index }} - {{ i }}</view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      tabs: ['全部', '待付款', '待发货', '已收货', '退款中', '已评价', '已完成']
    }
  },
  onLoad() {
    console.log('onload')
    console.time('dom')
  },
  onReady() {
    console.log('onReady')
    console.timeEnd('dom')
  },
  methods: {
    clickMe() {
      this.current = -1
    },
    changeTab(index) {
      if (index === 3) {
        // this.current = -1
        setTimeout(() => {
          this.$set(this.tabs, 1, '完成')
          this.$set(this.tabs, 3, '我是真的收货')
        }, 1000)
      }
    }
  }
}
</script>
