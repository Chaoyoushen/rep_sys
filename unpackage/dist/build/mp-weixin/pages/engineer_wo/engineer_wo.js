(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/engineer_wo/engineer_wo"],{5548:function(n,e,t){"use strict";t.r(e);var o=t("ce8e"),a=t("a903");for(var i in a)"default"!==i&&function(n){t.d(e,n,function(){return a[n]})}(i);t("ac94");var r,u=t("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=c.exports},"843d":function(n,e,t){"use strict";(function(n){t("42e8"),t("921b");o(t("66fd"));var e=o(t("5548"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},a903:function(n,e,t){"use strict";t.r(e);var o=t("cb72"),a=t.n(o);for(var i in o)"default"!==i&&function(n){t.d(e,n,function(){return o[n]})}(i);e["default"]=a.a},ac94:function(n,e,t){"use strict";var o=t("e675"),a=t.n(o);a.a},cb72:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(t("8965"));function a(n){return n&&n.__esModule?n:{default:n}}var i={onLoad:function(n){var e=this;o.default.getWOInfo(n.orderId).then(function(t){console.log(t),e.orderId=n.orderId,e.person=t.data.person,e.phone=t.data.phone,e.br=t.data.br,e.fault=t.data.fault,e.machine=t.data.machine,e.sts=t.data.wosts})},data:function(){return{orderId:"",person:"",phone:"",fault:"",machine:"",br:"",sts:""}},methods:{setOperationInfo:function(n){this.operationInfo=n.detail.value},upOperation:function(){var e={orderId:this.orderId,person:this.person,operationInfo:this.operationInfo};""!=e.operationInfo?(n.showLoading({title:"提交中"}),o.default.uploadOperation(e).then(function(e){n.hideLoading(),200==e.code?n.showModal({title:"提交成功",content:"你已完成提交！",showCancel:!1,confirmText:"完成",success:function(){n.hideLoading(),n.reLaunch({url:"/pages/engineer/engineer"})}}):wx.showToast({icon:"none",title:"提交失败",mask:!0,duration:2e3})})):n.showToast({title:"请输入理由",icon:"none"})},acceptNowWO:function(e){n.showLoading({title:"接受中"}),o.default.acceptWO(e).then(function(e){n.hideLoading(),n.showToast({icon:"success",mask:!0,title:"接受工单成功",duration:1e3}),setTimeout(function(){n.reLaunch({url:"/pages/engineer/engineer"})},1e3)})},goWODetail:function(e){n.navigateTo({url:"/pages/operation_his/operation_his?orderId="+e})}}};e.default=i}).call(this,t("543d")["default"])},ce8e:function(n,e,t){"use strict";var o,a=function(){var n=this,e=n.$createElement;n._self._c},i=[];t.d(e,"b",function(){return a}),t.d(e,"c",function(){return i}),t.d(e,"a",function(){return o})},e675:function(n,e,t){}},[["843d","common/runtime","common/vendor"]]]);