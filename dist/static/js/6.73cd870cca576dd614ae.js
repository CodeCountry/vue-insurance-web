webpackJsonp([6],{ORD8:function(t,e,i){"use strict";function n(t){i("d7lH")}Object.defineProperty(e,"__esModule",{value:!0});var o=i("woOf"),r=i.n(o),a={data:function(){return{loading:!0,data:[],dialogFormVisible:!1,editLoading:!1,labelPosition:"left",edit_node:!0,form:{name:"",icon:"",url:"",leaf:!1,index:"",right:""},formPost:{},rightArr:[]}},beforeCreate:function(){var t=this,e=this;e.$api.get("/menu/tree",null,function(t){var i=t.data;e.loading=!1,200===t.code&&(e.data=[i])},function(e){t.$router.push({path:"/login"})}),e.$api.get("/right/entity/Menu/type/View",null,function(e){if(200===e.code){t.rightArr=e.data}},function(e){t.$router.push({path:"/login"})})},methods:{renderContent:function(t,e){var i=e.node,n=e.data,o=(e.store,this);return t("span",{attrs:{class:"custom-tree-node"}},[t("span",{attrs:{class:"width16"}},n.name),t("span",{attrs:{class:"width5"}},n.index),t("span",{attrs:{class:"width16"}},n.url),t("span",{attrs:{class:"width10"}},n.icon),t("span",{attrs:{class:"width20"}},n.right.name),t("span",{attrs:{style:"float:right"}},[t("el-button",{attrs:{size:"mini",type:"primary",style:"margin-right:6px"},on:{click:function(){o.handleAdd(i.data)}}},"添加子节点"),t("el-button",{attrs:{size:"mini",type:"primary",style:"margin-right:6px"},on:{click:function(){o.editNode(i.data,i.parent.data)}}},"编辑当前节点"),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(){o.deleteNode(i.data)}}},"删除当前节点")])])},handleAdd:function(t){this.dialogFormVisible=!0,this.form={name:"",icon:"",leaf:"",url:"",index:"",right:""},this.form.parent={id:t.id},this.edit_node=!1},editNode:function(t,e){this.dialogFormVisible=!0,this.form=t,null!==this.form.right.id&&""!==this.form.right.id?this.form.right=this.form.right.id:this.form.right="",this.edit_node=!0,this.form.parent={id:e.id},this.form.id=t.id},handleSave:function(t){var e=this;e.$refs[t].validate(function(t){t&&(e.formPost=e.form,e.formPost.itemIndex=e.form.index,e.formPost.right={id:e.form.right},console.log(e.formPost),e.$api.post("/menu",e.formPost,function(t){200===t.code?(e.$router.go(0),e.$message({message:"操作成功！",type:"success"})):(alert(t.message),e.loading=!1),e.form.right=e.formPost.right.id},function(t){e.$router.push({path:"/login"})}))})},deleteNode:function(t){var e=this;this.$confirm("确认删除吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",cancelButtonClass:"cancel"}).then(function(){var i=e;i.form=r()({},t),console.log(i.form.id),i.$api.delete("/menu/"+i.form.id,null,function(t){200===t.code&&(i.$message({message:"操作成功！",type:"success"}),i.$router.go(0)),i.loading=!1},function(t){e.$router.push({path:"/login"})})}).catch(function(){})}}},l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"custom-tree-container"},[i("div",{staticClass:"block block_menu"},[i("p",{staticStyle:{"font-size":"17px","text-align":"center",margin:"10px auto 20px auto"}},[t._v("菜单配置")]),t._v(" "),i("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.data,"default-expand-all":"","expand-on-click-node":!1,"render-content":t.renderContent}}),t._v(" "),i("el-dialog",{attrs:{title:"添加/编辑节点",visible:t.dialogFormVisible,width:"45%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"form",attrs:{"label-position":t.labelPosition,"label-width":"150px",model:t.form}},[i("el-form-item",{attrs:{label:"菜单名(name)",prop:"name",rules:{required:!0,message:"请输入节点名",trigger:"blur"}}},[i("el-input",{staticStyle:{width:"80%"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"图标(icon)",prop:"icon"}},[i("el-input",{staticStyle:{width:"80%"},model:{value:t.form.icon,callback:function(e){t.$set(t.form,"icon",e)},expression:"form.icon"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"链接(url)",prop:"url"}},[i("el-input",{staticStyle:{width:"80%"},model:{value:t.form.url,callback:function(e){t.$set(t.form,"url",e)},expression:"form.url"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"索引(index)",prop:"index",rules:{required:!0,message:"请输入索引",trigger:"blur"}}},[i("el-input",{staticStyle:{width:"80%"},model:{value:t.form.index,callback:function(e){t.$set(t.form,"index",e)},expression:"form.index"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"叶子节点(leaf)",prop:"leaf",rules:{required:!0,message:"请选择是否是叶子节点",trigger:"blur"}}},[i("el-radio-group",{staticStyle:{width:"80%"},model:{value:t.form.leaf,callback:function(e){t.$set(t.form,"leaf",e)},expression:"form.leaf"}},[i("el-radio",{staticStyle:{width:"40%"},attrs:{label:!0}},[t._v("是")]),t._v(" "),i("el-radio",{staticStyle:{width:"40%"},attrs:{label:!1}},[t._v("否")])],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"权限(right)",prop:"right"}},[i("el-select",{staticStyle:{width:"80%"},attrs:{placeholder:"权限"},model:{value:t.form.right,callback:function(e){t.$set(t.form,"right",e)},expression:"form.right"}},t._l(t.rightArr,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t.edit_node?i("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.editLoading,expression:"editLoading"}],attrs:{type:"primary"},on:{click:function(e){t.handleSave("form")}}},[t._v("修改")]):i("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.editLoading,expression:"editLoading"}],attrs:{type:"primary"},on:{click:function(e){t.handleSave("form")}}},[t._v("添加")]),t._v(" "),i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")])],1)],1)],1)])},s=[],d={render:l,staticRenderFns:s},c=d,f=i("VU/8"),m=n,u=f(a,c,!1,m,null,null);e.default=u.exports},d7lH:function(t,e,i){var n=i("lywt");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("3abe0bf2",n,!0)},lywt:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,"\n.block_menu{\n  width: 98%;\n  margin: 0 auto;\n}\n.custom-tree-node {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: inline-block;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  font-size: 14px;\n  padding-right: 8px;\n  text-align: left;\n}\n.el-tree-node__content{\n  height:30px;\n  border-bottom: 1px solid #eee;\n}\n.width20,.width16,.width10,.width5{\n  display: inline-block;\n  text-align: center;\n  border-right:1px solid #eee;\n  height:19px;\n}\n.width20{\n  width:20%;\n}\n.width16{\n  width:16%;\n}\n.width10{\n  width:10%;\n}\n.width5{\n  width:5%;\n}\n",""])}});