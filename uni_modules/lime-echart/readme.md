# echarts 图表 <span style="font-size:16px;">👑👑👑👑👑 <span style="background:#ff9d00;padding:2px 4px;color:#fff;font-size:10px;border-radius: 3px;">全端</span></span>
> 一个基于 JavaScript 的开源可视化图表库   [查看更多 站点1](https://limeui.qcoon.cn/#/echart) |  [查看更多 站点2](http://liangei.gitee.io/limeui/#/echart)  <br>
> 基于 echarts 做了兼容处理，更多示例请访问  [uni示例 站点1](https://limeui.qcoon.cn/#/echart-example) | [uni示例 站点2](http://liangei.gitee.io/limeui/#/echart-example) | [官方示例](https://echarts.apache.org/examples/zh/index.html)     <br>
> Q群：1046793420 <br>

## 平台兼容

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 | App  |
| --- | ---------- | ------------ | ---------- | ---------- | --------- | ---- |
| √   | √          | √         | √      | √       | √      | √ |


## 安装
- 第一步、在uniapp 插件市场 找到 [百度图表](https://ext.dcloud.net.cn/plugin?id=4899) 导入
- 第二步、安装 echarts 或者直接使用插件内的echarts.min文件
```cmd
pnpm add echarts
 -or-
npm install echarts
```

**注意** 
* 🔔 必须使用hbuilderx 3.4.8-alpha及以上
* 🔔 echarts 5.3.0及以上
* 🔔 本插件只是使得 echarts 能在 uniapp 上运行，并不会对echarts内部产生破坏。

## 代码演示
### 基础用法
```html
<view><l-echart ref="chart" @finished="init"></l-echart></view>
```

```js
// 如果你使用插件内提供的echarts.min
// 也可以自行去官网下载自定义覆盖
// 这种方式仅限于vue2
import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
//---or----------------------------------

// 如果你使用 npm 安装了 echarts --------- 使用以下方式
// 引入全量包
import * as echarts from 'echarts'
//---or----------------------------------

// 按需引入 开始
import * as echarts from 'echarts/core';
import {LineChart, BarChart} from 'echarts/charts';
import {TitleComponent,TooltipComponent,GridComponent, DatasetComponent, TransformComponent, LegendComponent } from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import {LabelLayout,UniversalTransition} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 是必须的一步
import {CanvasRenderer} from 'echarts/renderers';

// 注册必须的组件
echarts.use([
	LegendComponent,
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LineChart,
	BarChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer
]);
//-------------按需引入结束------------------------


export default {
	data() {
		return {
			option: {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow' 
					},
					confine: true
				},
				legend: {
					data: ['热度', '正面', '负面']
				},
				grid: {
					left: 20,
					right: 20,
					bottom: 15,
					top: 40,
					containLabel: true
				},
				xAxis: [
					{
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#999999'
							}
						},
						axisLabel: {
							color: '#666666'
						}
					}
				],
				yAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
						axisLine: {
							lineStyle: {
								color: '#999999'
							}
						},
						axisLabel: {
							color: '#666666'
						}
					}
				],
				series: [
					{
						name: '热度',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
						data: [300, 270, 340, 344, 300, 320, 310],
					},
					{
						name: '正面',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true
							}
						},
						data: [120, 102, 141, 174, 190, 250, 220]
					},
					{
						name: '负面',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'left'
							}
						},
						data: [-20, -32, -21, -34, -90, -130, -110]
					}
				]
			},
		};
	},
	// 组件能被调用必须是组件的节点已经被渲染到页面上
	// 1、在页面mounted里调用，有时候mounted 组件也未必渲染完成
	mounted() {
		// init(echarts, theme?:string, opts?:{}, chart => {})
		// echarts 必填， 非nvue必填，nvue不用填
		// theme 可选，应用的主题，目前只支持名称，如：'dark'
		// opts = { // 可选
		//	locale?: string  // 从 `5.0.0` 开始支持
		// }
		// chart => {} ， callback 必填，返回图表实例
		this.$refs.chart.init(echarts, chart => {
			chart.setOption(this.option);
		});
	},
	// 2、或者使用组件的finished事件里调用
	methods: {
		init() {
			this.$refs.chart.init(echarts, chart => {
				chart.setOption(this.option);
			});
		}
	}
}
```

## 数据更新
- 使用 `ref` 可获取`setOption`设置更新

```js
this.$refs.chart.setOption(data)
```

## 图表大小
- 在有些场景下，我们希望当容器大小改变时，图表的大小也相应地改变。

```js
// 默认获取容器尺寸
this.$refs.chart.resize()
// 指定尺寸
this.$refs.chart.resize({width: 375, height: 375})
```


## 常见问题
- 微信小程序 `2d` 只支持 真机调试2.0
- 微信开发工具会出现canvas不跟随页面的情况，真机不影响
- `toolbox` 不支持
- echarts 5.3.0 的 lines 不支持 trailLength，故需设置为 `0`


## Props

| 参数             | 说明                                                            | 类型             | 默认值        | 版本 	|
| ---------------  | --------                                                        | -------         | ------------ | ----- 	|
| custom-style     | 自定义样式                                                      |   `string`       | -            | -     	|
| type             | 指定 canvas 类型                                				 |    `string`      | `2d`         |   	    |
| is-clickable     | 是否派发点击事件                                                 |    `boolean`     | `true`     |   	    |
| is-disable-scroll | 触摸图表时是否禁止页面滚动                                       |    `boolean`     | `false`     |   	    |
| is-clickable     | 是否派发点击事件                                                 |    `boolean`     | `true`     |   	    |
| beforeDelay       |  延迟初始化 (毫秒)                       						|    `number`     | `30`     |   	    |

## 事件

| 参数                    | 说明                                                                                                             |
| ---------------        | ---------------                                                                                                  |
| init(echarts, chart => {})  | 初始化调用函数,第一个参数是传入`echarts`,第二个参数是回调函数，回调函数的参数是 `chart` 实例                                           |  
| setChart(chart => {})        | 已经初始化后，请使用这个方法，是个回调函数，参数是 `chart` 实例                  |  
| setOption(data)        | [图表配置项](https://echarts.apache.org/zh/option.html#title)，用于更新 ，传递是数据 `option`  |  
| clear()                | 清空当前实例，会移除实例中所有的组件和图表。  |  
| dispose()              | 销毁实例  |  
| showLoading()          | 显示加载  |  
| hideLoading()          | 隐藏加载  |  
| [canvasToTempFilePath](https://uniapp.dcloud.io/api/canvas/canvasToTempFilePath.html#canvastotempfilepath)(opt)  | 用于生成图片,与官方使用方法一致，但不需要传`canvasId`  |  


## 打赏
如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  

![输入图片说明](https://static-6d65bd90-8508-4d6c-abbc-a4ef5c8e49e7.bspapp.com/image/222521_bb543f96_518581.jpeg "微信图片编辑_20201122220352.jpg")
![输入图片说明](https://static-6d65bd90-8508-4d6c-abbc-a4ef5c8e49e7.bspapp.com/image/wxplay.jpg "wxplay.jpg")