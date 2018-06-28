<template>
  <div>
    <el-button type="primary" class="tit" size="small" icon="el-icon-circle-plus-outline" @click="handleAdd">添加</el-button>
    <el-table v-loading="loading" :data="tableData" border style="width:100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="name" label="保险公司名"></el-table-column>
      <el-table-column prop="intro" label="介绍"></el-table-column>
      <el-table-column prop="createdAt" label="创建日期"></el-table-column>
      <el-table-column label="操作"  fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
    <el-dialog title="编辑保险公司" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :label-position="labelPosition" label-width="110px" :rules="rules" :model="form">
        <el-form-item label="保险公司名" prop="name">
          <el-input v-model="form.name"  style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="intro">
          <el-input v-model="form.intro" style="width: 80%;"></el-input>
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
    data () {
      return {
        labelPosition:'left',
        loading:true,
        editLoading:false,
        form:{},
        tableData:[],
        dialogFormVisible:false,
        currentPage:1,
        pageSize:20,
        total:0,
        rules:{
          name:[
            {required:true,message:'请输入保险公司名',trigger:'blur'},
          ],
          intro:[
            {required:true,message:'请输入介绍',trigger:'blur'}
          ]
        }
      }
    },
    created(){
      const self = this;
      self.$api.get('/insurer',null,r=>{
        console.log(r.data);
        if(r.code === 200){
          self.getTable(r);
        }else{
          alert(r.message);
        }
        self.loading = false;
      },res=>{
        self.$router.push('/login');
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
      handleAdd(){
        this.$router.push('/add_insurance');
      },
      handleEdit(row){
        const self = this;
        self.dialogFormVisible = true;
        self.form = Object.assign({},row);
      },
      handleSave(form){
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            self.editLoading = true;
            self.$api.put('/insurer', self.form, r => {
              if (r.code === 200) {
                self.$message({
                  message: '操作成功！',
                  type: 'success'
                })
                self.dialogFormVisible = false;
                self.editLoading = false;
                self.$router.go(0);
              } else {
                alert(r.message);
              }
            }, res => {
              self.$router.push('/login');
            })
          }else{}
        })
      },
      handleDelete(row){
        const self = this;
        self.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          self.form = Object.assign({}, row);
          self.$api.delete('/insurer/'+self.form.id,null,r=>{
            if(r.code === 200){
              self.$message({
                message:'操作成功！',
                type:'success'
              })
              self.$router.go(0);
            }else{
              alert(r.message);
            }
          },res=>{
            self.$router.push('/login');
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
        self.$api.get('/insurer',param, r =>{
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
