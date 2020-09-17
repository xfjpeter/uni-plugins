<template>
  <view class="container">
    <v-tabs :tabs="tabs" @change="changeTab" :scroll="false" fixed v-model="current" bg-color="#eee" padding="10rpx 0"></v-tabs>
    
    <button @click="clickMe">模拟搜索</button>

    <view class="list">
      <view v-for="i in 100" :key="i">
        {{ i }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      tabs: ['全部', '已完成']
    }
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
