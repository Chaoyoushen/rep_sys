<template>
	<view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>意见反馈</text>
			</view>
		</view>
		<view class="cu-form-group">
			<textarea maxlength="-1" v-model="feedbackDetail" placeholder="请留下您的宝贵意见"></textarea>
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-gradual-blue lg" @click="feedback" :disabled="isDisable">提交反馈</button>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/user.js'
	export default {
		data() {
			return {
				feedbackDetail:'',
				isDisable:false
			}
		},
		methods: {
			feedback(){
				if(this.feedbackDetail==''){
					uni.showModal({
						title: "提交失败",
						content:"请输入有效反馈内容",
						showCancel:false
					})
					return
				}
				if(this.feedbackDetail.length>1000){
					uni.showModal({
						title: "提交失败",
						content:"请输入1000字以下内容",
						showCancel:false
					})
					return
				}
				this.isDisable = true
				uni.showLoading({
					title: '提交中',
				})
				Api.feedback({message: this.feedbackDetail}).then(res=>{
					uni.hideLoading()
					uni.showModal({
						title: "提交成功",
						content:"信息部已经收到您的宝贵意见，感谢您的反馈",
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
