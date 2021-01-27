<template>
	<view>
		<form name="cusWO">
			<view class="margin-top">
				<text style="color: #ED1C24;margin-left: 20rpx;margin-right: 10rpx;">1.报修范围：支持办公及电子设备故障报修</text>
			</view>
			<view>
				<text style="color: #ED1C24;margin-left: 20rpx;margin-right: 10rpx;">2.开通网络权限、531交易报错请提交生产运维工单</text>
			</view>

			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>联系方式</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">联系人</view>
				<input @input="setPerson" style="text-align:right" :value="person"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input @input="setPhone" style="text-align:right" :value="phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">归属网点</view>
				<text>{{bkName}}</text>
			</view>
			<view class="cu-form-group bg-white margin-top">
				<view class="title">故障区域</view>
				<picker @change="PickerChange" :value="index" :range="faultPickerArray.map(x => x.label)">
					<view class="picker">
						{{index>-1?faultPickerArray[index].label:'请选择分类'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">设备类型</view>
				<picker mode="multiSelector" @change="MultiChange" range-key="label" @columnchange="MultiColumnChange" :value="multiIndex"
				 :range="multiArray">
					<view class="picker">	
						{{multiArray.length===0?'请选择':multiArray[0][multiIndex[0]].children.length===0?multiArray[0][multiIndex[0]].label:multiArray[1][multiIndex[1]].label}}
					</view>
				</picker>
			</view>
			<view v-if="visible">
				<view class="cu-form-group">
					<view class="title">工程师</view>
					<text>{{workerName}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">工程师电话</view>
					<text @longtap="makeCall">{{workerPhone}}</text>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>故障描述</text>
				</view>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" @input="setDescription" placeholder="故障描述"></textarea>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>图片上传</text>
				</view>
				<view class="action">
					{{imgList.length}}/2
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
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<2">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-gradual-blue lg" @tap="createWO" :disabled="isDisable">提交</button>
			</view>
		</form>
		<uni-popup ref="showImage" :mask-click="false" @change="change">
			<view class="uni-image">
				<image class="image" src="/static/popup.png" mode="scaleToFill" @click="imageBtn" />
				<view class="uni-image-close" @click="cancel('Image')">
					<uni-icons type="clear" color="#fff" size="30" />
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Api from '../../api/wo';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	export default {
		components: {
			uniPopup,
			uniIcons
		},
		onLoad: function() {
			uni.showLoading({
				title: '加载中'
			});
			
			/* this.$nextTick(() => {
				this.$refs['showImage'].open();
			}); */
			
			Api.initWO().then(res => {
				this.bkName = res.data.org
				console.log(res.data)
				this.machinePickerArray = res.data.machinePicker
				this.faultPickerArray = res.data.faultPicker
				this.multiArray[0] = res.data.machinePicker
				this.multiArray[1] = res.data.machinePicker[0].children
				this.machineId = this.multiArray[1][0].value
				this.orgId = res.data.orgId
				this.person = res.data.person
				this.phone = res.data.phone
				this.tmplIds.push(res.data.tmpId)
				uni.hideLoading()
				this.$nextTick(() => {
					this.$refs['showImage'].open();
				})
				if(res.data.flag==="1"){
					uni.showModal({
						title: "温馨提示",
						content: "您存在未评价工单，完成评价后才可以提新的工单！",
						showCancel: false,
						confirmText: "去评价",
						success: function() {
							uni.hideLoading()
							uni.reLaunch({
								url: '/pages/his_wo/his_wo'
							})
						}
					})
				}
			});
			
			/* uni.showModal({
				title:"发现报修系统年度账单",
				content:"是否前往查看？",
				showCancel:true,
				cancelText:'取消',
				confirmText:"前往",
				confirmColor:'#f55850',
				cancelColor:'#39B54A',
				success:(res)=>{
					if(res.confirm){
						uni.reLaunch({
							url:'/pages/order_report/order_report'
						})
					}
				}
			}); */
		},
		onShow:function(){
			uni.showLoading({
			    title: '加载中'
			});
			/* this.$refs['showImage'].open(); */
			if(uni.getStorageSync('refresh_flag') === '1'){
				Api.initWO().then(res => {
						this.bkName = res.data.org
						console.log(res.data)
						this.machinePickerArray = res.data.machinePicker
						this.faultPickerArray = res.data.faultPicker
						this.multiArray[0] = res.data.machinePicker
						this.multiArray[1] = res.data.machinePicker[0].children
						this.machineId = this.multiArray[1][0].value
						this.orgId = res.data.orgId
						this.person = res.data.person
						this.phone = res.data.phone
						this.tmplIds.push(res.data.tmpId)
						uni.setStorageSync('refresh_flag','0')
						uni.hideLoading()
					})
			}else{
				uni.hideLoading()
			}
		},
		data() {
			return {
				index: -1,
				imgList: [],
				bkName: '',
				multiArray: [],
				multiIndex: [0, 0],
				machinePickerArray: [],
				faultPickerArray: [],
				flag: false,
				machineId: '',
				faultId: '',
				description: '',
				person: '',
				phone: '',
				orgId: '',
				isDisable: false,
				tmplIds: [],
				workerName: '',
				workerPhone: '',
				visible: false
			};
		},
		methods: {
			cancel(type) {
				this.$refs['show' + type].close()
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			imageBtn(){
				uni.navigateTo({
					url:'/pages/order_report/order_report'
				})
			},
			ValidatePhone(val) {
				var isPhone = /^1[3456789]\d{9}$/ //手机号码
				if (isPhone.test(val)) {
					return true;
				} else {
					return false;
				}
			},
			ChooseImage() {
				let count = 2
				if(this.imgList.length!=0){
					count = count - this.imgList.length
				}
				uni.chooseImage({
					count: count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'],
					success: (res) => {
						if (this.imgList.length != 0) {
							if(res.tempFilePaths)
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除确认',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			PickerChange(e) {
				if (e.detail.value === -1) {
					this.index = 0
				} else {
					this.index = e.detail.value
				}
				this.faultId = this.faultPickerArray[this.index].value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
				if (this.multiArray[0][this.multiIndex[0]].children.length === 0) {
					this.machineId = this.multiArray[0][this.multiIndex[0]].value
					this.visible = false
				} else {
					this.machineId = this.multiArray[1][this.multiIndex[1]].value
					if(this.multiArray[1][this.multiIndex[1]].person !== null&&this.multiArray[1][this.multiIndex[1]].person !== null){
						this.workerName = this.multiArray[1][this.multiIndex[1]].person
						this.workerPhone = this.multiArray[1][this.multiIndex[1]].phone
						this.visible = true
					}else{
						this.visible = false
					}
				}
			},
			makeCall(){
				if(this.workerPhone!=null&&this.workerPhone.length>7){
					uni.makePhoneCall({
						phoneNumber:this.workerPhone
					})
				}
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				let len = data.multiArray[0].length
				console.log('len:' + len)
				data.multiIndex[e.detail.column] = e.detail.value
				if(e.detail.column === 0){
					data.multiIndex[1] = 0
				}
				if (data.multiArray[0][data.multiIndex[0]].children === null || data.multiArray[0][data.multiIndex[0]].children.length ===
					0) {
					data.multiArray[1] = []
					this.multiIndex.splice(1, 0)
				} else {
					data.multiArray[1] = data.multiArray[0][data.multiIndex[0]].children
					this.multiIndex.splice(1, 0)
				}
				this.multiArray = data.multiArray
				this.multiIndex = data.multiIndex
			},
			setDescription(e) {
				this.description = e.detail.value
			},
			setPhone(e) {
				this.phone = e.detail.value
			},
			setPerson(e) {
				this.person = e.detail.value
			},
			createWO() {
				const that = this
				let data = {
					machineId: this.machineId,
					faultId: this.faultId,
					person: this.person,
					phone: this.phone,
					description: this.description,
					orgId: this.orgId,
					imgPath: ''
				}
				if (data.person == '') {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return
				}
				if (data.phone == '') {
					uni.showToast({
						title: '请输入联系方式',
						icon: 'none'
					})
					return
				}
				if (this.ValidatePhone(data.phone) == false) {
					uni.showToast({
						title: '联系电话格式错误，请输入11位手机号',
						icon: 'none'
					})
					return
				}
				if (data.faultId == '') {
					uni.showToast({
						title: '请选择故障类型',
						icon: 'none'
					})
					return
				}
				if (data.description == '') {
					uni.showToast({
						title: '请输入问题描述',
						icon: 'none'
					})
					return
				}
				this.isDisable = true
				uni.showLoading({
					title: '提交中',
				})
				wx.requestSubscribeMessage({
					tmplIds: that.tmplIds,
					complete(){
						Api.createWO(data, that.imgList).then(res => {
							uni.hideLoading()
							if (res.code == 200) {
								that.index = -1
								that.imgList = []
								that.multiIndex = [0, 0]
								that.flag = false
								that.machineId = ''
								that.faultId = ''
								that.description = ''
								that.person = ''
								that.phone = ''
								uni.showModal({
									title: "提交成功",
									content: "你已完成报修工单的提交！",
									showCancel: false,
									confirmText: "完成",
									success: function() {
										uni.hideLoading()
										uni.reLaunch({
											url: '/pages/his_wo/his_wo'
										})
									}
								})
							}else if (res.code===501&&res.data===6005){
								uni.showModal({
									title: "提交失败",
									content: "你还存在未评价工单！",
									showCancel: false,
									confirmText: "去评价",
									success: function() {
										uni.hideLoading()
										uni.reLaunch({
											url: '/pages/his_wo/his_wo'
										})
									}
								})
							}else {
								wx.showToast({
									icon: 'none',
									title: '提交失败',
									mask: true,
									duration: 2000
								})
							}
						})

					}
				})


			}

		}
	}
</script>

<style>
	.uni-image {
		/* position: relative; */
	}
	.image {
		width: 350px;
		height: 350px;
	}
	.uni-image-close {
		margin-top: 0px;
		text-align: center;
	}
	
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
