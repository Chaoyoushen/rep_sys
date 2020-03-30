<template>
	<view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>请确认故障分类和设备类型</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">故障分类</view>
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
					{{multiIndex[0]==5?multiArray[0][multiIndex[0]].label:multiArray[1][multiIndex[1]].label}}
				</view>
			</picker>
		</view>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>修改理由</text>
			</view>
		</view>

		<view class="cu-form-group">
			<textarea maxlength="-1" @input="setOperationInfo" placeholder="处理意见"></textarea>
		</view>
		<view class="padding flex flex-direction align-center">
			<button class="cu-btn bg-gradual-blue lg" @click="upOperation">上传</button>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/wo';
	export default {
		onLoad: function(option) {
			Api.initWO().then(res => {
				this.bkName = res.data.org
				this.orderId = option.orderId
				console.log(res.data)
				this.machinePickerArray = res.data.machinePicker
				this.faultPickerArray = res.data.faultPicker
				this.multiArray[0] = res.data.machinePicker
				this.multiArray[1] = res.data.machinePicker[0].children
				this.machineId = this.multiArray[1][0].value
				this.orgId = res.data.orgId
				uni.hideLoading()
			})
		},
		data() {
			return {
				orderId: '',
				person: '',
				phone: '',
				fault: '',
				machine: '',
				br: '',
				sts: '',
				operationInfo: '',
				images: [],
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
				orgId: ''
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
			MultiChange(e) {
				this.multiIndex = e.detail.value
				if (this.multiArray[0][this.multiIndex[0]].value == '99999') {
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
				if (data.multiIndex[0] == 5) {
					data.multiArray[1] = []
					this.multiIndex.splice(1, 0)
				}
				for (let i = 0; i < len; i++) {
					if (data.multiIndex[0] == i) {
						data.multiArray[1] = data.multiArray[0][i].children
						this.multiIndex.splice(1, 0)
						break
					}
				}
				this.multiArray = data.multiArray
				this.multiIndex = data.multiIndex
			},
			setOperationInfo(e) {
				this.operationInfo = e.detail.value
			},
			upOperation() {
				let data = {
					orderId: this.orderId,
					operationInfo: this.operationInfo,
					machineId: this.machineId,
					faultId: this.faultId,
					sts: '3',
				}
				console.log(data)
				if (data.operationInfo == '') {
					uni.showToast({
						title: '请输入理由',
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

				uni.showLoading({
					title: '提交中',
				})
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
