webpackJsonp([12],{"3nlw":function(e,t,n){var l=n("BhKz");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);n("rjj0")("7e8f04f6",l,!0)},BhKz:function(e,t,n){t=e.exports=n("FZ+f")(!1),t.push([e.i,"\n.submit_style{\n  padding:8px 12px;\n  border:none;\n  background-color: #409eff;\n  border-radius: 3px;\n  color: #fff;\n}\n.submit_style:focus, .submit_style:hover {\n  color: #fff;\n  border-color: #66b1ff;\n  background-color:#66b1ff;\n}\n.download{\n  display: inline-block;\n  padding: 8px 12px;\n  border: none;\n  background-color: #409eff;\n  border-radius: 3px;\n  color: #fff;\n  font-size: 13px;\n}\n",""])},Kd0o:function(e,t,n){"use strict";function l(e){n("3nlw")}Object.defineProperty(t,"__esModule",{value:!0});var i=(n("mtWM"),{data:function(){return{isAble:!0,editLoading:!1,formInline:{facturer:"",file:"",filename:""},rules:{facturer:[{required:!0,message:"请选择厂商",trigger:"blur"}],file:[{required:!0,message:"请上传文件",trigger:"blur"}]}}},methods:{uploadFile:function(e){this.formInline.file=e.target.files[0],this.formInline.filename=e.target.files[0].name},onSubmit:function(e){var t=this,n=this;n.$refs.formInline.validate(function(l){if(!l)return console.log("error submit!!"),!1;n.editLoading=!0;var i=new FormData;i.append("facturer",n.formInline.facturer),i.append("file",n.formInline.file),n.$api.post("/codeKey/uploadCodeKey",i,function(t){console.log(t.data),200===t.code?(alert(t.message),n.$refs[e].resetFields(),document.getElementById("file").value=""):alert(t.message),n.editLoading=!1},function(e){t.$router.push({path:"/login"})})})}}}),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"top"},[e._m(0),e._v(" "),n("el-form",{ref:"formInline",attrs:{inline:!0,model:e.formInline,rules:e.rules}},[n("el-form-item",{attrs:{label:"厂商",prop:"facturer"}},[n("el-select",{attrs:{name:"facturer",placeholder:"厂商"},model:{value:e.formInline.facturer,callback:function(t){e.$set(e.formInline,"facturer",t)},expression:"formInline.facturer"}},[n("el-option",{attrs:{label:"金彭",value:"金彭"}}),e._v(" "),n("el-option",{attrs:{label:"宗申",value:"宗申"}}),e._v(" "),n("el-option",{attrs:{label:"雅迪",value:"雅迪"}}),e._v(" "),n("el-option",{attrs:{label:"力帆",value:"力帆"}})],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"兑换码文件上传",prop:"file"}},[n("div",{staticClass:"upload_file"},[n("input",{ref:"file",attrs:{type:"file",name:"file",id:"file"},on:{change:e.uploadFile}}),e._v(" "),n("input",{staticClass:"submit_style",attrs:{type:"button",size:"small",value:"上传文件"}})]),e._v(" "),n("div",{staticClass:"fileName",staticStyle:{display:"inline"},domProps:{textContent:e._s(e.formInline.filename)}})]),e._v(" "),n("el-form-item",[e.editLoading?n("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.editLoading,expression:"editLoading"}],attrs:{type:"primary",size:"medium",disabled:""}},[e._v("上传到服务器")]):n("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){e.onSubmit("formInline")}}},[e._v("上传到服务器")]),e._v(" "),n("div",{staticStyle:{display:"inline"}},[e._v("只能上传.xlsx/.xls文件，且不超过2MB")])],1)],1)],1)])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"title",staticStyle:{"margin-bottom":"20px"}},[e._v("导入兑换码  "),n("a",{staticClass:"download",attrs:{href:"codeKey/downloadExcelTemplate"}},[e._v("下载兑换码模板")])])}],a={render:r,staticRenderFns:o},s=a,f=n("VU/8"),d=l,u=f(i,s,!1,d,null,null);t.default=u.exports}});