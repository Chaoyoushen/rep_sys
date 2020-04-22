<template>
	<view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>当前工单</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">工单号</view>
			<view>
				<text>{{orderId}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>工单具体信息</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">联系人</view>
			<view>
				<text>{{person}}</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">电话号码</view>
			<view>
				<text>{{phone}}</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">归属网点</view>
			<view>
				<text>{{br}}</text>
			</view>
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
		<view class="cu-form-group">
			<view class="title">故障区域</view>
			<picker @change="PickerChange" :value="index" :range="faultPickerArray.map(x => x.label)">
				<view class="picker">
					{{index>-1?faultPickerArray[index].label:fault}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">故障分类</view>
			<picker @change="FaultPickerChange" :value="faultIndex" :range="faultTypePicker">
				<view class="picker">
					{{faultIndex>-1?faultTypePicker[faultIndex]:faultType}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">设备类型</view>
			<picker mode="multiSelector" @change="MultiChange" range-key="label" @columnchange="MultiColumnChange" :value="multiIndex"
			 :range="multiArray">
				<view class="picker">
					{{multiIndex[1]>-1?multiArray[1][multiIndex[1]].label:machine}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group" v-show="sts === '2'">
			<view class="title">转单</view>
			<picker mode="multiSelector" @change="MultiPersonChange" range-key="label" @columnchange="MultiPersonColumnChange"
			 :value="multiPersonIndex" :range="multiPersonArray">
				<view class="picker">
					{{multiPersonIndex[1]>-1?multiPersonArray[1][multiPersonIndex[1]].label:'请选择转单人'}}
				</view>
			</picker>
		</view>
		<view v-if="images.length>0">
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text>工单图片</text>
				</view>
			</view>
			<view class="image-list cu-form-group bg-white">
				<view class="image-item" v-for="(item,index) in images" :key="index">
					<view class="image-content">
						<image style="width: 180rpx; height: 200rpx;" mode="aspectFit" :src="item" @click="onImageTouch(index)"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar margin-top bg-white" v-show="sts === '2'">
			<view class="action">
				<text class="cuIcon-title text-green"></text>是否结单
			</view>
			<view class="action">
				<text class="text-df margin-right-sm">结单</text>
				<switch @change="SetComplete" :class="shadow?'checked':''" color="#39B54A"></switch>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top" v-show="sts === '3'">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>结单意见</text>
			</view>
		</view>
		<view class="cu-form-group" v-show="sts === '3'">
			<textarea maxlength="-1" @input="setOperationInfo" placeholder="结单意见"></textarea>
		</view>
		<view class="cu-form-group" v-show="sts === '2'">
			<textarea maxlength="-1" @input="setOperationInfo" placeholder="处理意见"></textarea>
		</view>
		<view class="padding flex flex-direction align-center" v-show="sts === '2'||sts === '3'">
			<button class="cu-btn bg-gradual-blue lg" @click="upOperation" :disabled="isDisable">提交</button>
		</view>
		<view class="padding flex flex-direction align-center">
			<button class="cu-btn bg-gradual-blue lg" @click="goWODetail(orderId)">流程跟踪</button>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/wo';
	export default {
		onLoad: function(option) {
			uni.showLoading({
				title: '加载中'
			})
			Api.getWOInfo(option.orderId).then(res => {
				this.orderId = option.orderId
				this.person = res.data.person
				this.phone = res.data.phone
				this.br = res.data.br
				this.fault = res.data.fault
				this.description = res.data.description
				this.machine = res.data.machine
				this.sts = res.data.wosts
				this.faultId = res.data.faultId
				this.faultType = res.data.faultType
				this.machineId = res.data.machineId
				if (res.data.faultType.length == 0) {
					this.faultType = '请选择故障类型'
				}
				const tmp = res.data.images.split(';')
				if (tmp[0] !== '') {
					const urls = []
					for (const index in tmp) {
						const url = tmp[index]
						urls.push(url)
					}
					this.images = urls;
				}
			}).then(
				Api.initWO().then(res => {
					this.machinePickerArray = res.data.machinePicker
					this.faultPickerArray = res.data.faultPicker
					this.multiArray[0] = res.data.machinePicker
					this.multiArray[1] = res.data.machinePicker[0].children
				})
			).then(
				Api.initChangePerson().then(res => {
					this.personPickerArray = res.data.personPicker
					this.multiPersonArray[0] = res.data.personPicker
					this.multiPersonArray[1] = res.data.personPicker[0].children
					uni.hideLoading()
				})
			)
		},
		data() {
			return {
				orderId: '',
				person: '',
				phone: '',
				faultTypePicker: ["网络问题", "操作系统及驱动问题", "设备硬件问题", "应用软件问题", "使用操作问题"],
				fault: '',
				machine: '',
				faultType: '',
				br: '',
				sts: '',
				operationInfo: '',
				images: [],
				index: -1,
				faultIndex: -1,
				imgList: [],
				bkName: '',
				multiArray: [],
				multiPersonArray: [],
				multiIndex: [0, -1],
				multiPersonIndex: [0, -1],
				machinePickerArray: [],
				faultPickerArray: [],
				personPickerArray: [],
				flag: false,
				machineId: '',
				faultId: '',
				description: '',
				orgId: '',
				personId: '',
				nextPersonId: '',
				complete: false,
				isDisable: false
			};
		},
		methods: {
			PickerChange(e) {
				if (e.detail.value === -1) {
					this.index = 0
				} else {
					this.index = e.detail.value
				}
				this.faultId = this.faultPickerArray[this.index].value
			},
			FaultPickerChange(e) {
				if (e.detail.value === -1) {
					this.faultIndex = 0
				} else {
					this.faultIndex = e.detail.value
				}
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
				if (this.multiArray[0][this.multiIndex[0]].children.length === 0) {
					this.machineId = this.multiArray[0][this.multiIndex[0]].value
				} else {
					this.machineId = this.multiArray[1][this.multiIndex[1]].value
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
			MultiPersonChange(e) {
				this.multiPersonIndex = e.detail.value
				this.personId = this.multiPersonArray[1][this.multiPersonIndex[1]].value
			},
			MultiPersonColumnChange(e) {
				let data = {
					multiPersonArray: this.multiPersonArray,
					multiPersonIndex: this.multiPersonIndex
				};
				let len = data.multiPersonArray[0].length
				console.log('len:' + len)
				data.multiPersonIndex[e.detail.column] = e.detail.value
				data.multiPersonArray[1] = data.multiPersonArray[0][data.multiPersonIndex[0]].children
				this.multiPersonIndex.splice(1, 0)
				this.multiPersonArray = data.multiPersonArray
				this.multiPersonIndex = data.multiPersonIndex
			},
			setOperationInfo(e) {
				this.operationInfo = e.detail.value
			},
			SetComplete(e) {
				this.complete = e.detail.value
			},
			onImageTouch(index) {
				uni.previewImage({
					current: index,
					urls: this.images
				})
			},
			upOperation() {
				let data = {
					orderId: this.orderId,
					person: this.person,
					operationInfo: this.operationInfo,
					machineId: this.machineId,
					faultId: this.faultId,
					sts: this.sts,
					complete: this.complete,
					nextPersonId: this.personId,
					faultType: this.faultIndex,
				}
				console.log(data)
				if (data.operationInfo == '') {
					uni.showToast({
						title: '请填写意见',
						icon: 'none'
					})
					return
				}
				if (data.complete == true) {
					if (data.nextPersonId != '') {
						uni.showToast({
							title: '请勿同时转单交单',
							icon: 'none',
						})
						return
					}
				}
				if (this.faultIndex == -1 && this.faultType == '请选择故障类型') {
					uni.showToast({
						title: '请选择故障类型',
						icon: 'none'
					})
					return
				}
				if (data.faultType == -1) {
					data.faultType = null
				}
				this.isDisable = true
				uni.showLoading({
					title: '提交中',
				})
				if (data.complete == false) {
					Api.uploadOperation(data).then(res => {
						uni.hideLoading()
						if (res.code == 200) {
							uni.showModal({
								title: "提交成功",
								content: "你已完成提交！",
								showCancel: false,
								confirmText: "完成",
								success: function() {
									uni.hideLoading()
									uni.reLaunch({
										url: '/pages/engineer/engineer'
									})
								}
							})
						} else {
							wx.showToast({
								icon: 'none',
								title: '提交失败',
								mask: true,
								duration: 2000
							})
						}
					})
				}
				if (data.complete == true) {
					Api.completeWO(data).then(res => {
						uni.hideLoading()
						if (res.code == 200) {
							uni.showModal({
								title: "提交成功",
								content: "你已完成提交！",
								showCancel: false,
								confirmText: "完成",
								success: function() {
									uni.hideLoading()
									uni.reLaunch({
										url: '/pages/engineer/engineer'
									})
								}
							})
						} else {
							wx.showToast({
								icon: 'none',
								title: '提交失败',
								mask: true,
								duration: 2000
							})
						}
					})
				}
			},
			goWODetail(orderId) {
				uni.navigateTo({
					url: '/pages/operation_his/operation_his?orderId=' + orderId
				})
			},

		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	button {
		width: 90%;
	}
</style>
