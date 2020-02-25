<template>
	<view>
		<view class="cu-bar">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>机构信息</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">归属网点</view>
			<text>{{bkName}}</text>
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-gradual-blue lg" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/user';
	

	export default {

		onLoad:function(){
			Api.getUserInfo().then(res => {
					console.log(res)
					this.bkName = res.data.name;
				})
		},
		data() {
			return {
				bkName: '',
			};
		},
		methods: {
			logout(){
				Api.logout().then(()=>{
					uni.reLaunch({
						url: '../login/login'
					})
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
