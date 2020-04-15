<template>
<view>
	<view class="cu-list menu" v-for="item in WOList" :key="item.operationId">
		<view class="cu-item" @click="goWODetail(item.operationId)">
			<view class="content padding-tb-sm">
				<view>
					<text class="margin-right-xs text-cut">{{item.operationInfo}}</text>
				</view>
				<view class="text-gray text-sm">
					<text class="margin-right-xs text-cut" maxlength="10">{{item.person}}</text>
				</view>
			</view>
			<view class="action">
				<view class="text-grey text-xs">{{getDate(item.time)}}</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	import Api from '../../api/wo';
	export default {
		onPullDownRefresh:function(option){
			Api.getOpWO(this.orderId).then(res => {
					this.WOList = res.data
					uni.stopPullDownRefresh()
				})
		},
		onLoad:function(option){
			uni.showLoading({
			    title: '加载中'
			});
			this.orderId = option.orderId
			Api.getOpWO(option.orderId).then(res => {
					console.log(res)
					this.WOList = res.data
					uni.hideLoading()
				})
		},
		data() {
			return {
			WOList: [],
			orderId: ''
			}
		},
		methods: {
			getDate(e){
				var date = new Date(parseInt(e));
				var YY = date.getFullYear()
				var MM = date.getMonth() + 1
				var DD = date.getDate()
				let h = date.getHours()
				let m = date.getMinutes()
				return YY+"年"+MM+"月"+DD+"日" + h +"点" + m +"分"
			},
			goWODetail(operationId){
				console.log(operationId)
				uni.navigateTo({
					url:'../operation_wo/operation_wo?operationId='+operationId
				})
				
			}
			}
		}
	
</script>

<style>
 .cu-form-group .title {
  min-width: calc(4em + 15px);
 }
 
 button{
  width: 90%;
 }
</style>