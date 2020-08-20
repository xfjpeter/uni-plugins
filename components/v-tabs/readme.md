## 插件说明

> 这是 `v-tabs` 插件的升级版本，参数上有很大变动，支持 `H5` `小程序` `手机端`，如果是在之前的插件上升级的话，请注意参数的变更，触发的事件没有变更。

## 使用说明

### 1、最基本用法

- 视图文件

```html
<v-tabs v-model="current" :tabs="tabs" @change="changeTab"></v-tabs>
```

- 脚本文件

```js
export default {
  data() {
    return {
      current: 0,
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
      ],
    }
  },
  methods: {
    changeTab(index) {
      console.log('当前选中的项：' + index)
    },
  },
}
```

### 2、平铺整个屏幕

- 视图文件

```html
<v-tabs
  v-model="activeTab"
  :scroll="false"
  :tabs="['全部', '进行中', '已完成']"
></v-tabs>
```

- 脚本文件

```js
export default {
  data() {
    return {
      activeTab: 0,
    }
  },
}
```

### 3、胶囊用法

- 视图文件

```html
<v-tabs
  v-model="current"
  :tabs="tabs"
  :pills="true"
  line-height="0"
  activeColor="#fff"
  @change="changeTab"
></v-tabs>
```

- 脚本文件

```js
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
      ],
  },
  methods: {
    changeTab(index) {
      console.log('当前选中索引：' + index)
    }
  }
}
```

## 文档说明

### 1、属性说明

|       参数        |  类型   |  默认值   |                   说明                   |
| :---------------: | :-----: | :-------: | :--------------------------------------: |
|       value       | Number  |     0     |            必传(双向绑定的值)            |
|       color       | String  |  '#333'   |               默认文字颜色               |
|    activeColor    | String  | '#2979ff' |              选中文字的颜色              |
|     fontSize      | String  |  '28rpx'  |         默认文字大小(rpx 或 px)          |
|       bold        | Boolean |   true    |              是否加粗选中项              |
|      scroll       | Boolean |   true    |      是否显示滚动条，平铺设置 false      |
|      height       | String  |  '70rpx'  |           tab 高度(rpx 或 px)            |
|    lineHeight     | String  |  '10rpx'  |           滑块高度(rpx 或 px)            |
|     lineColor     | String  | '#2979ff' |                滑块的颜色                |
|     lineScale     | Number  |    0.5    |              滑块宽度缩放值              |
|    lineRadius     | String  |  '10rpx'  |         滑块圆角宽度(rpx 或 px)          |
|       pills       | Boolean |   false   |               是否开启胶囊               |
|    pillsColor     | String  | '#2979ff' |         胶囊背景颜色(rpx 或 px)          |
| pillsBorderRadius | String  |  '10rpx'  |         胶囊圆角宽度(rpx 或 px)          |
|       field       | String  |    ''     | 如果 tabs 子项是对象，输入需要展示的键名 |
|      bgColor      | String  |  '#fff'   |    背景色，支持 linear-gradient 渐变     |
|      padding      | String  |    '0'    |          整个 tab padding 属性           |

### 2、事件说明

|  名称  | 参数  |                说明                |
| :----: | :---: | :--------------------------------: |
| change | index | 改变选中项触发, index 选中项的下标 |

## 更新日志

### 2020-08-20

1. 优化 `节点查询` 和 `选中渲染`
2. 优化支付宝中 `createSelectorQuery()` 的影响

### 2020-08-19

1. 优化 `change` 事件触发机制

### 2020-08-16

1. 修改默认高度为 `70rpx`
2. 新增属性 `bgColor`，可设置背景颜色，默认 `#fff`
3. 新增整个 `tab` 的 `padding` 属性，默认 `0`

### 2020-08-13

1. 全新的 `v-tabs 2.0`
2. 支持 `H5` `小程序` `APP`
3. 属性高度可配置

## 预览

![v-tabs 2.0.gif](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghsv40mj76g30ai0i2tsd.gif)
