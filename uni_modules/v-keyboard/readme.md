# 自定义数字键盘

## 1. 实现的功能

支持金额、数字、手机号、身份证号输入的键盘，使用方法简单。

## 2. 示例

### 2.1 基本使用

```html
<div class="content">
  <div>页面中的值：{{inputValue}}</div>
  <div>
    <span @click="show = true">点我调用键盘</span>
  </div>
  <!-- #ifdef VUE3 -->
  <!-- vue3一定要用 @update:show 在方法中更新状态；vue3中不支持.sync，所以.... -->
  <v-keyboard :show="show" @update:show="flag => show = flag" v-model="inputValue" />
  <!-- #endif -->

  <!-- #ifdef VUE2 -->
  <!-- vue2的用法 -->
  <v-keyboard :show.sync="show" :value.sync="inputValue" />
  <!-- #endif -->
</div>
```

```javascript
export default {
  data() {
    return {
      show: false,
      inputValue: ''
    }
  }
}
```

### 2.2 使用手机号输入好，自动触发方法

> 主要是 `type='tel'` 和 `maxLength` 的配合使用，再加上 `@confirm` 的回调

```html
<div>
  <span @click="show = true">点我调用键盘：{{ inputValue }}</span>
</div>
<v-keyboard type="tel" :show.sync="show" :value.sync="inputValue" @confirm="onConfirm" :max-length="11"></v-keyboard>
```

```javascript
export default {
  data() {
    return {
      show: false,
      inputValue: ''
    }
  },
  methods: {
    onConfirm(value) {
      alert(`当前输入完成，输入的内容是：${value}`)
    }
  }
}
```

## 3. 使用说明文档

### 3.1 属性说明

|    参数     |       类型       |   默认值   | 是否必传 |                       说明                        |
| :---------: | :--------------: | :--------: | :------: | :-----------------------------------------------: |
|    value    | String \| Number |     ''     |    是    |                  当前输入的内容                   |
|    mask     |     Boolean      |   false    |    否    |                   是否显示遮罩                    |
|    type     |      String      | 'digital'  |    否    | 类型选择(digital:数字，idcard:身份证，tel:手机号) |
|    auto     |     Boolean      |   false    |    否    |  当长度和设置的maxLength相等时，触发confirm回调   |
|    tool     |     Boolean      |   false    |    否    |                  是否显示工具栏                   |
|    show     |     Boolean      |   false    |    是    |                   是否显示键盘                    |
|    text     |      String      | '数字键盘' |    否    |                工具栏上的文字提示                 |
|  maxLength  |      Number      |     0      |    否    |             能输入的最大长度，0不限制             |
| confirmText |      String      |   '确认'   |    否    |                  确认按钮的文字                   |

### 3.2 事件说明
|  名称   | 参数  | 说明         |
| :-----: | :---: | :----------- |
| confirm |  无   | 点击确认按钮 |
