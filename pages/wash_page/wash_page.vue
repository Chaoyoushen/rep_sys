<template>
	<view>
		<form name="washWO">
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>联系方式</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input style="text-align:right" type="number" :maxlength="11" v-model="formData.phone"></input>
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
				<text style="color: #ED1C24;margin-left: 20rpx;margin-right: 10rpx;">剩余额度：{{rest}}元</text>
			</view>
			<view class="margin-top">
				<text style="color: #ED1C24;margin-left: 20rpx;margin-right: 10rpx;">预计花费：{{count}}元</text>
			</view>
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-gradual-blue lg" @tap="createWO" :disabled="isDisable">提交</button>
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
		    this.rest = res.data.rest
			this.formData.phone = res.data.phone
		   })		
		},
		data() {
			return {
				items:[],
				formData:{
					itemList:{},
					phone:''
				},
				rest: 0,
				count: 0,
				isDisable:false
			}
		},
		methods: {
			ValidatePhone(val) {
				console.log(val)
				var isPhone = /^1[3456789]\d{9}$/ //手机号码
				if (isPhone.test(val)) {
					return true;
				} else {
					return false;
				}
			},
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
				if(this.count>this.rest){
					uni.showModal({
						title: "提交失败",
						content:"余额不足",
						showCancel:false
					})
					return
				}
				if(!this.ValidatePhone(this.formData.phone)){
					uni.showModal({
						title: "提交失败",
						content:"请输入正确的手机号码",
						showCancel:false
					})
					return
				}
				if(this.count===0){
					uni.showModal({
						title: "提交失败",
						content:"至少选择一个种类的衣物",
						showCancel:false
					})
					return
				}
				this.isDisable = true
				uni.showLoading({
					title: '提交中',
				})
				Api.createWash(this.formData).then(res=>{
					uni.hideLoading()
					uni.showModal({
						title: "提交成功",
						showCancel:false,
						success: function() {
							uni.hideLoading()
							uni.navigateBack()
						}
					})
				})
			}
		}
	}
</script>

<style>

</style>
