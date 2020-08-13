## 调用方式

- 视图调用

```html
<!-- 平铺 -->
<v-tabs padding="10px 20px" v-model="tab1" auto :tabs="tabs1"></v-tabs>

<!-- 普通的 tab -->
<v-tabs v-model="tab2" :tabs="tabs2"></v-tabs>

<!-- 胶囊 tab -->
<v-tabs v-model="tab2" backgroundColor="#007AFF" activeColor="#fff" lineHeight="0" borderRadius="10rpx" :tabs="tabs2"></v-tabs>
```

- js 调用

```js
// 如果用的 HbuildX 最新版本，可以不用 import 组件
export default {
  data() {
    return {
      tab1: 2,
      tab2: 3,
      tabs1: ['全部', '待付款', '待发货', '已完成'],
      tabs2: ['军事', '国内', '国际', '股票', '财经', '基金', 'NBA', '电影', '明星', '历史', '专栏']
    }
  }
}
```

- 参数说明

|      参数       |       类型       | 默认值  |   说明   |
| :-------------: | :--------------: | :-----: | :----------: |
|      value      | String 或 Number |    0    |     必传     |
|      tabs       |      Array       |   []    |  tabs 数量   |
|      height     |      String      | '45px'  |   tab 高度   |
| backgroundColor |      String      |   ''    |   选中背景   |
|  borderRadius   |      String      |   5px   |     圆角     |
|      color      |      String      | #333333 | 默认文字颜色 |
|   activeColor   |      String      | #333333 | 选中文字颜色 |
|    fontSize     |      String      |  14px   | 默认文字大小 |
| activeFontSize  |      String      |  14px   | 选中文字大小 |
|    lineScale    |      Number      |   0.6   |  下划线缩放  |
|   lineHeight    |      String      |    3    |  下划线高度  |
|    lineColor    |      Sring       | #007AFF |  下划线颜色  |
|    auto         |      Boolean     |  false  |  是否平铺    |


## 事件

|事件名称|参数|
|:-----:|:-----:|
|@change|activeTab|


## 更新日志

### 2020-06-09

1. 修复小程序端选中的下划线不显示问题
2. 新增 tab 高度设置
3. `lineHeight` 修改为只支持 `String` 方式

### 2020-06-11

1. 添加 `change` 事件
2. 修复插件内容问题
3. 修复下划线不居中问题

### 2020-06-11

1. 添加注释
2. 修复 bug

### 2020-07-05

1. 新增 `padding` 的配置
2. 修复 `v-model` 双向绑定问题
3. 修复初始化下划线没定位的为题

### 2020-07-21

1. 新增 `auto` 的配置，是否平铺 tab
2. 修复文档上的错误示例（感谢 lushgwe@163.com 的反馈）