webpackJsonp([1],{"0YEn":function(n,e,t){e=n.exports=t("FZ+f")(!1),e.push([n.i,"\n.content{\n  min-width:930px;\n  padding:15px 15px 10px 0;\n}\n.block{\n  text-align: center;\n  margin-top: 20px;\n}\n",""])},"5q04":function(n,e,t){var o=t("aomv");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);t("rjj0")("7a2801f7",o,!0)},Meky:function(n,e,t){var o=t("0YEn");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);t("rjj0")("09e4f940",o,!0)},MpTN:function(n,e,t){"use strict";function o(n){t("lRY1")}function i(n){t("5q04")}function r(n){t("Meky")}Object.defineProperty(e,"__esModule",{value:!0});var a={data:function(){return{name:"linxin"}},computed:{username:function(){var n=localStorage.getItem("ms_username");return n||this.name}},methods:{setCookie:function(n,e,t){var o=new Date;o.setTime(o.getTime()+864e5*t),window.document.cookie=n+"="+e+";path=/;expires="+o.toGMTString()},clearCookie:function(n){this.setCookie(n,"",-1)},handleCommand:function(n){var e=this;"loginout"===n?this.$api.get("/user/logout",null,function(n){200===n.code&&(localStorage.removeItem("ms_username"),e.$router.push("/login"))},function(n){e.$router.push({path:"/login"})}):"change_password"===n&&this.$router.push("/change_password")}}},s=function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("div",{staticClass:"header"},[o("div",{staticClass:"logo"},[n._v("后台管理系统")]),n._v(" "),o("div",{staticClass:"user-info"},[o("el-dropdown",{attrs:{trigger:"click"},on:{command:n.handleCommand}},[o("span",{staticClass:"el-dropdown-link"},[o("img",{staticClass:"user-logo",attrs:{src:t("ZYPB")}}),n._v("\n                "+n._s(n.username)+"\n            ")]),n._v(" "),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",{attrs:{command:"change_password"}},[n._v("修改密码")]),n._v(" "),o("el-dropdown-item",{attrs:{command:"loginout"}},[n._v("退出")])],1)],1)],1)])},l=[],c={render:s,staticRenderFns:l},u=c,d=t("VU/8"),p=o,f=d(a,u,!1,p,"data-v-2c42b386",null),m=f.exports,h=(t("mtWM"),{data:function(){return{items:[]}},methods:{getCookie:function(n){for(var e=n+"=",t=document.cookie.split(";"),o=0;o<t.length;o++){for(var i=t[o];" "===i.charAt(0);)i=i.substring(1);if(-1!==i.indexOf(e))return i.substring(e.length,i.length)}return""}},created:function(){var n=this,e=this;e.getCookie("shenmajr_insurance_user")?e.$api.get("/menu/root",null,function(n){200===n.code&&(e.items=n.data,console.log(e.items)),console.log(n.data)},function(e){n.$router.push({path:"/login"})}):this.$router.push({path:"/login"})}}),g=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"sidebar"},[t("el-menu",{staticClass:"el-menu-vertical-demo el-menu--dark",attrs:{"default-active":n.$route.path.replace("/",""),backgroundColor:"#344259","text-color":"#fff","active-text-color":"#ffd04b","unique-opened":"",router:""}},[n._l(n.items,function(e){return[e.children?[t("el-submenu",{attrs:{index:e.index}},[t("template",{slot:"title"},[t("i",{class:e.icon}),n._v(n._s(e.name))]),n._v(" "),n._l(e.children,function(e,o){return t("el-menu-item",{key:o,attrs:{index:e.url}},[n._v(n._s(e.name)+"\n                    ")])})],2)]:[t("el-menu-item",{attrs:{index:e.index}},[t("i",{class:e.icon}),n._v(n._s(e.name)+"\n                ")])]]})],2)],1)},v=[],x={render:g,staticRenderFns:v},b=x,_=t("VU/8"),w=i,k=_(h,b,!1,w,"data-v-915bf96e",null),C=k.exports,j={components:{vHead:m,vSidebar:C},methods:{getCookie:function(n){for(var e=n+"=",t=document.cookie.split(";"),o=0;o<t.length;o++){for(var i=t[o];" "==i.charAt(0);)i=i.substring(1);if(-1!=i.indexOf(e))return i.substring(e.length,i.length)}return""}}},$=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"wrapper"},[t("v-head"),n._v(" "),t("v-sidebar"),n._v(" "),t("div",{staticClass:"content"},[t("transition",{attrs:{name:"move",mode:"out-in"}},[t("router-view")],1)],1)],1)},y=[],Z={render:$,staticRenderFns:y},F=Z,M=t("VU/8"),Y=r,E=M(j,F,!1,Y,null,null);e.default=E.exports},ZVj4:function(n,e,t){e=n.exports=t("FZ+f")(!1),e.push([n.i,"\n.header[data-v-2c42b386] {\n    position: relative;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    width: 100%;\n    height: 70px;\n    font-size: 22px;\n    line-height: 70px;\n    color: #fff;\n}\n.header .logo[data-v-2c42b386]{\n    float: left;\n    width:250px;\n    text-align: center;\n}\n.user-info[data-v-2c42b386] {\n    float: right;\n    padding-right: 50px;\n    font-size: 16px;\n    color: #fff;\n}\n.user-info .el-dropdown-link[data-v-2c42b386]{\n    position: relative;\n    display: inline-block;\n    padding-left: 50px;\n    color: #fff;\n    cursor: pointer;\n    vertical-align: middle;\n}\n.user-info .user-logo[data-v-2c42b386]{\n    position: absolute;\n    left:0;\n    top:15px;\n    width:40px;\n    height:40px;\n    border-radius: 50%;\n}\n.el-dropdown-menu__item[data-v-2c42b386]{\n    text-align: center;\n}\n",""])},ZYPB:function(n,e,t){n.exports=t.p+"static/img/img.2aab7b4.jpg"},aomv:function(n,e,t){e=n.exports=t("FZ+f")(!1),e.push([n.i,"\n.sidebar[data-v-915bf96e]{\n    display: block;\n    position: absolute;\n    /*!*width: 220px;*!*/\n    left: 0;\n    top: 70px;\n    bottom:0;\n    background: #344259;\n    overflow: scroll;\n}\n.el-menu-vertical-demo[data-v-915bf96e]:not(.el-menu--collapse) {\n    width: 188px;\n    min-height: 400px;\n}\n.sidebar > ul[data-v-915bf96e] {\n    height:100%;\n}\n.el-submenu .el-menu-item[data-v-915bf96e]:focus{\n    outline: none;\n}\n.el-submenu .el-menu-item[data-v-915bf96e]{\n  height:45px;\n  line-height: 45px;\n}\n",""])},lRY1:function(n,e,t){var o=t("ZVj4");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);t("rjj0")("fc3564ea",o,!0)}});