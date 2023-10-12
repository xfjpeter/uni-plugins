<template>
  <view class="container">
    <view class="mb-20">
      <v-tabs :tabs="tabs" v-model="current"></v-tabs>
    </view>
    <view class="mb-20">
      <v-tabs ref="vTab" :tabs="tabs1" v-model="current" pills active-color="#fff" :line-animation="false"></v-tabs>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 2,
      tabs: [
        '军事',
        '国内',
        '新闻新闻',
        '军事',
        '国内',
        '新闻',
        '军事',
        '国内',
        '新闻',
        '军事',
        '国内',
        '新闻新闻',
        '军事',
        '国内',
        '新闻',
        '军事',
        '国内',
        '新闻'
      ],
			tabs1: []
    }
  },
  mounted() {
    setTimeout(() => {
      // 模拟请求
			setTimeout(() => {
				this.tabs1 = this.tabs
				this.$refs.vTab.update()
			}, 2000)
    }, 1000)
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
</style>
