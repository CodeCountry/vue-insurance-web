<template>
  <div class="custom-tree-container">
    <div class="block block_menu">
      <p style="font-size: 17px;text-align: center;margin: 10px auto 20px auto">菜单配置</p>
      <!--<p style="margin-bottom: 10px;height: 30px;">-->
        <!--<el-button type="primary" size="mini" style="float: left;" @click="handleAddNode()">添加根节点</el-button>-->
      <!--</p>-->
      
      <el-tree v-loading="loading"
        :data="data"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>
      <!--添加编辑节点-->
      <el-dialog title="添加/编辑节点" :visible.sync="dialogFormVisible" width="45%">
        <el-form ref="form" :label-position="labelPosition" label-width="150px" :model="form">
          <el-form-item label="菜单名(name)" prop="name" :rules="{ required: true, message: '请输入节点名', trigger: 'blur' }">
            <el-input v-model="form.name"  style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="图标(icon)" prop="icon">
            <el-input v-model="form.icon" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="链接(url)" prop="url">
            <el-input v-model="form.url" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="索引(index)" prop="index" :rules="{ required: true, message: '请输入索引', trigger: 'blur' }">
            <el-input v-model="form.index" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="叶子节点(leaf)" prop="leaf" :rules="{ required: true, message: '请选择是否是叶子节点', trigger: 'blur' }">
            <el-radio-group v-model="form.leaf" style="width:80%;">
              <el-radio :label="true" style="width:40%;">是</el-radio>
              <el-radio :label="false" style="width:40%;">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="权限(right)" prop="right">
            <el-select v-model="form.right" placeholder="权限" style="width: 80%;">
              <!--<el-option label="全部" value=""></el-option>-->
              <el-option v-for="item in rightArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="!edit_node" type="primary" @click="handleSave('form')" v-loading="editLoading">添加</el-button>
          <el-button v-else type="primary" @click="handleSave('form')" v-loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <!--end-->
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading:true,
        data:[],
        dialogFormVisible:false,   // 添加/编辑节点
        editLoading:false,         // 添加/编辑提交
        labelPosition: 'left',     // 靠左
        edit_node:true,            // true编辑,false添加
        form:{                 // 节点form
          name:'',
          icon:'',
          url:'',
          leaf:false,
          index:'',
          right:'',
        },
        formPost:{},
        rightArr:[],          // 权限下拉列表
      }
    },
    beforeCreate(){
      const self = this;
      self.$api.get('/menu/tree', null, r =>{
//        console.log(r.data);
        const arr = r.data;
        self.loading = false;
        if (r.code === 200) {
//          console.log(arr);
          self.data = [arr];
        }
      },res=>{
        this.$router.push({
          path: '/login',
        });
      });
      self.$api.get('/right/entity/Menu/type/View', null, r =>{       // 权限
        if(r.code === 200){
          const self = this;
          self.rightArr = r.data;
        }
      },res=>{
        this.$router.push({
          path: '/login',
        });
      })
    },
    methods: {
      renderContent:function(createElement, { node, data, store }) {             // 操作
        const self = this;
        return createElement('span',{attrs:{"class":"custom-tree-node"}}, [
          createElement('span', {attrs:{"class":"width16"}},data.name),
          createElement('span',{attrs:{"class":"width5"}}, data.index),
          createElement('span',{attrs:{"class":"width16"}}, data.url),
          createElement('span',{attrs:{"class":"width10"}}, data.icon),
          createElement('span',{attrs:{"class":"width20"}}, data.right.name),
          createElement('span',{attrs:{style:"float:right"}},[
            createElement('el-button',{attrs:{
              size:"mini",type:"primary",style:"margin-right:6px"
            },on:{
              click:function() {                  // 添加
                self.handleAdd(node.data);
//                console.log(node);
              }
            }},"添加子节点"),
            createElement('el-button',{attrs:{
              size:"mini",type:"primary",style:"margin-right:6px"
            },on:{
              click:function() {                  // 编辑
                self.editNode(node.data,node.parent.data);      // node.data为当前元素的数据，node.parent.data为父元素数据。
              }
            }},"编辑当前节点"),
            createElement('el-button',{attrs:{
              size:"mini",type:'danger'
            },on:{
              click:function() {              // 删除
                self.deleteNode(node.data);
              }
            }},"删除当前节点"),
          ]),
        ]);
      },
//      handleAddNode(){   // 添加根节点
//        this.dialogFormVisible = true;
//        this.form = {
//          name:'',
//          icon:'',
//          leaf:'',
//          url:'',
//          index:'',
//          right:'',
//        };
//        this.form.parent = {'id':this.data.id};
//        console.log(this.form.parent);
//      },
      handleAdd (row) {    // 添加节点
        this.dialogFormVisible = true;
        this.form = {
          name:'',
          icon:'',
          leaf:'',
          url:'',
          index:'',
          right:'',
        };
        this.form.parent = {'id':row.id}; // 获取父元素id
        this.edit_node = false;
      },
      editNode (row,rowParent) {    // 编辑节点
        this.dialogFormVisible = true;
        this.form = row;
        if(this.form.right.id !== null && this.form.right.id !== ''){   // 编辑时若不为空则给默认权限赋值。
          this.form.right = this.form.right.id;
        }else{
          this.form.right = '';                       // 若为空则赋值空
        }
        this.edit_node = true;
        this.form.parent = {'id':rowParent.id}; // 获取父元素id
        this.form.id = row.id;                  // 获取当前元素id
      },
      handleSave(form){             // 保存添加节点
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            self.formPost = self.form;
            self.formPost.itemIndex = self.form.index;     // index赋值
            self.formPost.right = {'id':self.form.right};   // 权限赋值
            console.log(self.formPost);
            self.$api.post('/menu', self.formPost, r => {
              if (r.code === 200) {
                self.$router.go(0);
                self.$message({
                  message: "操作成功！",
                  type: 'success'
                });
              } else {
                alert(r.message);
                self.loading = false;
              }
              self.form.right = self.formPost.right.id;
            }, res => {
              self.$router.push({
                path: '/login',
              });
            });
          }else{
          }
        });
      },
      deleteNode(row){    // 删除节点
        this.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          const self = this;
          self.form = Object.assign({}, row);
          console.log(self.form.id);
          self.$api.delete('/menu/' + self.form.id, null, r => {
            if (r.code === 200) {
              self.$message({
                message: "操作成功！",
                type: 'success'
              });
              self.$router.go(0);
            } else {
          
            }
            self.loading = false;
          }, res => {
            this.$router.push({
              path: '/login',
            });
          })
        }).catch(() => {
        });
      },
    }
  };
</script>

<style>
  .block_menu{
    width: 98%;
    margin: 0 auto;
  }
  .custom-tree-node {
    flex: 1;
    display: inline-block;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    text-align: left;
  }
  .el-tree-node__content{
    height:30px;
    border-bottom: 1px solid #eee;
  }
  .width20,.width16,.width10,.width5{
    display: inline-block;
    text-align: center;
    border-right:1px solid #eee;
    height:19px;
  }
  .width20{
    width:20%;
  }
  .width16{
    width:16%;
  }
  .width10{
    width:10%;
  }
  .width5{
    width:5%;
  }
</style>
