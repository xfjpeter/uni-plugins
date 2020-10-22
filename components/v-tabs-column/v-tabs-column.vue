<template>
  <view class="v-tabs-column">
    <view class="v-tabs-column__bar" :style="getStyle">
      <scroll-view scroll-y scroll-with-animation style="height: 100%; overflow: hidden" :scroll-top="scrollTop">
        <view
          class="v-tabs-column__bar-item"
          v-for="(v, i) in tabs"
          :key="i"
          :style="i == current ? getActiveStyle : getInActiveStyle"
          :class="{ active: i == current }"
          @click="chooseItem(i)"
        >
          {{ field ? v[field] : v }}
        </view>
      </scroll-view>
    </view>
    <view class="v-tabs-column__container" :style="getWidth">
      <slot />
    </view>
  </view>
</template>

<script>
/**
 * 常用于分类列表页面，展示分类导航使用
 * @description 常用于分类列表页面，展示分类导航使用
 * @tutorial https://ext.dcloud.net.cn/plugin?id=3275
 * @version 1.0.0
 * @property {String} width = '240rpx' 宽度
 * @property {String} height 高度
 * @property {String} bg-color = '#f3f3f3' 背景颜色
 * @property {Array} tabs 数据列表
 * @property {Boolean} is-tabbar = [true | false] 当有 tabbar 的时候需要设置为 true
 * @property {String} position = ['left' | 'right'] 位置
 * @property {String} field 如果使用对象，设置键名
 * @property {Object, String} inactiveStyle 默认选项样式
 * @property {Object, String} activeStyle 选中的样式
 * @property {String} activeColor 选中的文字颜色
 * @property {String} inactiveColor 默认的文字颜色
 * @property {String} activeFontSize 选中的文字大小
 * @property {String} inactiveFontSize 默认的文字大小
 * @property {String} padding = '30rpx' 内边距
 * @property {String, Number} bold = 500 选中文字加粗效果
 *
 */
export default {
  props: {
    width: {
      type: String,
      default: '240rpx'
    },
    height: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: '#f3f3f3'
    },
    activeBgColor: {
      type: String,
      default: '#fff'
    },
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    isTabbar: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'left'
    },
    field: {
      type: String,
      default: ''
    },
    inactiveStyle: {
      type: [Object, String],
      default() {
        return {}
      }
    },
    activeStyle: {
      type: [Object, String],
      default() {
        return {}
      }
    },
    activeColor: {
      type: String,
      default: '#f00'
    },
    inactiveColor: {
      type: String,
      default: '#333'
    },
    activeFontSize: {
      tyep: String,
      default: '32rpx'
    },
    inactiveFontSize: {
      type: String,
      default: '28rpx'
    },
    padding: {
      type: String,
      default: '30rpx'
    },
    bold: {
      type: [String, Number],
      default: 500
    },
    value: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    current(newVal, oldVal) {
      this.$emit('input', newVal)
    }
  },
  data() {
    return {
      current: 0,
      scrollTop: 0,
      containerHeight: 0,
      items: [] // 缓存
    }
  },
  methods: {
    getHeight() {
      if (this.height) {
        return this.height
      }
      let height = ''
      // 判断是否是 H5
      // #ifdef H5
      height = this.isTabbar ? 'calc(100vh - 44px - 50px)' : 'calc(100vh - 44px)'
      // #endif
      // #ifndef H5
      height = this.isTabbar ? 'calc(100vh - 44px)' : '100vh'
      // #endif

      return height
    },
    chooseItem(index) {
      if (this.current !== index) {
        this.current = index
        this.$emit('change', index)
        this.setPosition()
      }
    },
    setPosition() {
      const query = uni
        .createSelectorQuery()
        // #ifndef MP-ALIPAY
        .in(this)
      // #endif
      // 如果容器的高度已经存在，不需要再循环
      if (!this.containerHeight) {
        query
          .select('.v-tabs-column__bar')
          .boundingClientRect((data) => {
            // 判断属性值存在
            if (data && data.height) {
              this.containerHeight = data.height
            }
          })
          .exec()
      }
      // 缓存有属性，不必每次循环节点
      if (this.items.length <= 0) {
        query
          .selectAll('.v-tabs-column__bar-item')
          .boundingClientRect((data) => {
            this.items = data
            this.calcScrollTop()
          })
          .exec()
      } else {
        this.calcScrollTop()
      }
    },
    calcScrollTop() {
      if (this.items) {
        // 每一个 item 的高度都相等，随便取一个即可
        const currentHeight = (this.current + 1) * this.items[0].height
        // 计算滚动条距离顶部的位置
        this.scrollTop = currentHeight - this.containerHeight / 2
      }
    },
    // 将对象转换成字符串: {'font-size': '24rpx'}  ====> 'font-size: 24rpx'
    objToString(obj) {
      let result = ''
      for (let [key, val] of Object.entries(obj)) {
        result += `${key}: ${val};`
      }

      return result
    }
  },
  computed: {
    // 计算 bar 的样式
    getStyle() {
      // 判断是否传入了 height，如果没有，计算一下 height（除去 navbar 和 tabbar）
      return this.objToString({
        width: this.width,
        height: this.getHeight(),
        background: this.bgColor,
        left: this.position === 'left' ? 0 : 'auto',
        right: this.position === 'right' ? 0 : 'auto'
      })
    },
    // 计算 item 激活样式
    getActiveStyle() {
      return this.objToString(
        Object.assign(
          {
            color: this.activeColor,
            padding: this.padding,
            background: this.activeBgColor,
            'font-weight': this.bold,
            'font-size': this.activeFontSize
          },
          this.activeStyle
        )
      )
    },
    // 计算 item 未激活样式
    getInActiveStyle() {
      return this.objToString(
        Object.assign(
          {
            color: this.inactiveColor,
            padding: this.padding,
            'font-size': this.inactiveFontSize
          },
          this.inactiveStyle
        )
      )
    },
    // 计算容器区域宽度和内边距
    getWidth() {
      return this.objToString({
        width: `calc(100vw - ${this.width})`,
        'padding-left': this.position == 'left' ? this.width : 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-tabs-column {
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }

  &__bar {
    position: fixed;

    &-item {
      position: relative;
      transition: all 0.3s;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
