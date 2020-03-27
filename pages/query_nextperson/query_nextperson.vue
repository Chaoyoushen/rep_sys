<template>
<view>
	<view class="cu-form-group">
		<view class="title">查询</view>
		<input @input="setQuery" style="text-align:right"></input>
	</view>
	<view class="padding flex flex-direction margin-top">
		<button class="cu-btn bg-gradual-blue lg" @click="queryPerson()">提交</button>
	</view>
	<view class="cu-list menu" v-for="item in WOList" :key="item.nextPersonId">
		<view class="cu-item">
			<view class="content padding-tb-sm">
				<view>
					<text class="margin-right-xs text-cut">{{item.nextPersonOrg}}</text>
				</view>
				<view class="text-gray text-sm">
					<text class="margin-right-xs text-cut" maxlength="10">{{item.nextPersonName}}</text>
				</view>
			</view>
			<view class="action">
				<button class="cu-btn round bg-green shadow" @click="changeAcceptPerson(item.nextPersonId)">
				<text class="cuIcon-upload"></text>转单</button>
			</view>
		</view>
	</view>
</view>
</template>

<script>
	import Api from '../../api/wo';
	export default {
		onLoad:function(option){
			    this.orderId = option.orderId
		},
		data() {
			return {
			WOList: [],
			query: '',
			nextPersonId: '',
			}
		},
		methods: {
			setQuery(e){
				this.query = e.detail.value
			},
			queryPerson(){
				if(this.query==''){
					uni.showToast({
						title: '请输入',
						icon: 'none'
					})
				return
				}
				console.log(this.query)
				uni.showLoading({
				    title: '提交中',	
				})
				Api.queryNextPerson(this.query).then(res =>{
					console.log(res)
					this.WOList = res.data
					uni.hideLoading()
					if(res.code==200){
						uni.showModal({
							title:"查询成功",
							content:"你已完成查询",
							showCancel:false,
							confirmText:"完成",
						})
					}else{
						wx.showToast({
							icon:'none',
							title: '提交失败',
							mask:true,
							duration: 2000
						})
					}
			
				})
			},
			changeAcceptPerson(nextPersonId){
			    let data = {
					orderId: this.orderId,
					nextPersonId: nextPersonId,
				}
				console.log(data)
			    uni.showLoading({
					title: '提交中', 
			    })
			    Api.changeWOAcceptPerson(data).then(res =>{
			        uni.hideLoading()
				    if(res.code==200){
						uni.showModal({
							title:"转单成功",
							content:"你已完成转单！",
							showCancel:false,
							confirmText:"完成",
						success:function(){
							uni.hideLoading()
							uni.reLaunch({
							 url:'/pages/engineer/engineer'
							})
						}
			        })
					}else{
						wx.showToast({
						icon:'none',
						title: '提交失败',
						mask:true,
						duration: 2000
						})
					}
				})
			},
	    }
	}
</script>

<style>

</style>

