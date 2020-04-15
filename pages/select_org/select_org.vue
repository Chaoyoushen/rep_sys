<template>
	<view>
		<view class="cu-bar bg-white search fixed">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入网点名称" confirm-type="done" @input="search"></input>
			</view>
		</view>
		<scroll-view scroll-y class="margin-top fixed">
			<view class="cu-list menu" v-for="item in orgList" :key="item.orgId">
				<view class="cu-item" @click="setStorage(item.orgId,item.orgName)">
					<view class="content padding-tb-sm">
						<view>
							<text class="margin-right-xs text-cut">{{item.orgName}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Api from '../../api/user';
	export default {
		data(){
			return {
				orgList: []
			}
		},
		methods:{
			search(e){
				if(e.detail.value===''||e.detail.value===null){
					return
				}
				Api.searchOrg(e.detail.value).then(res =>{
					this.orgList = res.data
					console.log(this.orgList)
				})

			},
			setStorage(orgId,orgName){
				uni.setStorageSync('orgId',orgId)
				uni.setStorageSync('orgName',orgName)
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	page {
		padding-top: 75upx;
	}
</style>
