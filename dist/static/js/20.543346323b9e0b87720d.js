webpackJsonp([20],{O31c:function(e,t,a){"use strict";function l(e){a("XVZL")}Object.defineProperty(t,"__esModule",{value:!0});var n=a("woOf"),o=a.n(n),i={data:function(){return{formInline:{keySearch:""},labelPosition:"left",tableData:[],loading:!0,total:1,pageSize:20,currentPage:1,value1:"",select:!1,editLoading:!1,dialogFormVisible:!1,form:{name:"",fullName:"",email:"",mobile:""},rules:{name:[{required:!0,message:"请输入账号",trigger:"blur"}],fullName:[{required:!0,message:"请输入姓名",trigger:"blur"}],email:[{type:"email",message:"请输入正确的邮箱地址",trigger:"blur,change"}],mobile:[{required:!0,validate:function(e,t,a){if(!t.match(/^1[34578]\d{9}$/))return a(new Error("请输入正确的手机号"))},message:"请输入手机号",trigger:"blur,change"}]}}},created:function(){var e=this;this.$api.get("/user",null,function(t){console.log(t.data),200===t.code?e.getTable(t.data):alert(t.message)},function(t){e.$router.push({path:"/login"})})},methods:{onSubmit:function(){var e=this,t=this;t.formInline.keySearch=t.formInline.keySearch.replace(/[\s*]/g,""),""===t.formInline.keySearch||null===t.formInline.keySearch||void 0===t.formInline.keySearch?console.log(t.formInline.keySearch):(t.select=!0,t.loading=!0,t.$api.get("/user/keyword/"+t.formInline.keySearch,null,function(t){200===t.code?e.getTable(t.data):alert(t.message)},function(t){e.$router.push({path:"/login"})}))},getTable:function(e){var t=this;t.total=e.total,t.tableData=e.content,console.log(t.tableData);for(var a=0;a<t.tableData.length;a++){var l=t.tableData[a].createdAt;t.tableData[a].createdAt=t.getDate(l),t.tableData[a].locked?t.tableData[a].locked="是":t.tableData[a].locked="否",t.tableData[a].expired?t.tableData[a].expired="是":t.tableData[a].expired="否"}t.loading=!1},handleEdit:function(e,t){this.dialogFormVisible=!0,this.form=o()({},t),this.table_index=e},handleAdd:function(){this.$router.push("/add_user")},handleSave:function(e){var t=this;t.$refs[e].validate(function(e){e&&(t.editLoading=!0,t.$api.put("/user",t.form,function(e){200===e.code?(alert(e.message),t.editLoading=!1,t.$router.go(0),t.$message({message:"操作成功！",type:"success"})):(alert(e.message),t.editLoading=!1)},function(e){t.$router.push({path:"/login"})}))})},handleDelete:function(e){var t=this;this.$confirm("确认删除吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",cancelButtonClass:"cancel"}).then(function(){var a=t;a.form=o()({},e),console.log(a.form.id),a.$api.get("/user/discard/"+a.form.id,null,function(e){200===e.code?(alert(e.message),a.$router.go(0),a.total=a.total-1):alert(e.message),a.loading=!1},function(e){t.$router.push({path:"/login"})})}).catch(function(){})},handleUnLocking:function(e){var t=this,a=this;a.form=o()({},e),console.log(a.form.id),a.$api.get("/user/unlocking_account/"+a.form.id,null,function(e){200===e.code?(a.$message({message:"操作成功！",type:"success"}),a.$router.go(0)):alert(e.message),a.loading=!1},function(e){t.$router.push({path:"/login"})})},handleCurrentChange:function(e){var t=this,a=this;a.currentPage=e,console.log(a.currentPage);var l=void 0;l={size:a.pageSize,page:a.currentPage-1},a.$api.get("/user",l,function(e){200===e.code?t.getTable(e.data):alert(e.message)},function(e){t.$router.push({path:"/login"})})}}},r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"关键字搜索"}},[a("el-input",{attrs:{placeholder:"关键字搜索"},model:{value:e.formInline.keySearch,callback:function(t){e.$set(e.formInline,"keySearch",t)},expression:"formInline.keySearch"}})],1),e._v(" "),a("span",{staticClass:"button_center"},[a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:e.onSubmit}},[e._v("查询")]),e._v(" "),a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary",size:"small",icon:"el-icon-circle-plus-outline"},on:{click:e.handleAdd}},[e._v("添加")])],1)],1),e._v(" "),a("div",{staticClass:"title"},[e._v("用户列表")]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{type:"selection"}}),e._v(" "),a("el-table-column",{attrs:{type:"index",label:"序号",width:"60"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"账号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"fullName",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createdAt",label:"创建日期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),e._v(" "),a("el-table-column",{attrs:{prop:"mobile",label:"手机号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"locked",label:"是否被锁",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"expired",label:"是否过期",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.handleUnLocking(t.row)}}},[e._v("账户解锁")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total,prev, pager, next",total:e.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改用户",visible:e.dialogFormVisible,width:"30%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-position":e.labelPosition,"label-width":"90px"}},[a("el-form-item",{attrs:{label:"账号",prop:"name"}},[a("el-input",{staticStyle:{width:"70%"},attrs:{disabled:"disabled"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名",prop:"fullName"}},[a("el-input",{staticStyle:{width:"70%"},model:{value:e.form.fullName,callback:function(t){e.$set(e.form,"fullName",t)},expression:"form.fullName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{staticStyle:{width:"70%"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[a("el-input",{staticStyle:{width:"70%"},model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.editLoading,expression:"editLoading"}],attrs:{type:"primary"},on:{click:function(t){e.handleSave("form")}}},[e._v("修改")]),e._v(" "),a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")])],1)],1)],1)},s=[],c={render:r,staticRenderFns:s},u=c,m=a("VU/8"),d=l,p=m(i,u,!1,d,null,null);t.default=p.exports},XVZL:function(e,t,a){var l=a("mFOn");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("rjj0")("2a64f0ba",l,!0)},mFOn:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,"\n.el-pagination {\n    text-align: center;\n    margin-top: 30px;\n}\n.el-message-box__btns .cancel {\n    float: right;\n    margin-left: 10px;\n}\n.title{\n    border-bottom: 1.5px solid #aaa;\n    margin-bottom: 20px;\n    padding-bottom: 10px;\n}\n/*修改样式*/\n.el-table .cell, .el-table th>div{\n    padding-left: 5px;\n    padding-right: 5px;\n    font-size:12.5px;\n    text-align: center;\n}\n.content .el-dialog{\n    min-width:400px;\n}\n.el-button--mini, .el-button--mini.is-round {\n    padding: 5px 7px;\n}\n",""])}});