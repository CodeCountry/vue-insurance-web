webpackJsonp([29],{DxzV:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={data:function(){var e=function(e,t,r){""===t?r(new Error("不能为空")):t.match("^[0-9]*$")?r():r(new Error("请输入纯数字"))};return{labelPosition:"left",editLoading:!1,form:{name:"",intro:"",category:"",coverage:"",insurerName:"",span:"",effectiveWay:"",code:""},rules:{name:[{required:!0,message:"请输入保险产品名",trigger:"blur"}],intro:[{required:!0,message:"请输入介绍",trigger:"blur"}],category:[{required:!0,message:"请选择类型",trigger:"blur"}],coverage:[{required:!0,validator:e,message:"请输入保额（纯数字）",trigger:"blur"}],insurerName:[{required:!0,message:"请选择所属保险公司",trigger:"blur"}],span:[{required:!0,validator:e,message:"请输入保障时间（单位月，纯数字）",trigger:"blur"}],effectiveWay:[{required:!0,message:"请选择生效方式 ",trigger:"blur"}],code:[{required:!0,message:"请输入编码格式 ",trigger:"blur"}]},titleArr:[],categoryOption:[],effectiveWayOption:[]}},created:function(){var e=this;e.$api.get("/insurer/all",null,function(t){console.log(t.data),200===t.code&&(e.titleArr=t.data)},function(t){e.$router.push("/login")}),e.$api.get("insurerproduct/insuranceCategory",null,function(t){console.log(t.data),200===t.code&&(e.categoryOption=t.data)},function(t){e.$router.push("/login")}),e.$api.get("insurerproduct/effectiveWay",null,function(t){console.log(t.data),200===t.code&&(e.effectiveWayOption=t.data)},function(t){e.$router.push("/login")})},methods:{handleSave:function(e){var t=this,r=this;r.$refs[e].validate(function(e){e&&(t.editLoading=!0,r.form.insurerId=r.form.insurerName,console.log(r.form),r.$api.post("/insurerproduct",r.form,function(e){200===e.code?(t.$message({message:"操作成功！",type:"success"}),t.editLoading=!1,t.$router.push("/insurance_products")):(alert(e.message),t.editLoading=!1)},function(e){t.$router.push({path:"/login"})}))})},handleCancel:function(){this.$router.push({path:"/insurance_products"})},resetForm:function(e){this.$refs[e].resetFields()}}},a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{ref:"form",attrs:{"label-position":e.labelPosition,"label-width":"110px",rules:e.rules,model:e.form}},[r("el-form-item",{attrs:{label:"保险产品名",prop:"name"}},[r("el-input",{staticStyle:{width:"80%"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"保险介绍",prop:"intro"}},[r("el-input",{staticStyle:{width:"80%"},model:{value:e.form.intro,callback:function(t){e.$set(e.form,"intro",t)},expression:"form.intro"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"险种",prop:"category"}},[r("el-select",{staticStyle:{width:"80%"},model:{value:e.form.category,callback:function(t){e.$set(e.form,"category",t)},expression:"form.category"}},e._l(e.categoryOption,function(e){return r("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"保额",prop:"coverage"}},[r("el-input",{staticStyle:{width:"80%"},model:{value:e.form.coverage,callback:function(t){e.$set(e.form,"coverage",t)},expression:"form.coverage"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"保障时间",prop:"span"}},[r("el-input",{staticStyle:{width:"80%"},model:{value:e.form.span,callback:function(t){e.$set(e.form,"span",t)},expression:"form.span"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"生效方式",prop:"effectiveWay"}},[r("el-select",{staticStyle:{width:"80%"},model:{value:e.form.effectiveWay,callback:function(t){e.$set(e.form,"effectiveWay",t)},expression:"form.effectiveWay"}},e._l(e.effectiveWayOption,function(e){return r("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"所属保险公司",prop:"insurerName"}},[r("el-select",{staticStyle:{width:"80%"},model:{value:e.form.insurerName,callback:function(t){e.$set(e.form,"insurerName",t)},expression:"form.insurerName"}},e._l(e.titleArr,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"编码格式",prop:"code"}},[r("el-input",{staticStyle:{width:"80%"},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.editLoading,expression:"editLoading"}],attrs:{type:"primary"},on:{click:function(t){e.handleSave("form")}}},[e._v("添加")]),e._v(" "),r("el-button",{on:{click:function(t){e.handleCancel()}}},[e._v("取消")]),e._v(" "),r("el-button",{on:{click:function(t){e.resetForm("form")}}},[e._v("重置")])],1)],1)},i=[],n={render:a,staticRenderFns:i},l=n,s=r("VU/8"),c=s(o,l,!1,null,null,null);t.default=c.exports}});