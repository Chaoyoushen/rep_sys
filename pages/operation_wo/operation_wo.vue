<template>
	<view>
		<form>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>操作信息</text>
				</view>
			</view>
			<view class="cu-form-group">
			 <view class="title">操作号</view>
			 <view>
			  <text>{{operationId}}</text>
			 </view>
			</view>
			<view class="cu-form-group">
			 <view class="title">操作人</view>
			 <view>
			  <text>{{person}}</text>
			 </view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>描述</text>
				</view>
			</view>
			<view class="cu-form-group bg-white">
				<text>{{operationInfo}}</text>
			</view>
		</form>
	</view>
</template>

<script>
import Api from '../../api/wo';
	export default {
		onLoad:function(option){
			Api.getOPInfo(option.operationId).then(res=>{
				console.log(res)
				this.person=res.data.person
				this.operationId=option.operationId
				this.operationInfo=res.data.operationInfo
				
			})
		},
		data() {
			return {
				person: '',
				operationId: '',
				operationInfo: '',
			};
		},
		methods: {

		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
