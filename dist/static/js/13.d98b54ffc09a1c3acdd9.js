webpackJsonp([13],{KJU8:function(e,n,t){n=e.exports=t("FZ+f")(!1),n.push([e.i,'\n.upload_file {\n    display: inline-block;\n    position: relative;\n    border-radius: 3px;\n}\n.upload_file input[type=file] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom:0;\n    right:0;\n    width: 100%;\n    opacity: 0;\n    cursor: pointer;\n}\n.upload_file .submit_style {\n    display: inline-block;\n    width: 100%;\n    text-align: center;\n    font-family: "Microsoft yahei";\n    background-color: #409eff;\n    color: #FFF;\n    text-decoration: none;\n}\n.submit_style{\n    padding:8px 12px;\n    border:none;\n    background-color: #409eff;\n    border-radius: 3px;\n    color: #fff;\n}\n.download{\n    display: inline-block;\n    padding: 8px 12px;\n    border: none;\n    background-color: #409eff;\n    border-radius: 3px;\n    color: #fff;\n    font-size: 13px;\n}\n',""])},pDme:function(e,n,t){"use strict";function r(e){t("u4Ym")}Object.defineProperty(n,"__esModule",{value:!0});var o=t("fZjL"),i=t.n(o),l=(t("mtWM"),{data:function(){return{isAble:!0,isProduct:!1,editLoading:!1,formInline:{productCode:"",commodityCategory:"",file:"",filename:"",startLine:"2",vin:"B",name:"C",idNum:"D",phone:"E",address:"I"},dataArr:[],titleArr:[],categoryArr:[],rules:{productCode:[{required:!0,message:"请选择保障产品",trigger:"blur"}],commodityCategory:[{required:!0,message:"请选择品类",trigger:"blur"}],startLine:[{required:!0,message:"请输入数据开始行",trigger:"blur"}],vin:[{required:!0,message:"请输入车架号所在列",trigger:"blur"}],name:[{required:!0,message:"请输入姓名所在列",trigger:"blur"}],idNum:[{required:!0,message:"请输入身份证号所在列",trigger:"blur"}],phone:[{required:!0,message:"请输入手机号所在列",trigger:"blur"}],address:[{required:!0,message:"请输入地址所在列",trigger:"blur"}],file:[{required:!0,message:"请上传文件",trigger:"blur"}]}}},created:function(){var e=this;e.$api.get("/product/option/free",null,function(n){console.log(n.data),200===n.code?(e.titleArr=n.data,1===n.data.length&&(e.formInline.productCode=n.data[0].id,e.sendProduct())):alert(n.message)})},methods:{uploadFile:function(e){this.formInline.file=e.target.files[0],this.formInline.filename=e.target.files[0].name},sendProduct:function(){var e=this;e.isProduct=!0,e.formInline.commodityCategory="",e.$api.get("/brandconfig/product/"+e.formInline.productCode+"/category",null,function(n){if(console.log(n.data),200===n.code){e.dataArr="",e.categoryArr=n.data;for(var t in n.data)1===i()(n.data).length&&(e.formInline.commodityCategory=t,console.log(e.formInline.commodityCategory))}else alert(n.message)})},onSubmit:function(e){var n=this,t=this;t.$refs.formInline.validate(function(r){if(!r)return console.log("error submit!!"),!1;if(n.formInline.file.size/1024/1024<=2){n.editLoading=!0;var o=new FormData;o.append("productId",t.formInline.productCode),o.append("category",t.formInline.commodityCategory),o.append("startLine",t.formInline.startLine),o.append("columns",[t.formInline.vin,t.formInline.name,t.formInline.idNum,t.formInline.phone,t.formInline.address]),o.append("file",t.formInline.file),console.log(o),t.$api.post("/order/import",o,function(r){console.log(r.data),200===r.code?(alert(r.message),t.dataArr=r.data,t.$refs[e].resetFields(),document.getElementById("file").value="",t.formInline.filename=""):alert(r.message),n.editLoading=!1},function(e){n.$router.push({path:"/login"})})}else alert("上传文件不能超过2MB,请重新上传")})}}}),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"top"},[t("div",{staticClass:"title",staticStyle:{"margin-bottom":"20px"}},[e._v("导入订单")]),e._v(" "),t("el-form",{ref:"formInline",attrs:{inline:!0,model:e.formInline,rules:e.rules}},[t("el-form-item",{attrs:{label:"保障产品",prop:"productCode"}},[t("el-select",{attrs:{placeholder:"保障产品"},on:{change:function(n){e.sendProduct()}},model:{value:e.formInline.productCode,callback:function(n){e.$set(e.formInline,"productCode",n)},expression:"formInline.productCode"}},e._l(e.titleArr,function(e){return t("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),e.isProduct?t("el-form-item",{attrs:{label:"品类",prop:"commodityCategory"}},[t("el-select",{attrs:{name:"commodityCategory",placeholder:"品类"},model:{value:e.formInline.commodityCategory,callback:function(n){e.$set(e.formInline,"commodityCategory",n)},expression:"formInline.commodityCategory"}},e._l(e.categoryArr,function(e,n){return t("el-option",{key:n,attrs:{label:e,value:n}})}))],1):e._e(),e._v(" "),t("el-form-item",{attrs:{label:"开始行",prop:"startLine"}},[t("el-input",{attrs:{placeholder:"请输入数据开始行"},model:{value:e.formInline.startLine,callback:function(n){e.$set(e.formInline,"startLine",n)},expression:"formInline.startLine"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"车架号",prop:"vin"}},[t("el-input",{attrs:{placeholder:"请输入车架号所在列"},model:{value:e.formInline.vin,callback:function(n){e.$set(e.formInline,"vin",n)},expression:"formInline.vin"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"姓名",prop:"name"}},[t("el-input",{attrs:{placeholder:"请输入姓名所在列"},model:{value:e.formInline.name,callback:function(n){e.$set(e.formInline,"name",n)},expression:"formInline.name"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"身份证号",prop:"idNum"}},[t("el-input",{attrs:{placeholder:"请输入身份证号所在列"},model:{value:e.formInline.idNum,callback:function(n){e.$set(e.formInline,"idNum",n)},expression:"formInline.idNum"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[t("el-input",{attrs:{placeholder:"请输入手机号所在列"},model:{value:e.formInline.phone,callback:function(n){e.$set(e.formInline,"phone",n)},expression:"formInline.phone"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"地址",prop:"address"}},[t("el-input",{attrs:{placeholder:"请输入地址所在列"},model:{value:e.formInline.address,callback:function(n){e.$set(e.formInline,"address",n)},expression:"formInline.address"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"选择订单文件",prop:"file"}},[t("div",{staticClass:"upload_file"},[t("input",{ref:"file",attrs:{type:"file",name:"file",id:"file"},on:{change:e.uploadFile}}),e._v(" "),t("input",{staticClass:"submit_style",attrs:{type:"button",size:"small",value:"上传文件"}})]),e._v(" "),t("div",{staticClass:"fileName",staticStyle:{display:"inline"},domProps:{textContent:e._s(e.formInline.filename)}})]),e._v(" "),t("el-form-item",[e.editLoading?t("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.editLoading,expression:"editLoading"}],attrs:{type:"primary",size:"medium",disabled:""}},[e._v("上传到服务器")]):t("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(n){e.onSubmit("formInline")}}},[e._v("上传到服务器")]),e._v(" "),t("div",{staticStyle:{display:"inline"}},[e._v("只能上传.xlsx/.xls文件，且不超过2MB")])],1)],1),e._v(" "),t("el-form",{attrs:{inline:!0}},e._l(e.dataArr,function(n){return t("div",{staticStyle:{color:"red"},domProps:{textContent:e._s(n)}})}))],1)])},s=[],d={render:a,staticRenderFns:s},m=d,f=t("VU/8"),u=r,c=f(l,m,!1,u,null,null);n.default=c.exports},u4Ym:function(e,n,t){var r=t("KJU8");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t("rjj0")("2e91d912",r,!0)}});