<template>
<view>
	<view class="cu-bar tabbar bg-white">
		<view class="action">
			<view class="cuIcon-cu-image">
				<image src="/static/service.png" @click="changeTab(0)"></image>
			</view>
			<view class="text-gray">工单</view>
		</view>
		<view class="action">
			<view class="cuIcon-cu-image" @click="changeTab(1)">
				<image src="/static/user.png"></image>
			</view>
			<view class="text-gray">我的</view>
		</view>
	</view>
	<view v-show="Inv == 0">
		<view v-for="item in WOList" :key="item.orderId">
			<view v-show="item.sts=='2'||item.sts=='3'">
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
		<view class="cu-form-group bg-white" @click="intoGrab">
			<view class="title">进入抢单页面</view>
			<text class="lg text-gray cuIcon-right"></text>
		</view>
		<view class="cu-form-group bg-white" @click="intoHis">
			<view class="title">历史工单查询</view>
			<text class="lg text-gray cuIcon-right"></text>
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-gradual-blue lg" @click="logout">退出登录</button>
		</view>
	</view>
</view>
</template>

<script>
	import Api from '../../api/wo';
	import userApi from '../../api/user';
	export default {
		onPullDownRefresh:function(){
			if(this.Inv == 0){
				Api.getEngineerWO().then(res => {
					this.WOList = res.data
					uni.stopPullDownRefresh()
				})
			}else if(this.Inv == 1){
				Api.getEngineerHisWO()().then(res => {
					this.WOList = res.data
					uni.stopPullDownRefresh()
				})
			}
		},
		onLoad:function(){
			uni.showLoading({
			    title: '加载中'
			});
			Api.getEngineerWO().then(res => {
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
			intoGrab(){
				uni.navigateTo({
					url:'../grab_wo/grab_wo'
				})
			},
			intoHis(){
				uni.navigateTo({
					url:'../engineer_his_wo/engineer_his_wo'
				})
			},
			changeTab(Inv){
				uni.showLoading({
					mask:true
				})
			    this.Inv = Inv
				if(this.Inv == 0){
					Api.getEngineerWO().then(res => {
						this.WOList = res.data
						uni.hideLoading()
					})
				}else if(this.Inv == 1){
					Api.getEngineerHisWO().then(res => {
						this.WOList = res.data
						console.log(this.WOList)
						uni.hideLoading()
					})
				}
			},
			returnItem(item){
				console.log(item)
			},
			logout(){
				userApi.logout().then(()=>{
					uni.setStorageSync('token',null)
					uni.setStorageSync('role',null)
					uni.reLaunch({
						url: '../login/login'
					})
				})
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

