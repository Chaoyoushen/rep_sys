<template>
<view>
	<view class="cu-list menu" v-for="item in WOList" :key="item.orderId">
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
</template>

<script>
	import Api from '../../api/wo';
	export default {
		onPullDownRefresh:function(){
			Api.getHisWO({type:"0"}).then(res => {
					this.WOList = res.data
					uni.stopPullDownRefresh()
				})
		},
		onShow:function(){
			uni.showLoading({
			    title: '加载中'
			});
			Api.getHisWO({type:"0"}).then(res => {
					this.WOList = res.data
					uni.hideLoading()
				})
		},
		onLoad:function(){
			uni.showLoading({
			    title: '加载中'
			});
			Api.getHisWO({type:"0"}).then(res => {
					this.WOList = res.data
					uni.hideLoading()
				})
		},
		data() {
			return {
			WOList: [],
			tagList: ["cu-tag round bg-orange light","cu-tag round bg-blue light","cu-tag round bg-green light","cu-tag round bg-grey light"],
			tagInfoList: ['待审批','处理中','待评价','已关闭'],
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
					url:'../worker_wo/worker_wo?orderId='+orderId
				})
			}
		}
	}
</script>

<style>

</style>
