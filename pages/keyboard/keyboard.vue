<template>
	<view class="content">
		<div>页面中的值：{{inputValue}}</div>
		<div>
			<p @click="show = true">点我调用键盘</p>
		</div>
		<!-- #ifdef VUE3 -->
		<!-- vue3一定要用 @update:show 在方法中更新状态；vue3中不支持.sync，所以.... -->
		<v-keyboard :show="show" @update:show="flag => show = flag" v-model="inputValue" />
		<!-- #endif -->

		<!-- #ifdef VUE2 -->
		<!-- vue2的用法 -->
		<v-keyboard :show.sync="show" :value.sync="inputValue" />
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				inputValue: '13123123'
			}
		}
	}
</script>

<style lang=" scss" scoped></style>