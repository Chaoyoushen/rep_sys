<template>
	<view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>当前工单</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">工单号</view>
			<view>
				<text>{{orderId}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>工单具体信息</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">联系人</view>
			<view>
				<text>{{person}}</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">电话号码</view>
			<view>
				<text>{{phone}}</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">归属网点</view>
			<view>
				<text>{{br}}</text>
			</view>
		</view>
		<view class="cu-form-group bg-white margin-top">
			<view class="title">故障分类</view>
			<view>
				<text>{{fault}}</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">设备类型</view>
			<view>
				<text>{{machine}}</text>
			</view>
		</view>
		<view class="button-sp-area">
			<view class="padding flex flex-direction margin-top" v-show="sts === '2'">
				<button type="primary" plain="true" @click="closeNowWO(orderId)">关闭表单</button>
			</view>
			<view class="padding flex flex-direction margin-top" v-show="sts === '3' || sts === '4'">
				<button type="primary" disabled="true" plain="true">表单已关闭</button>
			</view>
		</view>
		
	</view>
</template>

<script>
import Api from '../../api/wo';
	export default{
		onLoad:function(option){
			Api.getWOInfo(option.orderId).then(res=>{
				console.log(res)
				this.orderId=option.orderId
				this.person=res.data.person
				this.phone=res.data.phone
				this.br=res.data.br
				this.fault=res.data.fault
				this.machine=res.data.machine
				this.sts=res.data.wosts
			})
		},
		data() {
			return {
				orderId: '',
				person: '',
				phone: '',
				fault: '',
				machine: '',
				br: '',
				sts: '',
			};
		},
		methods: {
			closeNowWO(orderId){
				uni.showLoading({
				    title: '关闭中',	
				})
				Api.closeWO(orderId).then(res => {
					uni.hideLoading()
					uni.showToast({
						icon:'success',
						mask:true,
						title: '关闭工单成功',
						duration: 1000
					})
					setTimeout(function(){
						uni.reLaunch({
							url: '/pages/engineer/engineer'
						})
					},1000)
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