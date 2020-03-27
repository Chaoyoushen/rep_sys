<template>
	<view>
		<form>
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>联系方式</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">联系人</view>
				<text>{{person}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">电话号码</view>
				<text>{{phone}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">归属网点</view>
				<text>{{br}}</text>
			</view>
			<view class="cu-form-group bg-white margin-top">
				<view class="title">故障分类</view>
					<text>{{fault}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">设备类型</view>
					<text>{{machine}}</text>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>故障描述</text>
				</view>
			</view>
			<view class="cu-form-group bg-white">
				<text>{{description}}</text>
			</view>
		  <view class="cu-bar bg-white margin-top">
		   <view class="action">
			<text class="cuIcon-title text-green"></text>
			<text>工单图片</text>
		   </view>
		  </view>
		  <view class="image-list cu-form-group bg-white">
			  <view class="image-item" v-for="(item,index) in images" :key="index">
				  <view class="image-content">
					  <image style="width: 180rpx; height: 200rpx;" mode="aspectFit" :src="item" @click="onImageTouch(index)"></image>
				  </view>
			  </view>
		  </view>

		</form>
	</view>
</template>

<script>
import Api from '../../api/wo';
	export default {
		onLoad:function(option){
			Api.getWOInfo(option.orderId).then(res=>{
				console.log(res)
				this.person=res.data.person
				this.phone=res.data.phone
				this.br=res.data.br
				this.fault=res.data.fault
				this.machine=res.data.machine
				this.description=res.data.description
				const tmp = res.data.images.split(';')
					if (tmp[0] !== '') {
					  const urls = []
					  for (const index in tmp) {
						const url = tmp[index]
						urls.push(url)
					  }
					  this.images = urls;
				   }
			})
		},
		data() {
			return {
				images: [],
				person: '',
				phone: '',
				fault: '',
				machine: '',
				br: '',
				description: ''
			};
		},
		methods: {
			onImageTouch(index){
				uni.previewImage({
					current:index,
					urls:this.images
				})
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
