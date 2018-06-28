<template>
  <div>
    <el-button type="primary" class="tit" size="small" icon="el-icon-circle-plus-outline" @click="handleAdd">添加</el-button>
    <el-table  v-loading="loading" :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="角色名"></el-table-column>
      <el-table-column prop="createdAt" label="创建日期"></el-table-column>
      <el-table-column label="操作"  fixed="right" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.$index)">查看角色详情</el-button>
          <el-button type="primary" size="mini" @click="editRole(scope.$index, scope.row)">编辑角色</el-button>
          <!--<el-button type="primary" size="mini" @click="addAuthority(scope.$index, scope.row)">增加权限</el-button>-->
          <!--<el-button type="primary" size="mini" @click="addUser(scope.$index, scope.row)">增加用户</el-button>-->
          <el-button size="mini" type="danger" @click="deleteRole(scope.row)">删除角色</el-button>
          <!--<el-button size="mini" type="danger" @click="deleteAuthority(scope.row)">删除权限</el-button>-->
          <!--<el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除用户</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <!--<div class="block">-->
      <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page.sync="currentPage"-->
        <!--:page-size="pageSize"-->
        <!--layout="total,prev, pager, next"-->
        <!--:total="total">-->
      <!--</el-pagination>-->
    <!--</div>-->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :label-position="labelPosition" label-width="110px" :rules="rules" :model="form">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="form.name" style="width: 80%;"></el-input>
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
        form:{
        
        },
        loading: true,
        rules: {
          name: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ],
        },
//        total:'',
//        pageSize:20,  // 一页显示几条数据
//        currentPage: 1,
        dialogFormVisible:false,   // 编辑角色
        editLoading:false,         // 编辑提交
        labelPosition: 'left',    // 靠左
      }
    },
    created () {
      const self = this;
      self.$api.get('/role/all', null, r =>{
        console.log(r.data);
        if (r.code === 200) {
          this.getTable(r.data);
        }else{
          alert(r.message);
        }
        self.loading = false;
      },res=>{
        this.$router.push({
          path: '/login',
        });
      })
    },
    methods:{
      getTable(data){
        const self = this;
        self.total = data.total;
//        self.tableData = data.content;
        self.tableData = data;
        console.log(self.tableData);
        for(let i = 0;i<self.tableData.length;i++){
          let date =  self.tableData[i].createdAt;
          self.tableData[i].createdAt = self.getDate(date);
        }
        self.loading = false;
      },
      handleDetail(index){
        localStorage.removeItem('roleId');
        localStorage.setItem('roleId',this.tableData[index].id);
        this.$router.push({
          path: '/role_detail',
        })
      },
      handleAdd () {    // 添加
        this.$router.push('/add_role');
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
            self.$api.put('/role', self.form, r => {
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
          self.$api.delete('/role/' + self.form.id, null, r => {
            if (r.code === 200) {
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
//      handleCurrentChange(val) {      // 当前第几页
//        const self = this;
//        self.loading = true;
//        self.currentPage = val;
//        let param = {
//          size: self.pageSize,
//          page: self.currentPage
//        };
//        self.$api.get('/role',param, r =>{
//          console.log(r.data);
//          if (r.code === 200) {
//            self.getTable(r);
//            self.loading = false;
//          }else{
//          }
//          self.loading = false;
//        },res=>{
//          this.$router.push({
//            path: '/login',
//          });
//        })
//      }
    }
  }
</script>
<style>
  .block{
    text-align: center;
    margin-top: 10px;
  }
</style>
