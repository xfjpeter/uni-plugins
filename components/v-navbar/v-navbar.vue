<template>
  <view class="v-navbar" :id="elId">
    <!-- statusBarHeight -->
    <!-- #ifndef H5 -->
    <view
      class="status-bar-height"
      :style="{
        background: transparent ? 'transparent' : statusBarBgColor,
        height: statusBarHeight,
        position: fixed ? 'fixed' : 'static',
      }"
    ></view>
    <!-- #endif -->

    <!-- bar -->
    <view class="v-navbar-container" :style="{
      height: height,
      background: bgColor,
      color,
      fontSize,
      fontWeight: bold ? 'bold' : 'normal',
      <!-- #ifdef H5 -->
      top: 0,
      <!-- #endif -->
      <!-- #ifndef H5 -->
      top: fixed ? statusBarHeight : 'auto',
      <!-- #endif -->
      position: fixed ? 'fixed' : 'static'
    }">
      <view class="v-navbar-container__left" @click="clickLeft">
        <slot name="left">
          <image v-if="currentPagesCount > 1" :src="backIcon" mode="" class="back"></image>
        </slot>
      </view>
      <view class="v-navbar-container__content" @click="clickCenter">
        <slot name="center">{{ title }}</slot>
      </view>
      <view class="v-navbar-container__right" @click="clickRight">
        <slot name="right"></slot>
      </view>
    </view>
    <!-- placeholder -->
    <view class="v-navbar-placeholder" v-if="fixed" :style="{
      <!-- #ifdef H5 -->
      height
      <!-- #endif -->
      <!-- #ifndef H5 -->
      height: `calc(${height} + ${statusBarHeight})`
      <!-- #endif -->
    }"></view>
  </view>
</template>

<script>
/**
 * @property {String} statusBarBgColor 状态栏背景色
 * @property {String} title 标题文字
 * @property {String} bgColor navbar 背景色
 * @property {String} color 文字颜色
 * @property {String} fontSize 文字大小
 * @property {Boolean} transparent 是否透明
 * @property {Boolean} bold 是否加粗
 * @property {Boolean} fixed 是否固定在顶部
 * @property {String} height navbar 高度
 * @property {String} backIcon 返回图标
 * 
 * @event {Function()} on-navbar-left 点击返回
 * @event {Function()} on-navbar-center 点击中间
 * @event {Function()} on-navbar-right 点击右侧
 */
export default {
  props: {
    statusBarBgColor: {
      type: String,
      default: '#f6f6f6',
    },
    title: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: '#f6f6f6'
    },
    color: {
      type: String,
      default: '#333'
    },
    fontSize: {
      type: String,
      default: '36rpx'
    },
    transparent: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '44px'
    },
    backIcon: {
      type: String,
      default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAIVBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAt9G3DAAAACnRSTlMA7VJ/EGsvwp5HNc7giwAAALBJREFUKM+F0TEPwVAUBeArWmFDDNJRYrFiMRlMJhLTm0r/QBeLidUkIjFXUM6v1D5P03MXZ/xyc3PefSIiZ+H4qQKjwIcCg3SWZ1oM/NJdWRgUgGSUwwQlCTPY9Fz6B+DG66/AicA7osMjVbxU6R1Chjn2DHU0GRp4Mni6iQSPfwAFNbx11TtDBbE+50KtSHhgrXpl96a3RYH9oWXLJcB3wJSu3haGrf28aOgyvthNH18cUSa7ny74AAAAAElFTkSuQmCC'
    },
  },
  data () {
    return {
      elId: '',
      statusBarHeight: '44px',
      currentPagesCount: 0
    }
  },
  methods: {
    // 产生随机字符串
    randomString (len) {
      len = len || 32
      let $chars =
        'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      let maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    clickLeft () {
      this.$emit('on-navbar-left')
      if (this.currentPagesCount > 1) {
        uni.navigateBack()
      }
    },
    clickCenter () {
      this.$emit('on-navbar-center')
      console.log(this.currentPagesCount);
    },
    clickRight () {
      this.$emit('on-navbar-right')
    },
    init () {
      // 获取系统的基本信息
      let gS = uni.getSystemInfoSync()
      // 如果是 H5 直接设置 statusBarHeight 为 44
      // #ifdef H5
      this.statusBarHeight = '44px'
      // #endif
      // #ifndef H5
      this.statusBarHeight = gS.statusBarHeight + 'px'
      // #endif
      this.currentPagesCount = getCurrentPages().length
    }
  },
  mounted () {
    this.elId = 'xfjpeter_' + this.randomString()

    this.init()
  },
}
</script>

<style lang="scss" scoped>
.v-navbar {
  position: relative;
  z-index: 999;

  .status-bar-height {
    width: 100%;
    z-index: 1000;
    top: 0;
  }

  &-container {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-sizing: border-box;
    z-index: 1000;

    &__content {
      width: 100%;
      padding: 0 30rpx;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }

    &__left,
    &__right {
      flex: 1;
      white-space: nowrap;

      .back {
        width: 36rpx;
        height: 36rpx;
      }
    }
  }
}
</style>
