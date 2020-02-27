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
  <view class="cu-form-group bg-white margin-top">
   <view class="title">故障分类</view>
   <view>
    <text>{{fault}}</text>
   </view>
  </view>
  <view class="cu-form-group">
   <view class="title">设备类型</view>
   <view>
    <text>{{machine}}</text>
   </view>
  </view>
  <view class="cu-bar bg-white margin-top" v-show="sts === '3'">
   <view class="action">
    <text class="cuIcon-title text-green"></text>
    <text>结单理由</text>
   </view>
  </view>
  <view class="cu-form-group" v-show="sts === '3'">
   <textarea maxlength="-1" @input="setOperationInfo" placeholder="结单理由"></textarea>
  </view>
  <view class="button-sp-area">
   <view class="padding flex flex-direction margin-top" v-show="sts === '3'">
    <button type="primary" plain="true" @click="upOperation">上传理由</button>
   </view>
  </view>
  <view class="button-sp-area">
   <view class="padding flex flex-direction margin-top" v-show="sts === '2'">
    <button type="primary" plain="true" @click="acceptNowWO(orderId)">接受表单</button>
   </view>
   <view class="padding flex flex-direction margin-top" v-show="sts === '4'">
    <button type="primary" disabled="true" plain="true">表单已关闭</button>
   </view>
  </view>
  <view class="button-sp-area">
   <view class="padding flex flex-direction margin-top" >
    <button type="primary" plain="true" @click="goWODetail(orderId)">查看操作</button>
   </view>
  </view>
 </view>
</template>

<script>
import Api from '../../api/wo';
 export default{
  onLoad:function(option){
   Api.getWOInfo(option.orderId).then(res=>{
    console.log(res)
    this.orderId=option.orderId
    this.person=res.data.person
    this.phone=res.data.phone
    this.br=res.data.br
    this.fault=res.data.fault
    this.machine=res.data.machine
    this.sts=res.data.wosts
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
   };
  },
  methods: {
   setOperationInfo(e){
    this.operationInfo = e.detail.value},
   upOperation(){
    let data = {
     orderId: this.orderId,
     person: this.person,
     operationInfo: this.operationInfo,
    }
    
    if(data.operationInfo==''){
     uni.showToast({
      title: '请输入理由',
      icon: 'none'
     })
     return
    }
    uni.showLoading({
        title: '提交中', 
    })
    Api.uploadOperation(data).then(res =>{

     uni.hideLoading()
     if(res.code==200){
      uni.showModal({
       title:"提交成功",
       content:"你已完成提交！",
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
   acceptNowWO(orderId){
    uni.showLoading({
        title: '接受中', 
    })
    Api.acceptWO(orderId).then(res => {
     uni.hideLoading()
     uni.showToast({
      icon:'success',
      mask:true,
      title: '接受工单成功',
      duration: 1000
     })
     setTimeout(function(){
      uni.reLaunch({
       url: '/pages/engineer/engineer'
      })
     },1000)
    })
   },
   goWODetail(){
   	uni.navigateTo({
   		url:'/pages/operation_his/operation_his'
   	})
   },
  }
 }
</script>

<style>
 .cu-form-group .title {
  min-width: calc(4em + 15px);
 }
 
 button{
  width: 90%;
 }
</style>