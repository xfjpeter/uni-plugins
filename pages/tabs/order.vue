<template>
  <view class="container">
    <view class="tabs">
      <v-tabs
        :tabs="tabs"
        v-model="current"
        :scroll="false"
        line-color="#C7B099"
        active-color="#C7B099"
        style="width: 100%"
      ></v-tabs>
    </view>

    <!-- 订单列表 -->
    <!-- 订单列表 -->
    <view class="container-tabs__list">
      <swiper class="container-tabs__swiper" :current="current" @change="changeSwiper">
        <swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
          <scroll-view scroll-y style="height: 100%">
            <!-- 循环订单列表 -->
            <view class="v-order-item" @click="click" v-for="i in 10" :key="i">
              <view
                class="v-order-item__box"
                :class="{ 'u-border-top': index > 0 }"
                v-for="(item, index) in rowData"
                :key="index"
              >
                <view class="v-order-item__box-thumbnail">
                  <image :src="item.src" />
                </view>

                <view class="v-order-item__box-info">
                  <view class="box-info__top">
                    <!-- 标题和数量 -->
                    <view class="box-info__title">
                      <text class="ellipsis">{{ item.title }}</text>
                      <text>X{{ item.count }}</text>
                    </view>
                    <view class="box-info__attr">{{ item.attr }}</view>
                  </view>

                  <view class="box-info__bottom">
                    <view class="box-info__total_amount">
                      订单总金额：
                      <text>¥{{ item.price }}元</text>
                    </view>
                    <view class="box-info__status">{{ item.status }}</view>
                  </view>
                </view>
              </view>
            </view>
            <!-- 循环订单列表结束 -->
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      tabs: [],
      rowData: [],
      mockRowData: [
        {
          title: '商品名称',
          count: 10,
          attr: '雅慧道系列 产品名称 60g',
          price: 800,
          src: 'https://tva1.sinaimg.cn/large/007S8ZIlgy1gi1y867us6j30a00a0gn7.jpg',
          status: '已付款'
        },
        {
          title: '商品名称',
          count: 10,
          attr: '雅慧道系列 产品名称 60g',
          price: 800,
          src: 'https://tva1.sinaimg.cn/large/007S8ZIlgy1gi1y867us6j30a00a0gn7.jpg',
          status: '待付款'
        }
      ]
    }
  },
  methods: {
    changeSwiper(e) {
      this.loadData()

      this.current = e.detail.current
    },
    click() {
      uni.showToast({
        title: '我被点击了',
        icon: 'none'
      })
    },
    loadData() {
      this.rowData = []
      uni.showLoading({
        title: '数据加载中...',
        mask: false
      })
      // 模拟请求数据
      setTimeout(() => {
        this.rowData = this.mockRowData
        uni.hideLoading()
      }, 500)
    }
  },
  created() {
    // 模拟请求分类
    uni.showLoading({
      title: '请求中...',
      mask: true
    })
    setTimeout(() => {
      this.tabs = ['全部订单', '待付款', '待发货', '待收货', '已完成']

      this.loadData()
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.container {
  /* #ifdef H5 */
  height: calc(100vh - 24px - 50px - 100rpx);
  /* #endif */
  /* #ifndef H5 */
  height: calc(100vh - 160rpx);
  /* #endif */
  background-color: #f3f3f3;
  padding: 130rpx 30rpx 30rpx;

  .tabs {
    position: fixed;
    /* #ifdef H5 */
    top: 44px;
    /* #endif */
    /* #ifndef H5 */
    top: 0;
    /* #endif */
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100rpx;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0px 0px 10rpx rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 10rpx 10rpx;
    z-index: 3;
  }

  .container-tabs__list {
    height: 100%;

    .container-tabs__swiper {
      height: 100%;
    }
  }

  .v-order-item {
    background-color: #fff;
    box-shadow: 0px 0px 10rpx rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;

    &__box {
      display: flex;

      &-thumbnail {
        width: 180rpx;
        height: 180rpx;
        margin-right: 30rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }

      &-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        overflow: hidden;

        .box-info__title {
          font-weight: bold;
          font-size: 32rpx;
          display: flex;
          justify-content: space-between;
        }

        .box-info__attr {
          color: #999;
          font-size: 20rpx;
          margin-top: 20rpx;
        }

        .box-info__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .box-info__total_amount {
          font-size: 28rpx;

          text {
            color: #999;
          }
        }

        .box-info__status {
          font-size: 22rpx;
          color: #ff6600;
        }
      }
    }

    .v-order-item__box + .v-order-item__box {
      margin-top: 30rpx;
      padding-top: 30rpx;
    }
  }
}
</style>
