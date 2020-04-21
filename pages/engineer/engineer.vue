<template>
	<view>
		<view class=" margin-bottom-xl">
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
				<view v-for="item in WOList" :key="item.orderId">
					<view class="cu-list menu">
						<view class="cu-item" @click="goWOAcceptDetail(item.orderId)">
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
								<view :class="tagList[0]">{{tagInfoList[0]}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="Inv == 2">
				<view class="cu-bar">
					<view class="action">
						<text class="cuIcon-title text-green"></text>
						<text>个人信息</text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<text>{{name}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">联系电话</view>
					<text>{{phone}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">归属网点</view>
					<text>{{bkName}}</text>
				</view>
				<view class="cu-form-group bg-white margin-top" @click="infoChange">
					<view class="title">个人信息变更</view>
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
		<view class="cu-form-group bg-gray">
			<view class="title"></view>
			<text class="lg text-gray "></text>
		</view>
		<view class="cu-bar tabbar bg-white  solid-bottom ">
			<view class="action">
				<view class="cuIcon-cu-image" @click="changeTab(0)">
					<image :src="tab1List[Inv]"></image>
				</view>
				<view class="text-gray">工单</view>
			</view>
			<view class="action">
				<view class="cuIcon-cu-image" @click="changeTab(1)">
					<image :src="tab2List[Inv]"></image>
				</view>
				<view class="text-gray">抢单</view>
			</view>
			<view class="action">
				<view class="cuIcon-cu-image" @click="changeTab(2)">
					<image :src="tab3List[Inv]"></image>
				</view>
				<view class="text-gray">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/wo';
	import userApi from '../../api/user';
	export default {
		onPullDownRefresh: function() {
			if (this.Inv == 0) {
				Api.getEngineerWO().then(res => {
					Api.verifyToken(res)
					this.WOList = res.data
					uni.stopPullDownRefresh()
				})
			} else if (this.Inv == 1) {
				Api.initGrabWOList().then(res => {
					Api.verifyToken(res)
					this.WOList = res.data
					uni.stopPullDownRefresh()
				})
			} else if (this.Inv == 2) {
				userApi.getUserInfo().then(res => {
					this.bkName = res.data.bkName
					this.name = res.data.name
					this.phone = res.data.phone
					uni.stopPullDownRefresh()
				})
			}
		},
		onLoad: function() {
			uni.showLoading({
				title: '加载中'
			});
			Api.getEngineerWO().then(res => {
				Api.verifyToken(res)
				this.WOList = res.data
				uni.hideLoading()
			})
			wx.hideHomeButton();
		},
		data() {
			return {
				WOList: [],
				tagList: ["cu-tag round bg-orange light", "cu-tag round bg-blue light", "cu-tag round bg-green light",
					"cu-tag round bg-grey light"
				],
				tab1List: ["/static/his_selected.png", "/static/his.png", "/static/his.png"],
				tab2List: ["/static/service.png", "/static/service_selected.png", "/static/service.png"],
				tab3List: ["/static/user.png", "/static/user.png", "/static/user_selected.png"],
				tagInfoList: ['待抢单', '处理中', '已处理', '已关闭'],
				Inv: 0,
				bkName: '',
				name: '',
				phone: ''
			}
		},
		methods: {
			getDate(e) {
				var date = new Date(parseInt(e));
				var YY = date.getFullYear()
				var MM = date.getMonth() + 1
				var DD = date.getDate()
				return YY + "年" + MM + "月" + DD + "日"
			},
			goWODetail(orderId) {
				console.log(orderId)
				uni.navigateTo({
					url: '../engineer_wo/engineer_wo?orderId=' + orderId
				})
			},
			intoGrab() {
				uni.navigateTo({
					url: '../grab_wo/grab_wo'
				})
			},
			intoHis() {
				uni.navigateTo({
					url: '../engineer_his_wo/engineer_his_wo'
				})
			},
			infoChange() {
				uni.navigateTo({
					url: '../info_change/info_change'
				})
			},
			changeTab(Inv) {
				uni.showLoading({
					mask: true
				})
				this.Inv = Inv
				if (this.Inv == 0) {
					Api.getEngineerWO().then(res => {
						this.WOList = res.data
						uni.hideLoading()
					})
				} else if (this.Inv == 1) {
					Api.initGrabWOList().then(res => {
						this.WOList = res.data
						console.log(this.WOList)
						uni.hideLoading()
					})
				} else if (this.Inv == 2) {
					userApi.getUserInfo().then(res => {
						this.bkName = res.data.bkName
						this.name = res.data.name
						this.phone = res.data.phone
						uni.hideLoading()
					})
				}
			},
			goWOAcceptDetail(orderId) {
				console.log(orderId)
				uni.navigateTo({
					url: '../grab_detail/grab_detail?orderId=' + orderId
				})
			},
			returnItem(item) {
				console.log(item)
			},
			logout() {
				userApi.logout().then(() => {
					uni.setStorageSync('token', null)
					uni.setStorageSync('role', null)
					uni.reLaunch({
						url: '../login/login'
					})
				})
			}
		}
	}
</script>

<style>
	.cu-bar.tabbar {
		padding: 0;
		height: calc(50upx);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.inv-h-w {
		background-color: #FFFFFF;
		height: 100upx;
		display: flex;
	}

	.inv-h {
		font-size: 30upx;
		flex: 1;
		text-align: center;
		color: #C9C9C9;
		height: 100upx;
		line-height: 100upx;
	}

	.inv-h-se {
		color: #5BA7FF;
		border-bottom: 4upx solid #5BA7FF;
	}

	page {
		background-color: #f0f0f0;
	}
</style>
