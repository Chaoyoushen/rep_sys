<template>
	<view>
		<form>
			<view v-if="wosts!=='1'">
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						<text class="cuIcon-title text-green"></text>
						<text>工程师</text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<text>{{acctPerson}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<text @longtap="makeCall">{{acctPhone}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
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
				<text class="detail_text">{{description}}</text>
			</view>
			<view v-if="images.length>0">
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						<text class="cuIcon-title text-green"></text>
						<text>工单图片</text>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in images" :key="index" @tap="onImageTouch(index)">
							<image :src="item" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			<view v-show="wosts == '3'">
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						<text class="cuIcon-title text-green"></text>
						<text>工单评价</text>
					</view>
				</view>
				<view class="padding flex flex-direction bg-white">
					<view class="cu-form-group">
					<view class="title">满意度</view>
					<uni-rate :value="rate" @change="rateChange"></uni-rate>
					</view>
					<view class="cu-form-group" v-if="rate!==5&&rate!==4">
						<textarea maxlength="-1" @input="setPointDiscuss" placeholder="请留下您的宝贵意见以便我们更好的进步"></textarea>
					</view>
				</view>
				<view class="padding flex flex-direction margin-top">
					<button class="cu-btn bg-gradual-blue lg" @click="point" :disabled="isDisable">评价并关单</button>
				</view>
			</view>

			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-gradual-blue lg" @click="flowDetail()">流程跟踪</button>
			</view>


		</form>
	</view>
</template>

<script>
import Api from '../../api/wo';
import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {uniRate},
		onLoad:function(option){
			Api.getWOInfo(option.orderId).then(res=>{
				console.log(res)
				this.acctPerson = res.data.acctPerson
				this.acctPhone = res.data.acctPhone
				this.person=res.data.person
				this.phone=res.data.phone
				this.br=res.data.br
				this.fault=res.data.fault
				this.machine=res.data.machine
				this.description=res.data.description
				this.wosts = res.data.wosts
				this.woid = res.data.woid
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
		watch: { 
			value(newValue,oldValue) {
				this.valueSync = newValue; 
			} 
		},
		data() {
			return {
				images: [],
				person: '',
				phone: '',
				fault: '',
				machine: '',
				br: '',
				description: '',
				wosts: '',
				woid: '',
				suggestion: '',
				rate: 5,
				isDisable: false,
				acctPerson: '',
				acctPhone: ''
			};
		},
		methods: {
			onImageTouch(index){
				uni.previewImage({
					current:index,
					urls:this.images
				})
			},
			flowDetail(){
				uni.navigateTo({
					url: '/pages/operation_his/operation_his?orderId=' + this.woid
				})
			},
			makeCall(){
				if(this.acctPhone!=null&&this.acctPhone.length>7){
					uni.makePhoneCall({
						phoneNumber:this.acctPhone
					})
				}
			},
			point(){
				if(this.rate!==5&&this.rate!==4&&this.suggestion===''){
					uni.showToast({
						icon:"none",
						title:"请留下您宝贵的建议",
					})
				}else{
					const data = {
						rate: this.rate,
						suggestion: this.suggestion,
						orderId:this.woid
					}
					this.isDisable = true
					Api.rateWO(data).then(()=>{
						uni.showModal({
							content:"感谢您的评价",
							title:"关单成功",
							showCancel:false,
							success: () => {
								uni.switchTab({
									url:"../his_wo/his_wo"
								})
							}
						})
					})
				}
			},
			rateChange(e){
				this.rate = e.value
			},
			setPointDiscuss(e){
				this.suggestion = e.detail.value
			}
		},

	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	
	.detail_text{
	  display: -webkit-box;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  word-break: break-all;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 100;
	}
</style>
