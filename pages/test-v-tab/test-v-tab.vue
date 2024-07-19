<template>
  <view class="container">
    <view class="mb-20">
      <view class="title">正常加载</view>
      <v-tabs :tabs="tabs0" field="name" ref="tabs" v-model="current" :line-animation="lineAnimation"></v-tabs>
    </view>
    <view class="mb-20">
      <view class="title">延迟加载，使用 update() 更新</view>
      <v-tabs ref="vTab" :tabs="tabs1" v-model="current" pills active-color="#fff" :line-animation="false"></v-tabs>
    </view>
    <view class="mb-20">
      <view class="title">平铺加载</view>
      <v-tabs :scroll="false" :tabs="tabs2" v-model="current2" :line-scale="0.3" />
    </view>
    <view class="mb-20">
      <view class="title">tabs 使用数组对象</view>
      <v-tabs :tabs="tabs3" v-model="current3" field="text" :scroll="false" font-size="24rpx" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 3,
      tabs0: [
        {name: '资讯', id: 'zixun'},
        {name: '快讯', id: 'kuaixun'},
        {name: '日历', id: '日历'}
      ],
      tabs: [
        '军事',
        '国内',
        '新闻新闻'
      ],
      tabs1: [],
      tabs2: ['待支付', '待收货/使用', '待评价', '更换/售后', '我的订单'],
      current2: 1,
      tabs3: [{ value: 1, text: '待支付' }, { value: 2, text: '待收货/使用' }, { value: 3, text: '待评价' }, { value: 4, text: '更换/售后' }, { value: 5, text: '我的订单' }],
      current3: 0,
      lineAnimation: false,
    }
  },
  mounted() {
    setTimeout(() => {
      // 模拟请求
      setTimeout(() => {
        this.tabs1 = this.tabs
        this.$refs.vTab.update()
      }, 2000)
      
      this.lineAnimation = true
    }, 100)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
  padding: 15px;
  box-sizing: border-box;
}

.mb-20 {
  margin-bottom: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 500;
}
</style>
