<template>
  <view class="container">
    <v-tabs :tabs="tabs" :scroll="false" fixed v-model="current" bg-color="#eee" padding="10rpx 0"></v-tabs>

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
      tabs: ['全部', '已完成', '待收货', '已收货', '已评价']
    }
  }
}
</script>
