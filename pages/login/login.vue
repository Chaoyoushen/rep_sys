<template>
	<view>
		<form @submit="login">
			<view class="flex padding justify-center">
				<view class="cu-bar margin-top">
					<view class="title">登录</view>
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
				    workNo: "",  
				    password: "",  
				}, 
            }
        },
		onLoad() {
			if(uni.getStorageSync('token') != null){
				this.direct(uni.getStorageSync('role'))
			}
		},
        methods: {
			makeLogin(e){
				wx.login({
					timeout:5000,
					success:(res)=>{
						let data = {
							workNo: e.detail.value.workNo,
							password: e.detail.value.password,
							code: res.code
						}
						Api.login(data)
						.then(res => {
							uni.hideLoading()
							if(res.code==200){
								if(res.data.role=='2'){
									uni.showToast({
										icon:'success',
										mask:true,
										title: '管理员无权登录',
										duration: 2000,
									})
								}else{
									uni.setStorageSync('token', res.data.token);
									uni.setStorageSync('role', res.data.role);
									this.direct(res.data.role)
								}
							}
						})
					}
				})
			},
            login: function(e) {
				uni.showLoading({
				    title: '登录中',	
				})
				if(!uni.getStorageSync('token')){
					this.makeLogin(e)
				}else{
					uni.hideLoading()
					wx.checkSession({
						success:()=>{
							console.log('登录态有效')
							this.direct(uni.getStorageSync('role'))
						},
						fail: () => {
							console.log('登录态失效')
							this.makeLogin(e)
						}
					})
				}
            },
			direct(data){
				if(data== '0'){
					uni.showToast({
						icon:'success',
						mask:true,
						title: '登录成功',
						duration: 1000,
						success:function(){
							uni.switchTab({
								url: '/pages/custum_work_order/custum_work_order'
							});
						}
					})
				}else if(data=='1'||data=='3'){
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
				}
			}
        }
    }
</script>

<style>

</style>