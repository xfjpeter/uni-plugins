<template>
  <view class="v-tabs">
    <scroll-view
      :id="getDomId"
      :scroll-x="scroll"
      :scroll-left="scroll ? scrollLeft : 0"
      :scroll-with-animation="scroll"
      :style="{ position: fixed ? 'fixed' : 'relative', zIndex, width: '100%' }">
      <view
        class="v-tabs__container"
        :style="{
          display: scroll ? 'inline-flex' : 'flex',
          whiteSpace: scroll ? 'nowrap' : 'normal',
          background: bgColor,
          height,
          padding
        }">
        <view
          :class="['v-tabs__container-item', { disabled: !!v.disabled }, { active: current == i }]"
          v-for="(v, i) in tabs"
          :key="i"
          :style="{
            color: current == i ? activeColor : color,
            fontSize: current == i ? fontSize : fontSize,
            fontWeight: bold && current == i ? 'bold' : '',
            justifyContent: !scroll ? 'center' : '',
            flex: scroll ? '' : 1,
            padding: paddingItem
          }"
          @click="change(i)">
          <slot :row="v" :index="i">{{ field ? v[field] : v }}</slot>
        </view>
        <template v-if="!!tabs.length">
          <view
            v-if="!pills"
            :class="['v-tabs__container-line', { animation: lineAnimation }]"
            :style="{
              background: lineColor,
              width: lineWidth + 'px',
              height: lineHeight,
              borderRadius: lineRadius,
              transform: `translate3d(${lineLeft}px, 0, 0)`
            }" />
          <view
            v-else
            :class="['v-tabs__container-pills', { animation: lineAnimation }]"
            :style="{
              background: pillsColor,
              borderRadius: pillsBorderRadius,
              width: currentWidth + 'px',
              transform: `translate3d(${pillsLeft}px, 0, 0)`,
              height
            }" />
        </template>
      </view>
    </scroll-view>
    <!-- fixed 的站位高度 -->
    <view class="v-tabs__placeholder" :style="{ height: fixed ? height : '0', padding }"></view>
  </view>
</template>

<script>
import { startMicroTask } from './utils'
import props from './props'
/**
 * v-tabs
 * @property {Number} value 选中的下标
 * @property {Array} tabs tabs 列表
 * @property {String} bgColor = '#fff' 背景颜色
 * @property {String} color = '#333' 默认颜色
 * @property {String} activeColor = '#2979ff' 选中文字颜色
 * @property {String} fontSize = '28rpx' 默认文字大小
 * @property {String} activeFontSize = '28rpx' 选中文字大小
 * @property {Boolean} bold = [true | false] 选中文字是否加粗
 * @property {Boolean} scroll = [true | false] 是否滚动
 * @property {String} height = '60rpx' tab 的高度
 * @property {String} lineHeight = '10rpx' 下划线的高度
 * @property {String} lineColor = '#2979ff' 下划线的颜色
 * @property {Number} lineScale = 0.5 下划线的宽度缩放比例
 * @property {String} lineRadius = '10rpx' 下划线圆角
 * @property {Boolean} pills = [true | false] 是否胶囊样式
 * @property {String} pillsColor = '#2979ff' 胶囊背景色
 * @property {String} pillsBorderRadius = '10rpx' 胶囊圆角大小
 * @property {String} field 如果是对象，显示的键名
 * @property {Boolean} fixed = [true | false] 是否固定
 * @property {String} paddingItem = '0 22rpx' 选项的边距
 * @property {Boolean} lineAnimation = [true | false] 下划线是否有动画
 * @property {Number} zIndex = 1993 默认层级
 *
 * @event {Function(current)} change 改变标签触发
 */
export default {
  name: 'VTabs',
  props,
  // #ifdef VUE3
  emits: ['update:modelValue', 'change'],
  // #endif
  data() {
    return {
      lineWidth: 30,
      currentWidth: 0, // 当前选项的宽度
      lineLeft: 0, // 滑块距离左侧的位置
      pillsLeft: 0, // 胶囊距离左侧的位置
      scrollLeft: 0, // 距离左边的位置
      container: { width: 0, height: 0, left: 0, right: 0 }, // 容器的宽高，左右距离
      current: 0, // 当前选中项
      scrollWidth: 0 // 可以滚动的宽度
    }
  },
  computed: {
    getDomId() {
      const len = 16
      const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      const maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return `xfjpeter_${pwd}`
    }
  },
  watch: {
    // #ifdef VUE3
    modelValue: {
    // #endif
    // #ifdef VUE2
    value: {
    // #endif
      immediate: true,
      handler(newVal) {
        this.current = newVal
        this.$nextTick(this.update)
      }
    }
  },
  methods: {
    // 切换事件
    change(index) {
      const isDisabled = !!this.tabs[index].disabled
      if (this.current !== index && !isDisabled) {
        this.current = index
        // #ifdef VUE3
        this.$emit('update:modelValue', index)
        // #endif
        // #ifdef VUE2
        this.$emit('input', index)
        // #endif
        this.$emit('change', index)
      }
    },
    createQueryHandler() {
      const query = uni
        .createSelectorQuery()
        // #ifndef MP-ALIPAY
        .in(this)
      // #endif

      return query
    },
    update() {
      const _this = this
      startMicroTask(() => {
        // 没有列表的时候，不执行
        if (!this.tabs.length) return
        _this
          .createQueryHandler()
          .select(`#${this.getDomId}`)
          .boundingClientRect(data => {
            const { width, height, left, right } = data || {}
            // 获取容器的相关属性
            this.container = { width, height, left, right: right - width }
            _this.calcScrollWidth()
            _this.setScrollLeft()
            _this.setLine()
          })
          .exec()
      })
    },
    // 计算可以滚动的宽度
    calcScrollWidth(callback) {
      const view = this.createQueryHandler().select(`#${this.getDomId}`)
      view.fields({ scrollOffset: true })
      view
        .scrollOffset(res => {
          if (typeof callback === 'function') {
            callback(res)
          } else {
            // 获取滚动条的宽度
            this.scrollWidth = res.scrollWidth
          }
        })
        .exec()
    },
    // 设置滚动条滚动的进度
    setScrollLeft() {
      this.calcScrollWidth(res => {
        // 动态读取 scrollLeft
        let scrollLeft = res.scrollLeft
        this.createQueryHandler()
          .select(`#${this.getDomId} .v-tabs__container-item.active`)
          .boundingClientRect(data => {
            if (!data) return
            // 除开当前选项外容器的一半宽度
            let curHalfWidth = (this.container.width - data.width) / 2
            let scrollDiff = this.scrollWidth - this.container.width
            // 在原有滚动条的基础上 + (当前元素距离左侧的距离 - 计算的一半宽度) - 容器的外边距之类的
            scrollLeft += data.left - curHalfWidth - this.container.left
            // 已经滚动在左侧了
            if (scrollLeft < 0) scrollLeft = 0
            // 已经超出右侧了
            else if (scrollLeft > scrollDiff) scrollLeft = scrollDiff
            this.scrollLeft = scrollLeft
          })
          .exec()
      })
    },
    setLine() {
      this.calcScrollWidth(res => {
        const scrollLeft = res.scrollLeft
        this.createQueryHandler()
          .select(`#${this.getDomId} .v-tabs__container-item.active`)
          .boundingClientRect(data => {
            if (!data) return
            if (this.pills) {
              this.currentWidth = data.width
              this.pillsLeft = scrollLeft + data.left - this.container.left
            } else {
              this.lineWidth = data.width * this.lineScale
              this.lineLeft = scrollLeft + data.left + (data.width - data.width * this.lineScale) / 2 - this.container.left
            }
          })
          .exec()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-tabs {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  /* #ifdef H5 */
  ::-webkit-scrollbar {
    display: none;
  }
  /* #endif */

  &__container {
    min-width: 100%;
    position: relative;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;

    &-item {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      height: 100%;
      position: relative;
      z-index: 10;
      transition: all 0.3s;
      white-space: nowrap;

      &.disabled {
        opacity: 0.5;
        color: #999;
      }
    }

    &-line {
      position: absolute;
      left: 0;
      bottom: 0;
    }

    &-pills {
      position: absolute;
      z-index: 9;
    }

    &-line,
    &-pills {
      &.animation {
        transition: all 0.3s linear;
      }
    }
  }
}
</style>
