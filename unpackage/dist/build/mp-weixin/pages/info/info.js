(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/info/info"],{"28c6":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=o(e("8d42"));function o(n){return n&&n.__esModule?n:{default:n}}var f={onLoad:function(){var n=this;u.default.getUserInfo().then(function(t){console.log(t),n.bkName=t.data.name})},data:function(){return{bkName:""}},methods:{logout:function(){u.default.logout().then(function(){n.reLaunch({url:"../login/login"})})}}};t.default=f}).call(this,e("543d")["default"])},4533:function(n,t,e){},"6fcb":function(n,t,e){"use strict";var u=e("4533"),o=e.n(u);o.a},a7ef:function(n,t,e){"use strict";e.r(t);var u=e("28c6"),o=e.n(u);for(var f in u)"default"!==f&&function(n){e.d(t,n,function(){return u[n]})}(f);t["default"]=o.a},b9e5:function(n,t,e){"use strict";var u,o=function(){var n=this,t=n.$createElement;n._self._c},f=[];e.d(t,"b",function(){return o}),e.d(t,"c",function(){return f}),e.d(t,"a",function(){return u})},db83:function(n,t,e){"use strict";(function(n){e("42e8"),e("921b");u(e("66fd"));var t=u(e("ff97"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},ff97:function(n,t,e){"use strict";e.r(t);var u=e("b9e5"),o=e("a7ef");for(var f in o)"default"!==f&&function(n){e.d(t,n,function(){return o[n]})}(f);e("6fcb");var a,c=e("f0c5"),r=Object(c["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);t["default"]=r.exports}},[["db83","common/runtime","common/vendor"]]]);