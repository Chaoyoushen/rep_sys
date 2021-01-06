<template>
<view>
	<view class="cu-list menu" v-for="item in WOList" :key="item.id" >
			<view class="cu-item"  @click="WashDetail(item)">
				<view class="content padding-tb-sm">
					<view>
						<text class="margin-right-xs text-cut">{{item.person}}</text>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{getDate(item.createdDate)}}</view>
					<view :class="tagList[parseInt(item.sts)-1]">{{tagInfoList[parseInt(item.sts)-1]}}</view>
				</view>
			</view>
	</view>
</view>
</template>

<script>
	import Api from '../../api/wp.js';
	export default {
		
		onShow:function(){
			uni.showLoading({
			    title: '加载中'
			});
			Api.hisWash().then(res => {
					this.WOList = res.data
					uni.hideLoading()
				})
		},
		data() {
			return {
			WOList: [],
			tagList: ["cu-tag round bg-orange light", "cu-tag round bg-blue light", "cu-tag round bg-green light",
				"cu-tag round bg-red light","cu-tag round bg-grey light"
			],
			tagInfoList: ['已提交', '处理中', '已完成', '已撤销','已关闭'],
			}
		},
		methods: {
			getDate(e){
				var date = new Date(parseInt(e));
				var YY = date.getFullYear()
				var MM = date.getMonth() + 1
				var DD = date.getDate()
				return YY+"年"+MM+"月"+DD+"日"
			},
			WashDetail(item){
				console.log(item)
				uni.navigateTo({
					url:'../wash_detail/wash_detail?id='+item.id+'&sts='+item.sts
				})
			}
			
		}
	}
</script>

<style>

</style>
