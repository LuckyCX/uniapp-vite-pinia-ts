<template>
	<view class="dui-number" :class="['number'+number]" :style="{fontSize:size}">
		<view class="t" :style="{backgroundColor:numberColor}"></view>
		<view class="p" :style="{backgroundColor:numberColor}"></view>
		<view v-if="showLine" class="light" :class="['light'+item]" v-for="item in 3" :style="{background:lineColor}"></view>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		emits: [],
		props: {
			number: {
				type: [Number,String],
				default: 0
			},
			numberColor: {
				type: String,
				default: "#000"
			},
			size:{
				type:String,
				default:'60rpx'
			},
			lineColor:{
				type:String,
				default:'linear-gradient(#10ff48,#f2ffac)'
			},
			showLine:{
				type:Boolean,
				default:true
			}
		}
	};
</script>
<style lang="scss" scoped>
	.dui-number {
		position: relative;
		display: inline-block;
		overflow: hidden;
		.light{
			position: absolute;
			left: 50%;
			bottom:0;
			width:0.08em;
			height:2.4em;
			transform: translateX(-50%);
			z-index: 1;
			&.light2{
				left: 60%;
			}
			&.light3{
				left:40%;
			}
		}
		.t,
		.p {
			transition: all 0.1s ease-in-out;
			&::before{
				position: absolute;
				content: "";
				background-color: #fff;
				z-index: 2;
			}
		}
		&.number8 {
			.t,
			.p {
				position: relative;
				width: 1.2em;
				height: 1.2em;
				border-radius: 0.3em;
				&::before {
					top: 10%;
					left: 50%;
					width: 60%;
					height: 60%;
					border-radius: inherit;
					transform: translateX(-50%);
				}
			}
		}

		&.number0 {
			.t,
			.p {
				position: relative;
				width: 1.2em;
				height: 1.2em;
				&::before {
					top: 30%;
					left: 50%;
					width: 60%;
					height: 85%;
					border-radius: inherit;
					transform: translateX(-50%);
				}
			}
			.t {
				border-radius: 0.3em 0.3em 0 0;
			}
			.p {
				border-radius: 0 0 0.3em 0.3em;
				&::before {
					top: -30%;
				}
			}
		}

		&.number1 {
			.t,
			.p {
				position: relative;
				width: 0.4em;
				height: 1.2em;
			}
			.t {
				border-radius: 0.2em 0.2em 0 0;
			}

			.p {
				border-radius: 0 0 0.2em 0.2em;
			}
		}

		&.number2 {
			.t,
			.p {
				position: relative;
				width: 1.2em;
				height: 1.2em;
				&::before {
					width: 80%;
					height: 60%;
				}
			}

			.t {
				&::before {
					top: 30%;
					border-radius:0 0.2em 0.2em 0;
				}
				border-radius:0.2em 0.2em 0.2em 0;
			}

			.p {
				&::before {
					left: 20%;
					border-radius: 0 0 0 0.2em;
				}
				border-radius:0 0 0.2em 0.2em;
			}
		}

		&.number3 {
			.t,
			.p {
				position: relative;
				width: 1.2em;
				height: 1.2em;
				&::before {
					width: 80%;
					height: 60%;
					border-radius: 0 0.2em 0.2em 0;
				}
			}
			.t {
				&::before {
					top: 30%;
				}
				border-radius: 0.2em 0.2em 0.2em 0;
			}
			.p {
				border-radius: 0 0.2em 0.2em 0.2em;
			}
		}

		&.number4 {
			.t {
				position: relative;
				width: 1.2em;
				height: 1.2em;
				border-radius: 0.1em 0.1em 0 0;
				&::before {
					width: 60%;
					height: 70%;
					top: 0;
					left: 14%;
					border-radius: 0 0 0.1em 0.1em;
				}
			}
			.p {
				position: relative;
				width: 0.3em;
				height: 1.2em;
				margin-left: auto;
				border-radius: 0 0 0.2em 0.2em;
				&::before {
					width: 0.9em;
					height: 1.2em;
					top: 0;
					right: 0.3em;
				}
			}
		}

		&.number5 {
			.t,
			.p {
				position: relative;
				width: 1.2em;
				height: 1.2em;
			}

			.t {
				border-radius: 0.2em 0 0 0.2em;
				&::before {
					top: 10%;
					left: 20%;
					width: 80%;
					height: 60%;
					border-radius: 0.2em 0 0 0.2em;
				}
			}
			.p {
				border-radius: 0 0 0.2em 0.2em;
				&::before {
					left: 0;
					width: 80%;
					height: 60%;
					border-radius: 0 0.2em 0.2em 0;
				}
			}
		}

		&.number6 {
			.t,
			.p {
				position: relative;
				width: 1.2em;
				height: 1.2em;
			}
			.t {
				border-radius: 0.2em 0.2em 0 0;
				&::before {
					top: 20%;
					left: 20%;
					width: 80%;
					height: 80%;
					border-radius: 0.2em 0 0 0.2em;
				}
			}
			.p {
				border-radius: 0 0.2em 0.2em 0.2em;
				&::before {
					top:10%;
					left: 20%;
					width: 60%;
					height: 60%;
					border-radius:0.2em;
				}
			}
		}
	
		&.number7{
			.t{
				width:1.2em;
				height: 0.4em;
				border-radius: 0.2em 0.2em 0 0.2em;
			}
			.p{
				width:0.3em;
				height: 2em;
				border-radius: 0 0 0.2em 0.2em;
				margin-left: auto;
				&::before{
					right:0.3em;
					width:0.9em;
					height: 2em;
				}
			}
		}
		
		&.number9{
			.t{
				position: relative;
				width:1.2em;
				height: 1.2em;
				border-radius: 0.2em 0.2em 0 0.2em;
				&::before {
					top:20%;
					left: 20%;
					width: 60%;
					height: 60%;
					border-radius: 0.2em;
				}
			}
			.p{
				position: relative;
				width:1.2em;
				height: 1.2em;
				border-radius: 0 0 0.2em 0.2em;
				&::before {
					position: absolute;
					content:'';
					top:-2%;
					left: 0;
					width: 80%;
					height: 65%;
					background-color: #fff;
					border-radius: 0 0.2em 0.2em 0;
				}
			}
		}
	
	}
	
	// @keyframes slide{
	// 	0%{
	// 		width:0;
	// 		transform: translateX(-0.2em);
	// 	}
	// 	100%{
	// 		width:1.2em;
	// 		transform: translateX(1.2em);
	// 	}
	// }
</style>