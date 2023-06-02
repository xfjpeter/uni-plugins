<template>
	<view class="v-keyboard" @click="toggleKeyboard" v-show="showKeyboard">
		<!-- 遮罩 -->
		<view class="mask" v-if="mask"></view>
		<!-- 具体的键盘布局 -->
		<view class="wrapper" @click.stop>
			<!-- 工具栏 -->
			<div class="wrapper-tool" v-if="tool">
				<text>{{ text }}</text>
			</div>
			<!-- 画按钮框框 -->

			<view class="wrapper-buttons">
				<view :class="{ 'wrapper-item': true, disabled: number === '' }" :disabled="number === ''"
					v-for="number in numbers" :key="number" @click="onSelect(number)">{{ number }}</view>
				<view class="wrapper-item backspace" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
					@touchend="handleTouchEnd" @click="onBackspace"></view>
			</view>
			<!-- 安全距离 -->
			<view class="env-safe-bottom"></view>
		</view>
	</view>
</template>

<script>
	/**
	 * keyboard自定义键盘
	 * description 自定义键盘
	 * @property {String, Number} value 当前输入的内容
	 * @property {Boolean} mask = [true|false] 是否显示遮罩
	 * @property {String} type = ['digital'|'idcard'|'tel'] 键盘类型
	 * @property {Boolean} auto = [true|false] 如果为 true 需要设置 maxLength 的长度，当输入长度和 maxLength 一致，会触发 confirm 回调
	 * @property {Boolean} tool = [true|false] 显示/隐藏工具栏
	 * @property {Boolean} show = [true|false] 显示/隐藏键盘
	 * @property {String} text = '数字键盘' 自定义工具栏文字提示
	 * @property {Number, String} max-length 能输入的最大长度，为 0 的话不限制长度
	 * @property {String} confirm-text = '确认' 确认按钮的文字
	 * @event {Function} confirm 点击完成触发
	 * @example <v-keyboard v-model="inputValue" @confirm="onCondirm"></v-keyboard>
	 */
	export default {
		name: 'VKeyboard',
		emits: ['confirm'],
		props: {
			value: [String, Number],
			mask: Boolean,
			type: {
				require: false,
				type: String,
				default: 'digital',
				validator: (val) => ['digital', 'idcard', 'tel'].includes(val)
			},
			tool: Boolean,
			show: Boolean,
			text: {
				type: String,
				default: '数字键盘'
			},
			maxLength: {
				type: [Number, String],
				default: 0
			},
			confirmText: {
				type: String,
				default: '确定'
			}
		},
		data() {
			return {
				showKeyboard: false,
				inputValue: '',
				typeMap: {
					digital: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0],
					idcard: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0],
					tel: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
				}
			}
		},
		computed: {
			numbers() {
				return this.typeMap[this.type] || this.typeMap['digital']
			},
			inputValueArr: ({
				inputValue
			}) => `${inputValue}`.split('').map(String),
			hasDot: ({
				inputValueArr
			}) => inputValueArr.indexOf('.') > -1
		},
		watch: {
			value: {
				immediate: true,
				handler(newVal) {
					this.inputValue = newVal
				}
			},
			show: {
				immediate: true,
				handler(newVal) {
					this.showKeyboard = newVal
				}
			},
			showKeyboard(newVal) {
				this.$emit('update:show', newVal)
			},
			inputValue(newVal) {
				this.$emit('update:value', newVal)
				// 自动触发 @confirm 回调
				if (this.maxLength !== 0 && this.inputValueArr.length === this.maxLength) {
					this.$emit('confirm', newVal)
					this.showKeyboard = false
				}
			}
		},
		methods: {
			toggleKeyboard() {
				this.showKeyboard = !this.showKeyboard
			},
			onBackspace() {
				if (this.inputValueArr.length === 0) {
					return
				}
				this.inputValue = this.inputValueArr.slice(0, this.inputValueArr.length - 1).join('')
			},
			onSelect(value) {
				if (this.hasNoPass(value)) return
				let currentValue
				// 如果是第一次点击.的话，变成0.
				if (this.inputValueArr.length === 0 && value === '.') {
					currentValue = '0.'
				} else {
					currentValue = [...this.inputValueArr, value].join('')
				}
				this.inputValue = currentValue
			},
			hasNoPass(value) {
				// 如果是数字，整个数字中 . 只能出现一次
				if (this.type === 'digital' && this.hasDot && value === '.') {
					return true
				}
				// 如果已经是 0 开头的话，第二位连着不能是0开头
				if (this.type === 'digital' && this.inputValueArr[0] === '0' && this.inputValueArr.length === 1 && value !==
					'.') {
					return true
				}
				// 如果 maxLength 不为 0 的话，只能输入 maxLength 指定长度的
				if (['idcard', 'tel'].includes(this.type) && this.maxLength !== 0) {
					return this.inputValueArr.length >= this.maxLength
				}

				return false
			},
			handleTouchStart(e) {
				const {
					pageX,
					pageY
				} = e.touches[0]
				this.pos = {
					pageX,
					pageY
				}
				this.timeoutTimer = setTimeout(() => {
					this.intervalTimer = setInterval(this.onBackspace, 100)
				}, 300)
			},
			handleTouchMove(e) {
				const {
					pageX,
					pageY
				} = e.touches[0]
				if (Math.abs(this.pos.pageX - pageX) <= 10 && Math.abs(this.pos.pageY - pageY) < 10) {
					this.handleTouchEnd()
				}
			},
			handleTouchEnd() {
				clearTimeout(this.timeoutTimer)
				clearInterval(this.intervalTimer)
			}
		}
	}
</script>

<style lang="scss" scoped>
	$bg: #e7e7e7;
	$bg-active: #dbdbdb;
	$color: #1a2a1a;
	$fontSize: 40upx;
	$btn-border-radius: 10upx;
	$btn-margin: 16upx;
	$btn-height: 100upx;

	.v-keyboard {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1001;

		.mask {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.3);
			z-index: 1002;
		}

		.wrapper {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: $bg;
			font-size: $fontSize;
			color: $color;
			user-select: none;
			z-index: 1003;
			padding-top: 10upx;
			overflow: hidden;

			&-tool {
				text-align: center;
				color: #666;
				font-size: 32upx;
				padding: 16rpx 0;
			}

			&-buttons {
				display: flex;
				flex-wrap: wrap;
			}

			&-item {
				display: flex;
				align-items: center;
				justify-content: center;
				width: calc(33% - #{$btn-margin});
				height: $btn-height;
				border-radius: $btn-border-radius;
				background-color: #fff;
				margin-bottom: $btn-margin;
				margin-left: $btn-margin;
				font-weight: bold;

				&.backspace {
					background-image: url('data:image/png;base64,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');
					background-repeat: no-repeat;
					background-size: 60upx;
					background-position: center center;
					color: $color;
				}

				&:nth-child(10),
				&:nth-child(12) {
					background-color: transparent;
				}

				&:nth-child(10),
				&:nth-child(11),
				&:nth-child(12) {
					margin-bottom: 10upx;
				}

				&:not(.disabled):active {
					background-color: $bg-active;
				}

				&:disabled {
					background-color: transparent !important;
				}
			}
		}

		/** 底部安全距离 */
		.env-safe-bottom {
			height: constant(safe-area-inset-bottom);
			height: env(safe-area-inset-bottom);
		}
	}
</style>