webpackJsonp([18],{SZ6v:function(s,e,t){var a=t("mmE+");"string"==typeof a&&(a=[[s.i,a,""]]),a.locals&&(s.exports=a.locals);t("rjj0")("36b604f2",a,!0)},iakk:function(s,e,t){"use strict";function a(s){t("SZ6v")}Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{isCommodityBrand:"",jp_show:!1,yd_zs_show:!1,loading:!0,ins_message:{irInsNo:"",insureCode:"",isCreateDate:"",isInsureDate:"",servicePeriod:"",irInsPlyNos:[]},product_message:{pdProcNm:"",irProCompName:"",irProInsAmount:"",irPlyBegDate:"",irPlyEndDate:"",irProPrice:""},business_message:{isDistrictName:"",manager:"",isDealerName:""},insure_message:{isInsuredName:"",isInsuredIdNo:"",isInsuredGender:"",isInsuredPhone:"",isInsuredProvName:"",isInsuredCityName:"",isInsuredAreaName:"",isInsuredAddres:""},car_message:{isCommodityModel:"",isCommodityBrandId:"",isCommodityColor:"",isCommodityDate:"",codeKey:"",isExtraEquipment:"",isOtherEquipment:""},insurancePolicy:[]}},created:function(){var s=this,e=localStorage.getItem("idNo").slice(2),t=this;t.$api.get("/insurance/"+e,null,function(s){if(console.log(s.data),200===s.code){if(t.isCommodityBrand=s.data.isCommodityBrand,t.ins_message=s.data.orderBasicInfo,t.product_message=s.data.productBasicInfo,t.business_message=s.data.dealerBasicInfo,t.insure_message=s.data.insuredBasicInfo,t.car_message=s.data.commodityBasicInfo,"F"===t.insure_message.isInsuredGender?t.insure_message.isInsuredGender="女":t.insure_message.isInsuredGender="男",""!==t.car_message.isExtraEquipment&&null!==t.car_message.isExtraEquipment||(t.car_message.isExtraEquipment="无"),""!==t.car_message.isOtherEquipment&&null!==t.car_message.isOtherEquipment||(t.car_message.isOtherEquipment="无"),"金彭"===s.data.isCommodityBrand?(t.jp_show=!0,t.yd_zs_show=!1):"雅迪"!==s.data.isCommodityBrand&&"宗申"!==s.data.isCommodityBrand&&"力帆"!==s.data.isCommodityBrand||(t.jp_show=!1,t.yd_zs_show=!0),""!==s.data.orderBasicInfo.irInsPlyNos.toString())for(var e=0;e<s.data.orderBasicInfo.irInsPlyNos.length;e++)t.insurancePolicy[e]=s.data.orderBasicInfo.irInsPlyNos[e],console.log(t.insurancePolicy);else t.insPlyNo="";t.loading=!1}else alert(s.message)},function(e){s.$router.push({path:"/login"})})}},n=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("section",[t("el-row",{directives:[{name:"loading",rawName:"v-loading",value:s.loading,expression:"loading"}]},[t("el-col",{staticClass:"one_item",attrs:{span:24}},[t("div",{staticClass:"tit"},[s._v("品牌商信息")]),s._v(" "),t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("品牌商：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.isCommodityBrand)},model:{value:s.isCommodityBrand,callback:function(e){s.isCommodityBrand=e},expression:"isCommodityBrand"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{staticClass:"one_item",attrs:{span:24}},[t("div",{staticClass:"tit"},[s._v("保障订单基本信息")]),s._v(" "),t("el-row",{attrs:{type:"flex",justify:"space-around"}},[t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("保险订单号：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.ins_message.irInsNo)},model:{value:s.ins_message.irInsNo,callback:function(e){s.$set(s.ins_message,"irInsNo",e)},expression:"ins_message.irInsNo"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:7}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("保障名称：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.ins_message.insureCode)},model:{value:s.ins_message.insureCode,callback:function(e){s.$set(s.ins_message,"insureCode",e)},expression:"ins_message.insureCode"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("申请日期：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.ins_message.isCreateDate)},model:{value:s.ins_message.isCreateDate,callback:function(e){s.$set(s.ins_message,"isCreateDate",e)},expression:"ins_message.isCreateDate"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:5}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("投保日期：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.ins_message.isInsureDate)},model:{value:s.ins_message.isInsureDate,callback:function(e){s.$set(s.ins_message,"isInsureDate",e)},expression:"ins_message.isInsureDate"}}),s._v(" "),t("div",{staticClass:"clear"})])])],1),s._v(" "),t("el-row",{attrs:{type:"flex",justify:"space-around"}},[t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("保障期间：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.ins_message.servicePeriod)},model:{value:s.ins_message.servicePeriod,callback:function(e){s.$set(s.ins_message,"servicePeriod",e)},expression:"ins_message.servicePeriod"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("保单号：")]),s._v(" "),t("div",{staticClass:"left"},s._l(s.insurancePolicy,function(e){return t("span",{staticStyle:{"margin-right":"20px"}},[t("span",{domProps:{textContent:s._s(e.insPlyNo)}}),s._v(" "),null===e.url||""===e.url||void 0===e.url||/[\s*]/g.test(e.url)?s._e():t("a",{attrs:{href:e.url,download:"test.pdf"}},[s._v("查看")])])})),s._v(" "),t("div",{staticClass:"clear"})])])],1)],1),s._v(" "),s.jp_show?t("el-col",{staticClass:"one_item",attrs:{span:24}},[t("div",{staticClass:"tit"},[s._v("经销商信息")]),s._v(" "),t("el-row",{attrs:{type:"flex",justify:"space-around"}},[t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("大区名称：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.business_message.isDistrictName)},model:{value:s.business_message.isDistrictName,callback:function(e){s.$set(s.business_message,"isDistrictName",e)},expression:"business_message.isDistrictName"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("业务经理：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.business_message.manager)},model:{value:s.business_message.manager,callback:function(e){s.$set(s.business_message,"manager",e)},expression:"business_message.manager"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:12}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("经销商名称：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.business_message.isDealerName)},model:{value:s.business_message.isDealerName,callback:function(e){s.$set(s.business_message,"isDealerName",e)},expression:"business_message.isDealerName"}}),s._v(" "),t("div",{staticClass:"clear"})])])],1)],1):s._e(),s._v(" "),t("el-col",{staticClass:"one_item",attrs:{span:24}},[t("div",{staticClass:"tit"},[s._v("被保人基本信息")]),s._v(" "),t("el-row",{attrs:{type:"flex",justify:"space-around"}},[t("el-col",{attrs:{span:4}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("姓名：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.insure_message.isInsuredName)},model:{value:s.insure_message.isInsuredName,callback:function(e){s.$set(s.insure_message,"isInsuredName",e)},expression:"insure_message.isInsuredName"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("身份证号码：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.insure_message.isInsuredIdNo)},model:{value:s.insure_message.isInsuredIdNo,callback:function(e){s.$set(s.insure_message,"isInsuredIdNo",e)},expression:"insure_message.isInsuredIdNo"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:4}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("性别：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.insure_message.isInsuredGender)},model:{value:s.insure_message.isInsuredGender,callback:function(e){s.$set(s.insure_message,"isInsuredGender",e)},expression:"insure_message.isInsuredGender"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:10}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("手机号码：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.insure_message.isInsuredPhone)},model:{value:s.insure_message.isInsuredPhone,callback:function(e){s.$set(s.insure_message,"isInsuredPhone",e)},expression:"insure_message.isInsuredPhone"}}),s._v(" "),t("div",{staticClass:"clear"})])])],1),s._v(" "),t("el-row",{attrs:{type:"flex",justify:"space-around"}},[t("el-col",{attrs:{span:4}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("省：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.insure_message.isInsuredProvName)},model:{value:s.insure_message.isInsuredProvName,callback:function(e){s.$set(s.insure_message,"isInsuredProvName",e)},expression:"insure_message.isInsuredProvName"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("市：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.insure_message.isInsuredCityName)},model:{value:s.insure_message.isInsuredCityName,callback:function(e){s.$set(s.insure_message,"isInsuredCityName",e)},expression:"insure_message.isInsuredCityName"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:4}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("区/县：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.insure_message.isInsuredAreaName)},model:{value:s.insure_message.isInsuredAreaName,callback:function(e){s.$set(s.insure_message,"isInsuredAreaName",e)},expression:"insure_message.isInsuredAreaName"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:10}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("详细地址：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.insure_message.isInsuredAddres)},model:{value:s.insure_message.isInsuredAddres,callback:function(e){s.$set(s.insure_message,"isInsuredAddres",e)},expression:"insure_message.isInsuredAddres"}}),s._v(" "),t("div",{staticClass:"clear"})])])],1)],1),s._v(" "),s.jp_show?t("el-col",{staticClass:"one_item",attrs:{span:24}},[t("div",{staticClass:"tit"},[s._v("被保车辆信息")]),s._v(" "),t("el-row",{attrs:{type:"flex",justify:"space-around"}},[t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("品类：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.isCommodityCategory)},model:{value:s.car_message.isCommodityCategory,callback:function(e){s.$set(s.car_message,"isCommodityCategory",e)},expression:"car_message.isCommodityCategory"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("车辆型号：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.isCommodityModel)},model:{value:s.car_message.isCommodityModel,callback:function(e){s.$set(s.car_message,"isCommodityModel",e)},expression:"car_message.isCommodityModel"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("车架号：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.isCommodityBrandId)},model:{value:s.car_message.isCommodityBrandId,callback:function(e){s.$set(s.car_message,"isCommodityBrandId",e)},expression:"car_message.isCommodityBrandId"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("兑换码：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.codeKey)},model:{value:s.car_message.codeKey,callback:function(e){s.$set(s.car_message,"codeKey",e)},expression:"car_message.codeKey"}}),s._v(" "),t("div",{staticClass:"clear"})])])],1),s._v(" "),t("el-row",{attrs:{type:"flex",justify:"space-around"}},[t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("颜色：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.isCommodityColor)},model:{value:s.car_message.isCommodityColor,callback:function(e){s.$set(s.car_message,"isCommodityColor",e)},expression:"car_message.isCommodityColor"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("购车日期：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.isCommodityDate)},model:{value:s.car_message.isCommodityDate,callback:function(e){s.$set(s.car_message,"isCommodityDate",e)},expression:"car_message.isCommodityDate"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("辅助设备：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.isExtraEquipment)},model:{value:s.car_message.isExtraEquipment,callback:function(e){s.$set(s.car_message,"isExtraEquipment",e)},expression:"car_message.isExtraEquipment"}}),s._v(" "),t("div",{staticClass:"clear"})])]),s._v(" "),t("el-col",{attrs:{span:6}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("其他辅助设备：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.isOtherEquipment)},model:{value:s.car_message.isOtherEquipment,callback:function(e){s.$set(s.car_message,"isOtherEquipment",e)},expression:"car_message.isOtherEquipment"}}),s._v(" "),t("div",{staticClass:"clear"})])])],1)],1):s._e(),s._v(" "),s.yd_zs_show?t("el-col",{staticClass:"one_item",attrs:{span:24}},[t("div",{staticClass:"tit"},[s._v("被保车辆信息")]),s._v(" "),t("el-row",{attrs:{type:"flex",justify:"space-around"}},[t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("品类：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.isCommodityCategory)},model:{value:s.car_message.isCommodityCategory,callback:function(e){s.$set(s.car_message,"isCommodityCategory",e)},expression:"car_message.isCommodityCategory"}}),s._v(" "),t("div",{staticClass:"clear"})]),s._v(" "),t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("车辆型号：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.isCommodityModel)},model:{value:s.car_message.isCommodityModel,callback:function(e){s.$set(s.car_message,"isCommodityModel",e)},expression:"car_message.isCommodityModel"}}),s._v(" "),t("div",{staticClass:"clear"})]),s._v(" "),t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("车架号：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.isCommodityBrandId)},model:{value:s.car_message.isCommodityBrandId,callback:function(e){s.$set(s.car_message,"isCommodityBrandId",e)},expression:"car_message.isCommodityBrandId"}}),s._v(" "),t("div",{staticClass:"clear"})]),s._v(" "),t("div",{staticClass:"content_item"},[t("div",{staticClass:"left"},[s._v("兑换码：")]),s._v(" "),t("div",{staticClass:"left",domProps:{textContent:s._s(s.car_message.codeKey)},model:{value:s.car_message.codeKey,callback:function(e){s.$set(s.car_message,"codeKey",e)},expression:"car_message.codeKey"}}),s._v(" "),t("div",{staticClass:"clear"})])])],1):s._e()],1)],1)},o=[],l={render:n,staticRenderFns:o},r=l,c=t("VU/8"),d=a,m=c(i,r,!1,d,null,null);e.default=m.exports},"mmE+":function(s,e,t){e=s.exports=t("FZ+f")(!1),e.push([s.i,"\n.left{\n    float:left;\n}\n.clear{\n    clear: both;\n}\n.one_item{\n    border-bottom: 1.5px solid #aaa;\n    padding-bottom: 20px;\n    margin-bottom: 15px;\n}\n.tit{\n    font-size:15px;\n    margin-bottom: 15px;\n    font-weight:bold;\n}\n.content_item{\n    font-size:14px;\n    line-height: 20px;\n    margin-bottom: 10px;\n}\n.content_item div:first-child{\n    margin-right: 10px;\n}\n",""])}});