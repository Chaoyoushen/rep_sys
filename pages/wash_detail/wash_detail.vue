<template>
	<view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>洗衣数量</text>
			</view>
		</view>
		<view v-for="item in items" :key="item.name">
			<view class="cu-form-group">
				<view class="title">{{item.name}}</view>
				<text>{{item.value}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>金额</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">金额</view>
				<text>{{totalcount}}元</text>
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-gradual-blue lg" @click="Cancel">撤销订单</button>
		</view>

	</view>
</template>

<script>
	import Api from '../../api/wp.js';

	export default {
		onLoad:function(option){
			Api.washHisDetail(option.id).then(res=>{
				console.log(res)
				this.totalcount=res.data.totalcount
				this.id=res.data.id
				this.items = res.data.items
			})
		},
		data() {
			return {
				items:{},
				totalcount:'0',
				id:'',
						
			}
		},
		methods: {
			Cancel(){	
				console.log(this.id)
				Api.CancelWash(this.id).then(res=>{
					uni.showModal({
						title: "撤销成功",
					success: function() {
						uni.hideLoading()
						uni.navigateBack({
							url: '/pages/wash_his/wash_his'
						})
					}
						})
					
				})
			}
				
		}
	}
</script>

<style>

</style>
