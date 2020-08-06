<template>
	<view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>洗衣数量</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">西装上装</view>
				<text>{{xzsz}}</text>
		</view>
		<view class="cu-form-group">
			<view class="title">西装下装</view>
				<text>{{xzxz}}</text>
		</view>
		<view class="cu-form-group">
			<view class="title">衬衣</view>
				<text>{{cy}}</text>
		</view>
		<view class="cu-form-group">
			<view class="title">西背</view>
				<text>{{xb}}</text>
		</view>
		<view class="cu-form-group">
			<view class="title">丝巾</view>
				<text>{{sj}}</text>
		</view>
		<view class="cu-form-group">
			<view class="title">领带</view>
				<text>{{ld}}</text>
		</view>
		<view class="cu-form-group">
			<view class="title">大衣</view>
				<text>{{dy}}</text>
		</view>
		<view class="cu-form-group">
			<view class="title">其他</view>
				<text>{{qt}}</text>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>金额</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">金额</view>
				<text>{{totalcount}}</text>
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn bg-gradual-blue lg" @click="Cancel">撤销订单</button>
		</view>

	</view>
</template>

<script>
	import Api from '../../api/wp.js';

	export default {
		onLoad:function(option){
			Api.washHisDetail(option.id).then(res=>{
				console.log(res)
				this.xzsz= res.data.xzsz
				this.xzxz = res.data.xzxz
				this.cy=res.data.cy
				this.xb=res.data.xb
				this.sj=res.data.sj
				this.ld=res.data.ld
				this.dy=res.data.dy
				this.qt=res.data.qt
				this.totalcount=res.data.totalcount
				this.id=res.data.id
					
			})
		},
		data() {
			return {
				xzsz: '0',
				xzxz: '0',
				cy: '0',
				xb: '0',
				sj: '0',	
				ld:'0',
				dy: '0',
				qt: '0',	
				totalcount:'0',
				id:'',
						
			}
		},
		methods: {
			Cancel(){	
				console.log(this.id)
				Api.CancelWash(this.id).then(res=>{
					uni.showModal({
						title: "撤销成功",
					success: function() {
						uni.hideLoading()
						uni.navigateBack({
							url: '/pages/wash_his/wash_his'
						})
					}
						})
					
				})
			}
				
		}
	}
</script>

<style>

</style>
