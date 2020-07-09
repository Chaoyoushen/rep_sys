<template>
	<view>
		<view class="margin-top">
			<text style="color: #ED1C24;margin-left: 20rpx;margin-right: 10rpx;">剩余额度：</text>
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
				<view class="title">长袖衬衫</view>
				<input style="text-align:right" type="number" v-model="formData.cxcs" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">短袖衬衫</view>
				<input style="text-align:right" v-model="formData.dxcs" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">马甲</view>
				<input style="text-align:right" type="number" v-model="formData.mj" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">西服上装</view>
				<input style="text-align:right" type="number" v-model="formData.xfsz" placeholder="0"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">西服下装</view>
				<input style="text-align:right" type="number" v-model="formData.xfxz" placeholder="0"></input>
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
		data() {
			return {
				formData:{
					phone: '',
					cxcs: '',
					dxcs: '',
					mj: '',
					xfsz: '',
					xfxz: '',
				}
			}
		},
		methods: {
			createWO(){
				console.log(this.formData)
				Api.createWash(this.formData).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style>

</style>
