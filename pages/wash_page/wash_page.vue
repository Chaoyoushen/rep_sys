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
			<view class="cu-form-group">
				<view class="title">西装上装</view>
				<input style="text-align:right" type="number" v-model="formData.xzsz" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">西装下装</view>
				<input style="text-align:right" v-model="formData.xzxz" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">衬衣</view>
				<input style="text-align:right" type="number" v-model="formData.cy" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">西背</view>
				<input style="text-align:right" type="number" v-model="formData.xb" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">丝巾</view>
				<input style="text-align:right" type="number" v-model="formData.sj" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">领带</view>
				<input style="text-align:right" type="number" v-model="formData.ld" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">大衣</view>
				<input style="text-align:right" type="number" v-model="formData.dy" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">其他</view>
				<input style="text-align:right" type="number" v-model="formData.qt" placeholder="0"></input>
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
		    this.rest = res.data.rest;
		   })		
		},
		data() {
			return {
				formData:{
					phone: '',
					xzsz: '',
					xzxz: '',
					cy: '',
					xb: '',
					sj: '',
					ld: '',
					dy: '',
					qt: '',
					person:'',
				},
				rest: ''
			}
		},
		methods: {
			createWO(){
				console.log(this.formData)
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
