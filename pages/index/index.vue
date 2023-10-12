<template>
	<view class="" :style="{backgroundColor: '#f7f7f7', fontSize}">
		<div style="padding: 0.625rem 0;">
			<div style="background-color: #ccc; padding: 0.625rem 0;">hahahaah</div>
		</div>
		<view class="example">
			<navigator url="../tabs/v-tabs-1/v-tabs-1">v-tabs 1.x</navigator>
			<navigator url="../tabs/tabs">v-tabs 基本示例</navigator>
			<navigator url="../tabs/order">tabs + swiper 订单展示</navigator>
			<navigator url="../tabs/tabs-static">tabs 固定在顶部</navigator>
			<navigator url="../navbar/navbar">navbar 示例</navigator>
			<navigator url="../tabs/column">侧边 tabs</navigator>
			<navigator url="../keyboard/keyboard">数字键盘</navigator>
			<navigator url="../test-v-tab/test-v-tab">测试v-tab</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				calcFontSize: 16
			}
		},
		computed: {
			fontSize() {
				console.log(`${this.calcFontSize * 0.625}`);
				return `${this.calcFontSize}px`
			}
		},
		mounted() {
			uni.getSystemInfo().then(result => {
				const [err, res] = result
				this.calcFontSize = res.screenWidth / 23.4375
			})

			uni.setNavigationBarTitle({
				title: '哈哈哈哈'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.example {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 30rpx;
		box-sizing: border-box;

		navigator {
			width: 48%;
			margin-bottom: 30rpx;
			color: #ffffff;
			background-color: #2979ff;
			border-radius: 10rpx;
			padding: 30rpx;
			box-sizing: border-box;
		}
	}
</style>