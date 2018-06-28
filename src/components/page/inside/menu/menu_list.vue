<template>
  <div>
    <el-button type="primary" class="tit" size="small" icon="el-icon-circle-plus-outline" @click="handleAdd('form')">添加</el-button>
    <el-table v-loading="loading" :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="节点名"></el-table-column>
      <el-table-column prop="icon" label="图标"></el-table-column>
      <el-table-column prop="leaf" label="是否是子节点"></el-table-column>
      <el-table-column label="操作"  fixed="right" width="280">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editNode(scope.$index, scope.row)">编辑当前节点</el-button>
          <el-button type="primary" size="mini" @click="showChild(scope.$index, scope.row)">查看子节点</el-button>
          <el-button size="mini" type="danger" @click="deleteNode(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加编辑节点-->
    <el-dialog title="添加/编辑节点" :visible.sync="dialogFormVisible" width="45%">
      <el-form ref="form" :label-position="labelPosition" label-width="150px" :model="form">
        <el-form-item label="节点名" prop="name" :rules="{ required: true, message: '请输入节点名', trigger: 'blur' }">
          <el-input v-model="form.name"  style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" :rules="{ required: true, message: '请输入图标名', trigger: 'blur' }">
          <el-input v-model="form.icon" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="是否是子节点" prop="leaf" :rules="{ required: true, message: '请选择是否为子节点', trigger: 'blur' }">
          <el-radio-group v-model="form.leaf">
            <el-radio label="是" value="true"></el-radio>
            <el-radio label="否" value="false"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!edit_node" type="primary" @click="handleSaveAdd('form')" v-loading="editLoading">添加</el-button>
        <el-button v-else type="primary" @click="handleSave('form')" v-loading="editLoading">修改</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!--end-->
    <!--子节点列表-->
    <el-dialog title="子节点" :visible.sync="dialogChild" width="80%" style="min-width: 800px">
      <el-button type="primary" class="tit" size="small" icon="el-icon-circle-plus-outline" @click="handleAddChild">添加</el-button>
      <el-table :data="tableDataChild" border style="width:100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="节点名"></el-table-column>
        <el-table-column prop="icon" label="图标"></el-table-column>
        <el-table-column prop="url" label="url路径"></el-table-column>
        <el-table-column prop="leaf" label="是否是子节点"></el-table-column>
        <el-table-column label="操作"  fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editChild(scope.$index, scope.row)">编辑当前节点</el-button>
            <el-button size="mini" type="danger" @click="deleteNodeChild(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogChild = false">关闭</el-button>
      </div>
    </el-dialog>
    <!--添加编辑子节点-->
    <el-dialog title="添加/编辑子节点" :visible.sync="editFormChild" width="45%">
      <el-form ref="formChild" :label-position="labelPosition" label-width="150px" :model="formChild">
        <el-form-item label="子节点名" prop="name" :rules="{ required: true, message: '请输入子节点名', trigger: 'blur' }">
          <el-input v-model="formChild.name"  style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="url" prop="url" :rules="{ required: true, message: '请输入url', trigger: 'blur' }">
          <el-input v-model="formChild.url" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="是否是子节点" prop="leaf" :rules="{ required: true, message: '请选择是否是子节点', trigger: 'blur' }">
          <el-radio-group v-model="formChild.leaf">
            <el-radio label="是" value="true"></el-radio>
            <el-radio label="否" value="false"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="!edit_child" type="primary" @click="handleSaveAddChild('formChild')" v-loading="editLoading">添加</el-button>
        <el-button v-else type="primary" @click="handleSaveChild('formChild')" v-loading="editLoading">修改</el-button>
        <el-button @click="editFormChild = false">取消</el-button>
      </div>
    </el-dialog>
    <!--end-->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],          // 一级节点表格数据
        tableDataChild:[],      // 子节点表格数据
        form:{                 // 一级节点form
          name:'',
          icon:'',
          leaf:'',
        },
        formChild:{              // 子节点form
          name:'',
          url:'',
          leaf:''
        },
        loading:false,
        dialogFormVisible:false,   // 添加/编辑节点
        dialogChild:false,         // 查看子节点
        editLoading:false,         // 编辑提交
        editFormChild:false,       // 添加/编辑子节点
        labelPosition: 'left',     // 靠左
        edit_node:true,            // 编辑
        edit_child:true,           // 编辑子节点
      }
    },
    created () {
      const self = this;
      self.$api.get('https://easy-mock.com/mock/5a12764bef842836ae773582/code/menu/root', null, r =>{
        console.log(r.data);
        if (r.code === 200) {
          this.getTable(r);
        }
      },res=>{
        this.$router.push({
          path: '/login',
        });
      })
    },
    methods:{
      getTable(r){
        const self = this;
        self.tableData = r.data;
        console.log(self.tableData);
        self.loading = false;
        for(let i = 0;i<self.tableData.length;i++){
          if(self.tableData[i].leaf){
            self.tableData[i].leaf = "是"
          }else{
            self.tableData[i].leaf = "否"
          }
        }
        console.log(self.tableData);
      },
      handleAdd () {    // 添加根节点
        this.dialogFormVisible = true;
        this.form = {
          name:'',
          icon:'',
          leaf:''
        };
        this.edit_node = false;
      },
      editNode (index, row) {    // 编辑根节点
        this.dialogFormVisible = true;
        this.form = Object.assign({}, row);
        this.table_index = index;
        this.edit_node = true;
      },
      handleSaveAdd(form){             // 保存添加根节点
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            self.editLoading = true;
            console.log(self.form);
            self.$api.post('/', self.form, r => {
              if (r.code === 200) {
                self.editLoading = false;
                self.$router.go(0);
                self.$message({
                  message: "操作成功！",
                  type: 'success'
                });
              } else {
                alert(r.message);
                self.editLoading = false;
              }
            }, res => {
              self.$router.push({
                path: '/login',
              });
            });
          }else{
          }
        });
      },
      handleSave (form) {            // 确认编辑提交根节点
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            self.editLoading = true;
            console.log(self.form);
            self.$api.put('/', self.form, r => {
              if (r.code === 200) {
                self.editLoading = false;
                self.$router.go(0);
                self.$message({
                  message: "操作成功！",
                  type: 'success'
                });
              } else {
                alert(r.message);
                self.editLoading = false;
              }
            }, res => {
              self.$router.push({
                path: '/login',
              });
            });
          }else{
          }
        });
      },
      deleteNode(row){    // 删除根节点
        this.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          const self = this;
          self.form = Object.assign({}, row);
          console.log(self.form.id);
          self.$api.delete('//' + self.form.id, null, r => {
            if (r.code === 200) {
              self.$message({
                message: "操作成功！",
                type: 'success'
              });
              self.$router.go(0);
              self.total = self.total - 1;
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
  
      showChild(index,row){     // 查看子节点
        const self = this;
        self.dialogChild = true;
        console.log(row);
        self.tableDataChild = row.items;
        for(let i = 0;i<self.tableDataChild.length;i++){
          if(self.tableDataChild[i].leaf){
            self.tableDataChild[i].leaf = "是"
          }else{
            self.tableDataChild[i].leaf = "否"
          }
        }
        console.log(self.tableDataChild);
      },
      handleAddChild(){                // 添加子节点
        this.editFormChild = true;
        this.formChild = {
          name:'',
          leaf:'',
          url:'',
        };
        this.edit_child = false;
      },
      handleSaveAddChild(formChild){             // 保存添加子节点
        const self = this;
        self.$refs[formChild].validate((valid)=> {
          if (valid) {
            self.editLoading = true;
            console.log(self.formChild);
            self.$api.post('/', self.formChild, r => {
              if (r.code === 200) {
                self.editLoading = false;
                self.$router.go(0);
                self.$message({
                  message: "操作成功！",
                  type: 'success'
                });
              } else {
                alert(r.message);
                self.editLoading = false;
              }
            }, res => {
              self.$router.push({
                path: '/login',
              });
            });
          }else{
          }
        });
      },
      editChild(index,row){                    // 编辑子节点
        this.editFormChild = true;
        this.formChild = Object.assign({}, row);
        this.table_index = index;
        this.edit_child = true;
      },
      handleSaveChild(formChild){               // 保存编辑子节点
        const self = this;
        self.$refs[formChild].validate((valid)=> {
          if (valid) {
            self.editLoading = true;
            console.log(self.formChild);
            self.$api.post('/', self.formChild, r => {
              if (r.code === 200) {
                self.editLoading = false;
                self.$router.go(0);
                self.$message({
                  message: "操作成功！",
                  type: 'success'
                });
              } else {
                alert(r.message);
                self.editLoading = false;
              }
            }, res => {
              self.$router.push({
                path: '/login',
              });
            });
          }else{
          }
        });
      },
      deleteNodeChild(){                    // 删除子节点
        this.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          const self = this;
          self.formChild = Object.assign({}, row);
          console.log(self.formChild.id);
          self.$api.delete('//' + self.formChild.id, null, r => {
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
      }
    }
  }
</script>
<style>
  .block{
    text-align: center;
    margin-top: 10px;
  }
</style>
