<template>
  <div>
    <el-button type="primary" class="tit" size="small" icon="el-icon-circle-plus-outline" @click="handleAdd">添加</el-button>
    <el-table v-loading="loading" :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="权限名"></el-table-column>
      <el-table-column prop="conditions" label="条件"></el-table-column>
      <el-table-column prop="entity" label="操作对象"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="createdAt" label="创建日期"></el-table-column>
      <el-table-column label="操作"  fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editRole(scope.$index, scope.row)">编辑权限</el-button>
          <!--<el-button type="primary" size="mini" @click="addAuthority(scope.$index, scope.row)">增加权限</el-button>-->
          <!--<el-button type="primary" size="mini" @click="addUser(scope.$index, scope.row)">增加用户</el-button>-->
          <el-button size="mini" type="danger" @click="deleteRole(scope.row)">删除权限</el-button>
          <!--<el-button size="mini" type="danger" @click="deleteAuthority(scope.row)">删除权限</el-button>-->
          <!--<el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除用户</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total,prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="编辑权限" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :label-position="labelPosition" label-width="110px" :rules="rules" :model="form">
        <el-form-item label="权限名" prop="name">
          <el-input v-model="form.name"  style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="条件" prop="conditions">
          <el-input v-model="form.conditions" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="操作对象" prop="entity">
          <el-input v-model="form.entity" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" style="width: 80%;">
            <el-option value="View"></el-option>
            <el-option value="Update"></el-option>
            <el-option value="New"></el-option>
            <el-option value="Delete"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSave('form')" v-loading="editLoading">修改</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],  // 表格数据
        form:{},
        rules: {
          name: [
            { required: true, message: '请输入权限名', trigger: 'blur' }
          ],
          conditions: [
            { required: true, message: '请输入条件', trigger: 'blur' }
          ],
          entity: [
            { required: true, message: '请输入操作对象', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请输入类型', trigger: 'blur' }
          ],
        },
        loading:false,
        total:0,
        pageSize:20,  // 一页显示几条数据
        currentPage: 1,
        dialogFormVisible:false,   // 编辑角色
        editLoading:false,         // 编辑提交
        labelPosition: 'left',    // 靠左
      }
    },
    created () {
      const self = this;
      self.$api.get('/right', null, r =>{
        console.log(r.data);
        if (r.code === 200) {
          this.getTable(r);
        }else{
          alert(r.message);
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
        self.total = r.data.total;
        self.tableData = r.data.content;
        console.log(self.tableData);
        for(let i = 0;i<self.tableData.length;i++){
          let date =  self.tableData[i].createdAt;
          self.tableData[i].createdAt = self.getDate(date);
        }
        self.loading = false;
      },
      handleAdd () {    // 添加
        this.$router.push('/add_right');
      },
      editRole (index, row) {    // 编辑
        this.dialogFormVisible = true;
        this.form = Object.assign({}, row);
        this.table_index = index;
      },
      handleSave (form) {            // 确认编辑提交
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            self.editLoading = true;
            self.$api.put('/right', self.form, r => {
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
      deleteRole(row){    // 删除
        this.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          const self = this;
          self.form = Object.assign({}, row);
          console.log(self.form.id);
          self.$api.delete('/right/' + self.form.id, null, r => {
            if (r.code === 200) {
              self.$message({
                message: "操作成功！",
                type: 'success'
              });
              self.$router.go(0);
              self.total = self.total - 1;
            } else {
              alert(r.message);
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
      handleCurrentChange(val) {      // 当前第几页
        const self = this;
        self.loading = true;
        self.currentPage = val;
        let param = {
          size: self.pageSize,
          page: self.currentPage-1
        };
        self.$api.get('/right',param, r =>{
          console.log(r.data);
          if (r.code === 200) {
            self.getTable(r);
            self.loading = false;
          }else{
            alert(r.message);
          }
          self.loading = false;
        },res=>{
          this.$router.push({
            path: '/login',
          });
        })
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
