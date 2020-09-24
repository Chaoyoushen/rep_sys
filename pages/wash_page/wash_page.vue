<template>
	<view>
		<view class="margin-top">
			<text style="color: #ED1C24;margin-left: 20rpx;margin-right: 10rpx;">剩余额度：{{rest}}元</text>
		</view>
		<form name="washWO">
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>联系方式</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input style="text-align:right" v-model="formData.phone"></input>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>洗衣数量</text>
				</view>
			</view>
			<view v-for="item in items" :key="item.cloType">
				<view class="cu-form-group">
					<view class="title margin-right-sm">{{item.cloName}}<text class="margin-right-xs text-cut" style="font-size: 12px;color: #BBBBBB;">{{item.cloCast + '元/件'}}</text></view>
					<input style="text-align:right" type="number" v-model="formData.itemList[item.cloType]" placeholder="0" @input="countChange()"></input>
				</view>
			</view>
			<view class="margin-top">
				<text style="color: #ED1C24;margin-left: 20rpx;margin-right: 10rpx;">预计花费：{{count}}元</text>
			</view>
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-gradual-blue lg" @tap="createWO">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import Api from '../../api/wp.js'
	export default {
		onShow:function() {
			Api.initwashAmount().then(res=>{
			console.log(res)
			this.items = res.data.items
		    this.rest = res.data.rest;
		   })		
		},
		data() {
			return {
				items:[],
				formData:{
					itemList:{}
				},
				rest: 0,
				count: 0
			}
		},
		methods: {
			countChange(){
				this.count = 0
				let i = 0
				for(i = 0;i<this.items.length;i++){
					if(null != this.formData.itemList[this.items[i].cloType]){
						this.count = this.count + this.items[i].cloCast * this.formData.itemList[this.items[i].cloType]
					}
				}
				
			},
			createWO(){
				if(count>rest){
					uni.showModal({
						title: "提交失败",
						content:"余额不足",
						success: function() {
							uni.hideLoading()
							uni.navigateBack({
								url: '/pages/wash_his/wash_his'
							})
						}
					})
				}
				Api.createWash(this.formData).then(res=>{
					uni.showModal({
						title: "提交成功",
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
