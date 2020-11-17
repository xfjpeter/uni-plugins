## 写在前面：

> 欢迎各位老铁反馈 bug ，本人后端 PHP 一枚，只是应为感兴趣前端，自己琢磨，自己搞。如果你在使用的过程中有什么不合理，需要优化的，都可以在下面评论（或加我 QQ: 1207791534，QQ 群: 917543334），本人看见后回复、修正，感谢。

## 插件说明

> 常用于分类列表左侧导航，支持 H5，小程序，APP，不支持 nvue

## 使用说明

### 1. 最基本的用法

- 视图文件

```html
<v-tabs-column :tabs="tabs" position="left" v-model="current">
  <view class="p" v-for="i in 100" :key="i">{{ i }}我只是静态的文字，展示作用</view>
</v-tabs-column>
```

- js 文件

```js
export default {
  data() {
    return {
      current: 0,
      tabs: ['服装', '手机', '鞋子', '衬衣', 'T桖', '键盘', '电脑', '手机', '玩具', '电瓶车', '背包', '手表', '餐具']
    }
  }
}
```

### 2. 完整用法

- 视图文件

```html
<v-tabs-column
  :tabs="tabs"
  :is-tabbar="false"
  position="left"
  active-color="purple"
  inactive-color="#444"
  bg-color="#ccc"
  active-bg-color="#f3f3f3"
  v-model="current"
  padding="30rpx 30rpx"
  bold="bold"
  @change="changeTab"
>
  <view class="p" v-for="i in 100" :key="i">{{ i }}我只是静态的文字，展示作用</view>
</v-tabs-column>
```

- js 文件

```js
export default {
  data() {
    return {
      current: 0,
      tabs: ['服装', '手机', '鞋子', '衬衣', 'T桖', '键盘', '电脑', '手机', '玩具', '电瓶车', '背包', '手表', '餐具']
    }
  },
  methods: {
    changeTab(index) {
      uni.showToast({
        title: '当前选中的是：' + this.tabs[index],
        icon: 'none'
      })
    }
  }
}
```

## 文档说明

### 1. 属性说明

|       参数       |     类型      |  默认值   |                说明                |
| :--------------: | :-----------: | :-------: | :--------------------------------: |
|      value       |    Number     |     0     |         必传(双向绑定的值)         |
|      width       |    String     | '240rpx'  |                宽度                |
|      height      |    String     |    ''     |                高度                |
|     bg-color     |    String     | '#f3f3f3' |              背景颜色              |
|       tabs       |     Array     |    []     |                列表                |
|    is-tabbar     |    Boolean    |   false   |  底部是否有 tabbar [true] [false]  |
|     position     |    String     |   left    |    位置 left(左侧) right(右侧)     |
|      field       |    String     |    ''     | 当传入的数组里面是对象时，传入键名 |
|  inactiveStyle   | Object,String |    ''     |              默认样式              |
|   activeStyle    | Object,String |    ''     |             激活的样式             |
|   activeColor    |    String     |  '#f00'   |           激活的文字颜色           |
|  inactiveColor   |    String     |  '#333'   |           默认的文字颜色           |
|  activeFontSize  |    String     |  '32rpx'  |           激活的文字大小           |
| inactiveFontSize |    String     |   28rpx   |           默认的文字大小           |
|     padding      |    String     |  '30rpx'  |               内边距               |
|       bold       | String,Number |    500    |          选中文字加粗效果          |

### 2. 事件说明

|  名称  | 参数  |                说明                |
| :----: | :---: | :--------------------------------: |
| change | index | 改变选中项触发, index 选中项的下标 |

## 更新日志

### 2020-11-17

1. 更新初始设置 `current` 值，没有切换到指定选项问题

### 2020-10-22

1. 发布 `v-tabs-column` `1.0.0` 版本
