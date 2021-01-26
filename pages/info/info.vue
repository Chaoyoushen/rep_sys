<template>
	<view>
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
			<view class="title">联系手机</view>
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
		<view class="cu-form-group bg-white" @click="intoClosedWO">
			<view class="title">历史工单查询</view>
			<text class="lg text-gray cuIcon-right"></text>
		</view>
		<view v-if="washFlag=='1'">
			<view class="cu-form-group bg-white margin-top" @click="washPage">
				<view class="title">洗衣报送</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="cu-form-group bg-white" @click="washHis">
				<view class="title">送洗记录</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<view class="cu-form-group bg-white margin-top" @click="feedback">
			<view class="title">意见反馈</view>
			<text class="lg text-gray cuIcon-right"></text>
		</view>
		<view class="cu-form-group bg-white margin-top" @click="orderReport">
			<view class="title">年度报修账单</view>
			<text class="lg text-gray cuIcon-right"></text>
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-gradual-blue lg" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/user';
	

	export default {
		onShow:function(){
			Api.getUserInfo().then(res => {
					this.bkName = res.data.bkName
					this.name = res.data.name
					this.phone = res.data.phone
					this.washFlag = res.data.washFlag
				})
		},
		data() {
			return {
				bkName: '',
				name: '',
				phone: '',
				washFlag: '0'
			};
		},
		methods: {
			logout(){
				Api.logout().then(()=>{
					uni.setStorageSync('token',null)
					uni.setStorageSync('role',null)
					uni.reLaunch({
						url: '../login/login'
					})
				})
			},
			infoChange(){
				uni.navigateTo({
					url:"../info_change/info_change"
				})
			},
			intoClosedWO(){
				uni.navigateTo({
					url:"../close_wo_list/close_wo_list"
				})
			},
			washPage(){
				uni.navigateTo({
					url:"../wash_page/wash_page"
				})
			},
			feedback(){
				uni.navigateTo({
					url:"../feedback/feedback"
				})
			},
			orderReport(){
				uni.navigateTo({
					url:"../order_report/order_report"
				})
			},
			washHis(){
					uni.navigateTo({
					url:"../wash_his/wash_his"
			})
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
