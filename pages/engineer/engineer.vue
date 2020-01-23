<template>
<view>
	<view>
	    <view class="inv-h-w">
	        <view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">当前工单</view>
	        <view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">历史工单</view>
	    </view>
	</view>
	<view v-show="Inv == 0">
		<view v-for="item in WOList" :key="item.orderId">
			<view v-show="item.sts=='2'">
				<view class="cu-list menu">
					<view class="cu-item" @click="goWODetail(item.orderId)">
						<view class="content padding-tb-sm">
							<view>
								<text class="margin-right-xs text-cut">{{item.description}}</text>
							</view>
							<view class="text-gray text-sm">
								<text class="margin-right-xs text-cut" maxlength="10">{{item.person}}</text>
							</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">{{getDate(item.createdDate)}}</view>
							<view :class="tagList[parseInt(item.sts)-1]">{{tagInfoList[parseInt(item.sts)-1]}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view v-show="Inv == 1">
		<view v-for="item in WOList" :key="item.orderId">
			<view v-show="item.sts=='3'||item.sts=='4'">
				<view class="cu-list menu">
					<view class="cu-item" @click="goWODetail(item.orderId)">
						<view class="content padding-tb-sm">
							<view>
								<text class="margin-right-xs text-cut">{{item.description}}</text>
							</view>
							<view class="text-gray text-sm">
								<text class="margin-right-xs text-cut" maxlength="10">{{item.person}}</text>
							</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">{{getDate(item.createdDate)}}</view>
							<view :class="tagList[parseInt(item.sts)-1]">{{tagInfoList[parseInt(item.sts)-1]}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	import Api from '../../api/wo';
	export default {
		onPullDownRefresh:function(){
			Api.getHisWO().then(res => {
				this.WOList = res.data
				uni.stopPullDownRefresh()
			})
		},
		onLoad:function(){
			uni.showLoading({
			    title: '加载中'
			});
			Api.getHisWO().then(res => {
				this.WOList = res.data
				uni.hideLoading()
			})
			wx.hideHomeButton();
		},
		data() {
			return {
				WOList: [],
				tagList: ["cu-tag round bg-orange light","cu-tag round bg-blue light","cu-tag round bg-green light","cu-tag round bg-grey light"],
				tagInfoList: ['待审批','已分派','已处理','已关闭'],
				Inv:0
			}
		},
		methods: {
			getDate(e){
				var date = new Date(parseInt(e));
				var YY = date.getFullYear()
				var MM = date.getMonth() + 1
				var DD = date.getDate()
				return YY+"年"+MM+"月"+DD+"日"
			},
			goWODetail(orderId){
				console.log(orderId)
				uni.navigateTo({
					url:'../engineer_wo/engineer_wo?orderId='+orderId
				})
			},
			changeTab(Inv){
			    that.navIdx = Inv;
			},
			returnItem(item){
				console.log(item)
			}
		}
	}
</script>

<style>
	.inv-h-w{background-color: #FFFFFF;height: 100upx;display: flex;}
	.inv-h{font-size: 30upx;flex: 1;text-align: center;color: #C9C9C9;height: 100upx;line-height: 100upx;}
	.inv-h-se{color: #5BA7FF;border-bottom: 4upx solid #5BA7FF;}
	page{background-color: #F2F2F2;}
</style>

