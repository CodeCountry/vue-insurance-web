webpackJsonp([16],{"0h/b":function(e,t,a){"use strict";function l(e){a("DqIK")}Object.defineProperty(t,"__esModule",{value:!0});var n={data:function(){return{formInline:{irInsNo:"",isInsuredIdNo:"",isInsuredPhone:"",insureCode:"",isDate:"",isCreateDate:"",isCreateDate2:"",isSignMsg:"",irPlyStatusDesc:""},titleArr:[],statusPayArr:[],statusArr:[],tableData:[],loading:!0,total:1,pageSize:10,currentPage:1,value1:"",select:!1}},created:function(){var e=this,t=this;t.$api.get("/insurance",null,function(e){console.log(e.data),200===e.code?(t.getTable(e),console.log(t.tableData)):alert(e.message)},function(t){e.$router.push({path:"/login"})}),t.$api.get("/insurance/protitle",null,function(e){console.log(e.data),200===e.code?t.titleArr=e.data:alert(e.message)}),t.$api.get("/insurance/signmsg",null,function(e){console.log(e.data),200===e.code?t.statusPayArr=e.data:alert(e.message),t.loading=!1}),t.$api.get("/insurance/plystatus",null,function(e){console.log(e.data),200===e.code?t.statusArr=e.data:alert(e.message)})},methods:{getTable:function(e){var t=this;t.total=e.data.total,t.tableData=e.data.list,t.pageSize=e.data.pageSize,t.loading=!1},onSubmit:function(){var e=this,t=this;t.select=!0,t.loading=!0;var a=t.formInline,l=void 0,n=void 0,i=void 0;console.log(a),""!==a.isDate&&null!==a.isDate?(n=a.isDate[1],l=a.isDate[0]):(n="",l=""),i="bx"===a.irInsNo.slice(0,2)?a.irInsNo.slice(2):a.irInsNo;var s={irInsNo:i,isInsuredIdNo:a.isInsuredIdNo,isInsuredPhone:a.isInsuredPhone,insureCode:a.insureCode,isCreateDate:l,isCreateDate2:n,irPlyStatusDesc:a.irPlyStatusDesc,isSignMsg:a.isSignMsg,isInsuredName:a.isInsuredName};console.log(s),t.$api.get("/insurance",s,function(e){console.log(e.data),200===e.code?t.getTable(e):alert(e.message)},function(t){e.$router.push({path:"/login"})})},show_detail:function(e){localStorage.removeItem("idNo"),localStorage.setItem("idNo",this.tableData[e].irInsNo),this.$router.push({path:"/table_one_detail2"})},handleSizeChange:function(e){var t=this,a=this;a.loading=!0,a.pageSize=e;var l=void 0;a.select?(console.log(a.formInline),l=a.formInline,l.irInsNo=l.irInsNo.slice(2),""===l.isDate||null===l.isDate?(l.isCreateDate2="",l.isCreateDate=""):(l.isCreateDate2=l.isDate[1],l.isCreateDate=l.isDate[0]),l.isDate="",l.pageSize=a.pageSize,l.pageNum=a.currentPage):l={pageSize:a.pageSize,pageNum:a.currentPage},a.$api.get("/insurance",l,function(e){console.log(e.data),200===e.code?(a.getTable(e),a.loading=!1):alert(e.message),a.loading=!1},function(e){t.$router.push({path:"/login"})})},handleCurrentChange:function(e){var t=this,a=this;a.loading=!0,a.currentPage=e;var l=void 0;a.select?(l=a.formInline,l.irInsNo=l.irInsNo.slice(2),""===l.isDate||null===l.isDate?(l.isCreateDate2="",l.isCreateDate=""):(l.isCreateDate2=l.isDate[1],l.isCreateDate=l.isDate[0]),l.isDate="",l.pageSize=a.pageSize,l.pageNum=a.currentPage):l={pageSize:a.pageSize,pageNum:a.currentPage},a.$api.get("/insurance",l,function(e){console.log(e.data),200===e.code?(a.getTable(e),a.loading=!1):alert(e.message),a.loading=!1},function(e){t.$router.push({path:"/login"})})}}},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"title"},[e._v("什马保障订单查询")]),e._v(" "),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"保障订单号"}},[a("el-input",{model:{value:e.formInline.irInsNo,callback:function(t){e.$set(e.formInline,"irInsNo",t)},expression:"formInline.irInsNo"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"被保人姓名"}},[a("el-input",{model:{value:e.formInline.isInsuredName,callback:function(t){e.$set(e.formInline,"isInsuredName",t)},expression:"formInline.isInsuredName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证号码"}},[a("el-input",{model:{value:e.formInline.isInsuredIdNo,callback:function(t){e.$set(e.formInline,"isInsuredIdNo",t)},expression:"formInline.isInsuredIdNo"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号码"}},[a("el-input",{model:{value:e.formInline.isInsuredPhone,callback:function(t){e.$set(e.formInline,"isInsuredPhone",t)},expression:"formInline.isInsuredPhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"保障名称"}},[a("el-select",{attrs:{placeholder:"保障名称"},model:{value:e.formInline.insureCode,callback:function(t){e.$set(e.formInline,"insureCode",t)},expression:"formInline.insureCode"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),e._l(e.titleArr,function(e,t){return a("el-option",{key:t,attrs:{label:t,value:e}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"申请日期"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyyMMdd"},model:{value:e.formInline.isDate,callback:function(t){e.$set(e.formInline,"isDate",t)},expression:"formInline.isDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"支付状态"}},[a("el-select",{attrs:{placeholder:"支付状态"},model:{value:e.formInline.isSignMsg,callback:function(t){e.$set(e.formInline,"isSignMsg",t)},expression:"formInline.isSignMsg"}},[a("el-option",{attrs:{label:"全部",value:" "}}),e._v(" "),e._l(e.statusPayArr,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"被保状态"}},[a("el-select",{attrs:{placeholder:"被保状态"},model:{value:e.formInline.irPlyStatusDesc,callback:function(t){e.$set(e.formInline,"irPlyStatusDesc",t)},expression:"formInline.irPlyStatusDesc"}},[a("el-option",{attrs:{label:"全部",value:" "}}),e._v(" "),e._l(e.statusArr,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})})],2)],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("查询")])],1),e._v(" "),a("div",{staticClass:"title"},[e._v("订单详情")]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{type:"selection"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isCreateDate",label:"申请日期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isInsureDate",label:"投保日期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isApplNo",label:"分期订单号",width:"110px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"pdProcNm",label:"分期项目"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isTimes",label:"分期期数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"irInsNo",label:"保障订单号",width:"130px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"insureCode",label:"保障名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isInsuredName",label:"被保人姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isInsuredIdNo",label:"身份证号码",width:"140px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isInsuredPhone",label:"手机号码",width:"100px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isPayMoney",label:"售价"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isSignMsg",label:"支付状态"}}),e._v(" "),a("el-table-column",{attrs:{prop:"irPlyStatusDesc",label:"投保状态"}}),e._v(" "),a("el-table-column",{attrs:{prop:"irInsPlyNos[0]",label:"投保单号1"}}),e._v(" "),a("el-table-column",{attrs:{prop:"irInsPlyNos[1]",label:"投保单号2"}}),e._v(" "),a("el-table-column",{attrs:{prop:"irCreateDate",label:"导入时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isInsuredProvName",label:"所属地区"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"95"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){e.show_detail(t.$index)}}},[e._v("查看详情")])]}}])})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total,sizes,prev, pager, next",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)],1)],1)],1)},s=[],r={render:i,staticRenderFns:s},o=r,u=a("VU/8"),c=l,p=u(n,o,!1,c,null,null);t.default=p.exports},"7Nzz":function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,"\n.el-pagination {\n    text-align: center;\n    margin-top: 30px;\n}\n/*.el-message-box__btns .cancel {*/\n/*float: right;*/\n/*margin-left: 10px;*/\n/*}*/\n/*title*/\n.title{\n    border-bottom: 1.5px solid #aaa;\n    margin-bottom: 20px;\n    padding-bottom: 10px;\n}\n/*!*修改样式*!*/\n.el-table .cell, .el-table th>div{\n    padding-left: 5px!important;\n    padding-right: 5px;\n    font-size:12.5px;\n}\n",""])},DqIK:function(e,t,a){var l=a("7Nzz");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("rjj0")("31b37351",l,!0)}});