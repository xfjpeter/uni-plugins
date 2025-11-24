<template>
  <view class="v-tabs" :style="{ height: height }">
    <scroll-view class="scroll-view" :show-scrollbar="false" scroll-x scroll-with-animation :scroll-left="scrollLeft" style="width: auto; height: 100%; overflow: hidden;">
      <view class="v-tabs__inner">
        <view
          class="v-tabs__item"
          :style="{
            color: activeTab == i ? activeColor : color,
            fontSize: activeTab == i ? activeFontSize : fontSize,
            backgroundColor: activeTab == i ? backgroundColor : '',
            flex: auto ? 1 : 0,
            justifyContent: auto ? 'center' : 'flex-start',
            borderRadius,
            padding,
          }"
          :data-index="i"
          :class="{ active: activeTab == i }"
          @tap="handleTapItem"
          v-for="(v, i) in tabs"
          :key="i"
        >
          {{ v }}
        </view>
      </view>
      <view
        class="v-tabs__line"
        :style="{ width: `${lineWidth}px`, height: `${lineHeight}`, backgroundColor: lineColor, transform: `translateX(${lineLeft}px)`, top: `calc(${height} - ${lineHeight})` }"
      ></view>
    </scroll-view>
  </view>
</template>

<script>
/**
 * tabs 选项卡
 * @description tabs选项卡
 * @property {String|Number} value 双向绑定的选中值
 * @property {String} height=50px 高度
 * @property {Array} tabs 选项卡列表 ['测试1', '测试2', '测试3']
 * @property {String} backgroundColor 选中背景色
 * @property {String} borderRadius 选中圆角
 * @property {String} color 默认文字的颜色
 * @property {String} activeColor 选中文字颜色
 * @property {String} fontSize 默认文字大小
 * @property {String} activeFontSize 选中文字大小
 * @property {Number} lineScale 选中标签下划线的缩放级别
 * @property {String} lineHeight 选中标签下划线的高度
 * @property {String} lineColor 选中下划线的颜色
 *
 * @event {Function(activeTab)} change 改变标签触发
 */
export default {
  name: 'VTabs',
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: String,
      default: '45px'
    },
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    borderRadius: {
      type: String,
      default: '5px'
    },
    color: {
      type: String,
      default: '#333333'
    },
    activeColor: {
      type: String,
      default: '#007AFF'
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    activeFontSize: {
      type: String,
      default: '14px'
    },
    padding: {
      type: String,
      default: '10rpx 20rpx'
    },
    lineScale: {
      type: Number,
      default: 0.6
    },
    lineHeight: {
      type: String,
      default: '3px'
    },
    lineColor: {
      type: String,
      default: '#007AFF'
    },
    auto: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollLeft: 0,
      activeTab: 0,
      width: 0,
      lineLeft: 0,
      lineWidth: 0
    }
  },
  watch: {
    activeTab(newVal) {
      this.$emit('input', newVal * 1)
    },
    value(newVal) {
      this.activeTab = newVal
      this.getTabsWidth(0)
    }
  },
  methods: {
    handleTapItem(e) {
      const index = e.currentTarget.dataset.index
      if (this.activeTab != index) {
        this.activeTab = index
        this.getTabsWidth(e.currentTarget.offsetLeft)
        this.$emit('change', this.activeTab)
      }
    },
    getTabsWidth(offsetLeft) {
      const query = uni.createSelectorQuery().in(this)
      query
        .select('.v-tabs')
        .boundingClientRect(data => {
          this.width = data.width
        })
        .exec()
      setTimeout(() => {
        let i = 0
        let width = 0
        query
          .selectAll('.v-tabs__item')
          .boundingClientRect(data => {
            width = data.reduce((total, currentValue, currentIndex, arr) => {
              if (currentIndex < this.activeTab) {
                total = total + currentValue.width
              }
              return total
            }, 0)
            const padding = this.padding.split(' ')[0]
            const res = /(\d+)(upx|rpx|px)/.exec(padding)
            if (res && (res[2] == 'upx' || res[2] == 'rpx')) {
              width += uni.upx2px(res[1]) * 2 * this.activeTab
            } else {
              width += res[1] * this.activeTab
            }
          })
          .exec()
        query
          .select('.v-tabs__item.active')
          .boundingClientRect(data => {
            const ol = offsetLeft ? offsetLeft : width
            if (data) {
              this.lineLeft = ol + (data.width * (1 - this.lineScale)) / 2
              this.lineWidth = data.width * this.lineScale
              this.scrollLeft = ol - (this.width - data.width) / 2
            }
          })
          .exec()
      }, 10)
    }
  },
  mounted() {
    this.activeTab = this.value
    this.getTabsWidth(0)
  }
}
</script>

<style lang="scss" scoped>
.v-tabs {
  position: relative;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;

  .v-tabs__inner {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .v-tabs__item {
    display: inline-flex;
    margin-right: 20upx;
    transition: all 0.3s ease;

    &:last-child {
      margin-right: 0;
    }
  }

  .v-tabs__line {
    position: absolute;
    z-index: 99;
    transition: all 0.3s linear;
    border-radius: 4upx;
  }
}

::v-deep ::-webkit-scrollbar {
  display: none;
}
</style>
