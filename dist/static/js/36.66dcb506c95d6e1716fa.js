webpackJsonp([36],{vSS8:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={data:function(){return{editLoading:!1,form:{name:"",fullName:"",email:"",mobile:""},rules:{name:[{required:!0,message:"请输入账号",trigger:"blur"}],fullName:[{required:!0,message:"请输入姓名",trigger:"blur"}],email:[{type:"email",message:"请输入正确的邮箱地址",trigger:"blur,change"}],mobile:[{required:!0,validator:function(e,t,r){""===t?r(new Error("请输入手机号")):t.match(/^1[34578]\d{9}$/)?r():r(new Error("请输入正确的手机号"))},trigger:"blur,change"}]}}},methods:{handleSave:function(e){var t=this,r=this;r.$refs[e].validate(function(e){e&&(t.editLoading=!0,r.$api.post("/user",r.form,function(e){200===e.code?(alert(e.message),t.$message({message:"操作成功！",type:"success"}),t.editLoading=!1,t.$router.push("/user_list")):(alert(e.message),t.editLoading=!1)},function(e){t.$router.push({path:"/login"})}))})},handleCancel:function(){this.$router.push({path:"/user_list"})},resetForm:function(e){this.$refs[e].resetFields()}}},a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form}},[r("el-form-item",{attrs:{label:"账号",prop:"name"}},[r("el-input",{staticStyle:{width:"70%"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"姓名",prop:"fullName"}},[r("el-input",{staticStyle:{width:"70%"},model:{value:e.form.fullName,callback:function(t){e.$set(e.form,"fullName",t)},expression:"form.fullName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[r("el-input",{staticStyle:{width:"70%"},attrs:{type:"email"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[r("el-input",{staticStyle:{width:"70%"},attrs:{type:"number"},model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.editLoading,expression:"editLoading"}],attrs:{type:"primary"},on:{click:function(t){e.handleSave("form")}}},[e._v("添加")]),e._v(" "),r("el-button",{on:{click:function(t){e.handleCancel()}}},[e._v("取消")]),e._v(" "),r("el-button",{on:{click:function(t){e.resetForm("form")}}},[e._v("重置")])],1)],1)},o=[],i={render:a,staticRenderFns:o},n=i,s=r("VU/8"),m=s(l,n,!1,null,null,null);t.default=m.exports}});