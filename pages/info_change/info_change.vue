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
			<text>{{data.name}}</text>
		</view>
		<view class="cu-form-group">
			<view class="title">联系电话</view>
			<input :value="data.phone" style="text-align:right" @input="setPhone"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">归属网点</view>
			<text>{{data.bkName}}</text>
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-gradual-blue lg" @click="changeWxUserInfo">提交</button>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/user';
	

	export default {
		onLoad:function(){
			Api.getUserInfo().then(res => {
					console.log(res)
					this.data.bkName = res.data.bkName
					this.data.name = res.data.name
					this.data.phone = res.data.phone
				})
		},
		data() {
			return {
				data: {
					bkName: '',
					name: '',
					phone: ''
				}
			};
		},
		methods: {
			changeWxUserInfo(){
				const data = {
					bkName: this.data.bkName,
					name: this.data.name,
					phone: this.data.phone,
				}
				if (this.ValidatePhone(data.phone) == false) {
				 uni.showToast({
					title: '联系电话格式错误',
					icon: 'none'
				 })
				 return
				}
				Api.changeWxUserInfo(data).then((res)=>{
						uni.showModal({
							title: '修改成功',
							content: '信息已成功变更',
							showCancel: false,
							confirmText: '确认'
						})
				})
			},
			setPhone(e){
				this.data.phone = e.detail.value
			},
			ValidatePhone(val){
			    var isPhone = /^1[3456789]\d{9}$///手机号码
			    if(isPhone.test(val)){
			        return true;
			    }
			    else{
			        return false;
			    }
			},
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
