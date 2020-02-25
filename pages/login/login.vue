<template>
	<view>
		<form @submit="login">
			<view class="flex padding justify-center">
				<view class="cu-bar margin-top">
					<view class="title">BNLD登录</view>
				</view>
			</view>
			<view class="margin-top">
				<view class="cu-form-group">
					<view class="title">工号</view>
					<input placeholder="例:05123" name="workNo" v-model="loginForm.workNo" type="number"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input password="true" name="password" v-model="loginForm.password" type="number"></input>
				</view>
			</view>
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-gradual-blue lg" form-type="submit">登录</button>
			</view>
		</form>
	</view>
</template>

<script>
import Api from '../../api/user';
	
 export default {
        data() {
            return {
				loginForm: {  
				    workNo: "05370",  
				    password: "123456",  
				}, 
            }
        },
        methods: {
            login: function(e) {
				uni.showLoading({
				    title: '登录中',	
				})
				Api.login(e.detail.value)
				.then(res => {
					uni.hideLoading()
					if(res.code==200){
						uni.setStorageSync('token', res.data.token);
						if(res.data.role=="0"){
							uni.showToast({
								icon:'success',
								mask:true,
								title: '登录成功',
								duration: 1000,
								success:function(){
									uni.switchTab({
										url: '/pages/info/info'
									});
								}
							})
						}else if(res.data.role=="1"){
							uni.showToast({
								icon:'success',
								mask:true,
								title: '工程师',
								duration: 1000,
								success:function(){
									uni.reLaunch({
										url: '/pages/engineer/engineer'
									})
								}
							})
						}else{
							uni.showToast({
								icon:'success',
								mask:true,
								title: '管理员',
								duration: 2000
							})
						}
					}
				})
            }
        }
    }
</script>

<style>

</style>