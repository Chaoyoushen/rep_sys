<template>
	<view>
		<form name="cusWO">
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
				<view class="title">电话号码</view>
				<input @input="setPhone" style="text-align:right" :value="phone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">归属网点</view>
				<text>{{bkName}}</text>
			</view>
			<view class="cu-form-group bg-white margin-top">
				<view class="title">故障分类</view>
				<picker @change="PickerChange" :value="index" :range="faultPickerArray.map(x => x.label)">
					<view class="picker">
						{{index>-1?faultPickerArray[index].label:'请选择分类'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">设备类型</view>
				<picker mode="multiSelector" @change="MultiChange" range-key="label" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]].children.length===0?multiArray[0][multiIndex[0]].label:multiArray[1][multiIndex[1]].label}}
					</view>
				</picker>
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
					{{imgList.length}}/4
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
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction margin-top">
				<button class="cu-btn bg-gradual-blue lg" @click="createWO">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
import Api from '../../api/wo';
	export default {
		onShow:function(){
			uni.showLoading({
			    title: '加载中'
			});
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
					uni.hideLoading()
				})
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
				machineId:'',
				faultId:'',
				description:'',
				person: '',
				phone: '',
				orgId:''
			};
		},
		methods: {
			ValidatePhone(val){
			    var isPhone = /^1[3456789]\d{9}$///手机号码
			    if(isPhone.test(val)){
			        return true;
			    }
			    else{
			        return false;
			    }
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], 
					success: (res) => {
						if (this.imgList.length != 0) {
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
				if(e.detail.value === -1){
					this.index = 0	
				}else{
					this.index = e.detail.value
				}
				this.faultId = this.faultPickerArray[this.index].value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
				if(this.multiArray[0][this.multiIndex[0]].children.length===0){
					this.machineId = this.multiArray[0][this.multiIndex[0]].value
				}else{
					this.machineId = this.multiArray[1][this.multiIndex[1]].value
				}
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				let len = data.multiArray[0].length
				console.log('len:'+len)
				data.multiIndex[e.detail.column] = e.detail.value
				if(data.multiArray[0][data.multiIndex[0]].children === null||data.multiArray[0][data.multiIndex[0]].children.length === 0){
					data.multiArray[1] = []
					this.multiIndex.splice(1, 0)
				}else{
					data.multiArray[1] = data.multiArray[0][data.multiIndex[0]].children
					this.multiIndex.splice(1, 0)
				}
				this.multiArray = data.multiArray
				this.multiIndex = data.multiIndex
			},
			setDescription(e){
				this.description = e.detail.value
			},
			setPhone(e){
				this.phone = e.detail.value
			},
			setPerson(e){
				this.person = e.detail.value
			},
			createWO(){
				let data = {
					machineId: this.machineId,
					faultId: this.faultId,
					person: this.person,
					phone: this.phone,
					description: this.description,
					orgId: this.orgId,
					imgPath:''
				}
				if(data.person==''){
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return
				}
				if(data.phone==''){
					uni.showToast({
						title: '请输入联系方式',
						icon: 'none'
					})
					return
				}
				if (this.ValidatePhone(data.phone) == false) {
				 uni.showToast({
					title: '联系电话格式错误',
					icon: 'none'
				 })
				 return
				}
				if(data.faultId==''){
					uni.showToast({
						title: '请选择故障类型',
						icon: 'none'
					})
					return
				}
				if(data.description==''){
					uni.showToast({
						title: '请输入问题描述',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
				    title: '提交中',	
				})
				Api.createWO(data,this.imgList).then(res =>{
					this.index = -1
					this.imgList = []
					this.multiIndex = [0, 0]
					this.flag = false
					this.machineId = ''
					this.faultId = ''
					this.description = ''
					this.person = ''
					this.phone = ''
					uni.hideLoading()
					if(res.code==200){
						uni.showModal({
							title:"提交成功",
							content:"你已完成报修工单的提交！",
							showCancel:false,
							confirmText:"完成",
							success:function(){
								uni.hideLoading()
								uni.reLaunch({
									url:'/pages/his_wo/his_wo'
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
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
