<template>
	<view>
		<view v-if="data.rank == 0">
			<swiper class="screen-swiper" :indicator-dots="true" :circular="false" :autoplay="false"
			 interval="5000" duration="500" :vertical="false">
				<swiper-item>
					<view class="swiper-item justify-center align-center bg-img">
						<image class="pic_background" src="/static/orbg.jpg" />
						<view class="padding shadow-blur radius text-xxl text-bold text-shadow"
						 style="width: 100%;">
							<view class="text-left padding">二零二零已过，今天</view>
							<view class="text-center padding">报修平台与您相逢</view>
							<view class="text-right padding text-purple">期待能有您的支持</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view v-else-if="data.rank >= 0">
			<swiper class="screen-swiper" :indicator-dots="true" :circular="false" :autoplay="false"
			 interval="5000" duration="500" :vertical="false">
				<swiper-item>
					<view class="swiper-item justify-center align-center bg-img">
						<image class="pic_background" src="/static/orbg.jpg" />
						<view class="padding shadow-blur radius text-xxl text-bold text-shadow"
						 style="width: 100%;">
							<view class="text-left padding">
								<text class="text-purple">{{data.firstLoginDate}}</text>
							</view>
							<view class="text-center padding">报修平台与您相逢</view>
							<view class="text-right padding">感谢有您的使用</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item justify-center align-center bg-img">
						<image class="pic_background" src="/static/orbg.jpg" />
						<view class="padding shadow-blur radius text-xxl text-bold text-shadow"
						 style="width: 100%;">
							<view class="text-left padding">
								最早<text class="text-purple padding">{{data.earlyTime}}</text>报修
							</view>
							<view class="text-left padding">
								最晚<text class="text-purple padding">{{data.lastlyTime}}</text>报修
							</view>
							<view class="text-center padding">您的努力</view>
							<view class="text-center padding">都是值得的</view>
							<view class="text-center padding">我们一起并肩战斗</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item justify-center align-center bg-img">
						<image class="pic_background" src="/static/orbg.jpg" />
						<view class="padding shadow-blur radius text-xxl text-bold text-shadow"
						 style="width: 100%;">
							<view class="text-left padding">
								您全年报修<text class="text-purple padding">{{data.allNum}}</text>笔,
								第<text class="text-purple padding">{{data.rank}}</text>名
							</view>
							<view class="text-center padding">
								击败了全辖<text class="text-purple padding">{{data.beatNum}}</text>的小伙伴
							</view>
							<view class="text-left padding">感谢您的信任与支持</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item justify-center align-center bg-img">
						<image class="pic_background" src="/static/orbg.jpg" />
						<view class="padding shadow-blur radius text-xxl text-bold text-shadow"
						 style="width: 100%;">
							<!-- <div ref="chart" style="width:100%;height:460upx;"></div> -->
							<div class="container">
								<div class="canvasView" style="width: 100%;height: 600upx;">
									<mpvue-echarts class="ec-canvas" @onInit="lineInit" canvasId="line" ref="lineChart" />
								</div>
							</div>
							<view class="text-center text-purple">全年报修类型</view>
							<view class="text-center padding">问题不用愁，因为有我们的守护</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item justify-center align-center bg-img">
						<image class="pic_background" src="/static/orbg1.jpg" />
						<view class="padding shadow-blur radius text-xxl text-bold text-shadow"
						 style="width: 100%;">
							<!-- <view class="text-center padding text-mauve" style="margin-top: 30px;">二零二零年，您的年度评价是</view> -->
							<view v-if="data.allNum <= 5">
								<view class="text-center padding text-mauve" style="margin-top: 30px;">二零二零年，您的年度评价是</view>
								<view class="text-center padding text-purple" style="margin-top: 40px;">报修尝鲜者</view>
								<view class="text-center padding text-mauve" style="margin-top: 90px;">敢于尝试新鲜事物，才能发现数字化的便捷</view>
							</view>
							<view v-else-if="data.allNum <= 14">
								<view class="text-center padding text-mauve" style="margin-top: 10px;">二零二零年，您的年度评价是</view>
								<view class="text-center padding text-purple" style="margin-top: 30px;">报修能手</view>
								<view class="text-center padding text-mauve" style="margin-top: 90px;">困难不用愁，一键有人修</view>
							</view>
							<view v-else-if="data.allNum >= 15">
							<view class="text-center padding text-mauve" style="margin-top: 10px;">二零二零年，您的年度评价是</view>
								<view class="text-center padding text-purple" style="margin-top: 40px;">报修高手</view>
								<view class="text-center padding text-mauve" style="margin-top: 90px;">具备数字化思维，才能事半功倍</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/wo.js'
	import * as echarts from '@/components/echarts/echarts.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
	export default {
		onLoad:function(){
			Api.getPerOR().then(res => {
					console.log(res)
					this.data.firstLoginDate = res.data.firstLoginDate
					this.data.earlyTime = res.data.earlyTime
					this.data.lastlyTime = res.data.lastlyTime
					this.data.allNum = res.data.allNum
					this.data.rank = res.data.rank
					this.data.beatNum = ((res.data.beatNum).toFixed(2))*100 + '%'
					this.data.netNum = res.data.netNum
					this.data.osNum = res.data.osNum
					this.data.hardwareNum = res.data.hardwareNum
					this.data.softwareNum = res.data.softwareNum
					this.data.operationNum = res.data.operationNum
					this.xcontent = ['网络问题', '硬件问题', '软件问题', '操作使用问题', '操作系统及驱动问题']
					this.dataList = [this.data.netNum,this.data.hardwareNum,this.data.softwareNum,this.data.operationNum,this.data.osNum]
				})
		},
		data() {
			return {
				line: {
					// 弹窗，响应鼠标指向，显示具体细节
					tooltip: {
						trigger: 'axis',
						axisPointer : {
							type : 'shadow'
						}
					},
					/* toolbox: {
						show:true,
						right : 15,
						top: 15,
						feature: {
							saveAsImage:{show: true,}, //保存图片
						}
					}, */
				    xAxis: {
				        type: 'category',
						axisLabel: { //底部文字倾斜
							interval: 0,
							rotate:25
						},
						boundaryGap : true,
						axisTick: {
							alignWithLabel: true
						},
						data: []
				    },
				    yAxis: {
						show:true,
						axisLine: {show:true},
						axisTick: {show:true},
						splitLine:{show:true},
						splitArea:{show:true},
				        type: 'value',
				    },
				    series: [
						{
							type: 'bar',
							barWidth: '55%',
							color: ['#f44'],
							center:['50%','50%'],
							showBackground: true,
							backgroundStyle: {
								color:'rgba(220, 220, 220, 0.8)'
							},
							itemStyle: {
								normal: {
									barBorderRadius:10,
									label: {
										show: true, //开启显示
										position: 'top', //在上方显示
										/* rotate: 70, // 旋转70度 */
										textStyle: { //数值样式
											/* color: 'black', */
											/* fontSize: 16 */
										},
										/* formatter: function (v) {
										      let val = v.data;
											  console.log("val=" + val)
										      return val + '(' + (val/24*100).toFixed(0) + '%' + ')';
											  return this.getPercentData(val)
										}, */
									}
								}
							},
							data: [],
						},
					]
				},
				data: {
					firstLoginDate: '',
					earlyTime: '',
					lastlyTime: '',
					allNum: '',
					rank: '',
					beatNum: '',
					netNum: '',
					osNum: '',
					hardwareNum: '',
					softwareNum: '',
					operationNum: '',
				},
				// url: ['/static/orbg.jpg'],
				// imageUrl: '/static/orbg.jpg',
				xcontent: [],
				dataList: [],
								/* dataMap: {
					data.netNum+'':(data.netNum/data.allNum).toFixed(0),
					data.hardwareNum:(data.hardwareNum/data.allNum).toFixed(0),
					data.softwareNum:(data.softwareNum/data.allNum).toFixed(0),
					data.operationNum:(data.operationNum/data.allNum).toFixed(0),
					data.osNum:(data.osNum/data.allNum).toFixed(0)
				}, */
			}
		},
		components: {
			mpvueEcharts
		},
		methods: {
			lineInit(e) {
				this.line.xAxis.data = this.xcontent
				this.line.series[0].data = this.dataList
			    let {
			        width,
			        height
			    } = e;
			    let canvas = this.$refs.lineChart.canvas
			    echarts.setCanvasCreator(() => canvas);
			    let lineChart = echarts.init(canvas, null, {
			        width: width,
			        height: height
			    })
			    canvas.setChart(lineChart)
			    lineChart.setOption(this.line)
			    this.$refs.lineChart.setChart(lineChart)
			},
			/* getPercentData(e) {
				console.log(e.value)
				console.log(e.data)
				var count = this.data.allNum
				return e.value + '(' + (e.data.value/count*100).toFixed(0) + '%' + ')'
			} */
		},
	}
</script>

<style>
	.screen-swiper {
		/* min-height: 567upx; */
		/* min-height: 1210upx; */
		min-height: 1240upx;
	}
	swiper-item .swiper-item {
		display: flex;
		/* height: 567rpx; */
		height: 1200upx;
		/* background-image: url('/static/orbg.jpg');
		background-size: 100% 100%; */
		position:relative;
	}
	.pic_background {
		position:absolute;
	}
	/* .ec-canvas {
		display: flex;
		height: 100%;
		flex: 3;
		pointer-events:none;
		z-index: initial;
	} */
</style>
