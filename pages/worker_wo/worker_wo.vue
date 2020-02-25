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
<!-- 			<view class="cu-bar bg-white margin-top">
				<view class="cu-bar bg-white">
					<view class="action">
						<text class="cuIcon-title text-green"></text>
						<text>图片上传</text>
					</view>
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view> -->

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
			})
		},
		data() {
			return {
				person: '',
				phone: '',
				fault: '',
				machine: '',
				br: '',
				description: ''
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
