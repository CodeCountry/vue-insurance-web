<template>
    <section>
        <el-row>
            <el-col :span="24">
                <!--表单-->
                <!--<el-form :inline="true" :model="formInline" class="demo-form-inline">-->
                  <!--<el-form-item label="关键字搜索">-->
                    <!--<el-input placeholder="关键字搜索" v-model="formInline.keySearch"></el-input>-->
                  <!--</el-form-item>-->
                  <!--<span class="button_center">-->
                    <!--<el-button type="primary" size="small" icon="el-icon-search" @click="onSubmit">查询</el-button>-->
                    <el-button type="primary" size="small" style="margin-bottom:20px " icon="el-icon-circle-plus-outline" @click="handleAdd()">添加</el-button>
                  <!--</span>-->
                <!--</el-form>-->
                <!--表格-->
                <el-table  v-loading="loading" :data="tableData" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="createdAt" label="创建日期"></el-table-column>
                    <el-table-column prop="code" label="保障产品编号"></el-table-column>
                    <el-table-column prop="name" label="保障名称"></el-table-column>
                    <el-table-column prop="category" label="险种" width="100"></el-table-column>
                    <el-table-column prop="holderName" label="投保人" ></el-table-column>
                    <el-table-column prop="coverage" label="保额" width="80"></el-table-column>
                    <el-table-column prop="span" label="期数(月)" width="70"></el-table-column>
                    <el-table-column label="上下架" width="70">
                      <template slot-scope="scope">
                        <span v-if="scope.row.active" class="blue">是</span>
                        <span v-else class="red">否</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作"  fixed="right" width="300">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="show_detail(scope.$index)">查看路由</el-button>
                            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="primary" @click="show_history(scope.$index)">历史版本</el-button>
                            <el-button type="primary" v-if="!scope.row.active"  size="mini" @click="handleModifyStatus(scope.row)">上架</el-button>
                            <el-button type="danger" v-else   size="mini" @click="handleModifyStatus(scope.row)">下架</el-button>
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
            </el-col>
        </el-row>
        <el-dialog title="修改保障产品信息" :visible.sync="dialogFormVisible" width="40%">
          <el-form ref="form" :label-position="labelPosition" label-width="150px" :rules="rules" :model="form">
            <el-form-item label="保障产品编号" prop="code">
              <el-input v-model="form.code" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="保障名称" prop="name">
              <el-input v-model="form.name" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item label="投保人" prop="holderId">
              <el-select v-model="form.holderId" style="width: 90%;">
                <el-option v-for="item in titleArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保额" prop="coverage">
              <el-input v-model="form.coverage" style="width: 80%;"></el-input>
            </el-form-item>
            <el-form-item label="是否是赠险" prop="free">
              <el-radio-group v-model="form.free">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="期数（月）" prop="span">
              <el-input v-model="form.span" style="width: 80%;"></el-input>
            </el-form-item>
            <el-form-item label="险种" prop="category">
              <el-select v-model="form.category">
                <el-option v-for="item in categoryOption" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优先级" prop="priority">
              <el-input v-model="form.priority" style="width: 80%;"></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="intro">
              <el-input v-model="form.intro" style="width: 80%;"></el-input>
            </el-form-item>
            <el-form-item label="是否支持微信进件" prop="wechatSupported">
              <el-radio-group v-model="form.wechatSupported">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="适用范围" prop="scope">
              <el-input v-model="form.scope" type="textarea" :rows="4" style="width: 90%;"></el-input>
            </el-form-item>
          </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSave('form')" v-loading="editLoading">修改</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    export default {
        data () {
            return {
              isRed:false,
              isBlue:false,
              labelPosition: 'left',
              formInline: {    // 查询
                keySearch:''
              },
              tableData: [],  // 表格数据
              titleArr:[],    // 投保人下拉列表
              categoryOption:[],  // 险种下拉
              loading: true,
              editLoading:false,
              total:0,
              pageSize:20,  // 一页显示几条数据
              currentPage: 1,
              select:false,  // 是否进行了查询操作。
              dialogFormVisible:false, // 弹框
              form: {
              },
              rules: {
                code: [
                  { required: true, message: '请输入保障产品编号', trigger: 'blur' }
                ],
                name: [
                  { required: true, message: '请输入保障名称', trigger: 'blur' }
                ],
                holderId: [
                  { required: true, message: '请选择投保人', trigger: 'blur' }
                ],
                coverage: [
                  { required: true, message: '请输入保额', trigger: 'blur' }
                ],
                category:[
                  {required:true, message:'请选择险种',trigger:'blur'},
                ],
                span: [
                  { required: true, message: '请输入期数（月）', trigger: 'blur' }
                ],
                priority: [
                  { required: true, message: '请输入优先级', trigger: 'blur' }
                ],
                wechatSupported: [
                  { required: true, message: '请选择是否支持微信进件', trigger: 'blur' }
                ],
                free: [
                  { required: true, message: '请选择是否是赠险', trigger: 'blur' }
                ],
                intro: [
                  { required: true, message: '请输入介绍', trigger: 'blur' }
                ],
                scope: [
                  { required: true, message: '请输入作用范围', trigger: 'blur' }
                ],
              },
            };
        },
        created () {
            const self = this;
            self.$api.get('/product', null, r =>{
                console.log(r.data);
                if (r.code === 200) {
                    self.getTable(r); // 表格赋值及分页
                    console.log(self.tableData);
                }else{
                    alert(r.message);
                }
                self.loading = false;
            },res=>{
                this.$router.push({
                    path: '/login',
                });
            });
            self.$api.get('/holder/option/all',null,r => {          // 投保人下拉
                if(r.code === 200){
                    self.titleArr = r.data;
                }
            }, res => {
                this.$router.push({
                    path: '/login',
                });
            });
            self.$api.get('/insurerproduct/insuranceCategory',null,r=>{     // 险种下拉列表
              console.log(r.data);
              if(r.code===200){
                self.categoryOption = r.data;
              }else{
                alert(r.message);
              }
            },res=>{
              self.$router.push('/login');
            })
        },
        methods: {
            // 表格赋值
            getTable(r){
                const self = this;
                self.total = r.data.total;
                self.tableData = r.data.content;
                self.loading = false;
                for(let i = 0;i<self.tableData.length;i++){
                    let date =  self.tableData[i].createdAt;
                    self.tableData[i].createdAt = self.getDate(date);
                    self.tableData[i].holderName = self.tableData[i].holder.name;
                    self.tableData[i].holderId = self.tableData[i].holder.id;
                }
            },
            onSubmit () {   // 查询
              const self = this;
              self.formInline.keySearch = self.formInline.keySearch.replace(/[\s*]/g,"");
              if(self.formInline.keySearch === "" || self.formInline.keySearch === null || self.formInline.keySearch === undefined) {
                console.log(self.formInline.keySearch);
              }else{
                self.select = true;
                self.loading = true;
                self.$api.get('/product/keyword/'+ self.formInline.keySearch, null, r =>{
                  if (r.code === 200) {
                    this.getTable(r.data);
                  }else{
                    alert(r.message);
                  }
                },res=>{
                  this.$router.push({
                    path: '/login',
                  });
                })
              }
            },
            show_detail(index) {     // 查看路由信息
                localStorage.removeItem('product');
                let data = {'id':this.tableData[index].id,'productName':this.tableData[index].name};
                data = JSON.stringify(data);
                localStorage.setItem('product',data);
                this.$router.push({
                    path: '/product_detail',
                })
            },
            show_history(index){      // 历史版本
              localStorage.removeItem('product');
              let data = {'id':this.tableData[index].id,'productName':this.tableData[index].name};
              data = JSON.stringify(data);
              localStorage.setItem('product',data);
              this.$router.push({
                path: '/product_history',
              })
            },
            handleModifyStatus(row){   // 上下架
              const self = this;
              self.form = Object.assign({}, row);
//              if(self.form.active === "是"){
//                self.form.active = true;
//              }else{
//                self.form.active = false;
//              }
              // 字符串转布尔。
//              self.form.active =  eval(self.form.active.toLowerCase());
              self.$api.post('/product/activation/'+self.form.id+'/'+ !self.form.active, null, r => {
                if (r.code === 200) {
                  self.$message({
                    message: "操作成功！",
                    type: 'success'
                  });
                  self.$router.go(0);
                } else {
                  alert(r.message);
                }
              }, res => {
                self.$router.push({
                  path: '/login',
                });
              });
            },
            handleAdd () {    // 添加
              this.$router.push('/add_prod');
            },
            handleEdit (index, row) {    // 编辑
              const self = this;
              self.dialogFormVisible = true;
              self.form = Object.assign({}, row);
              self.table_index = index;
            },
            handleSave (form) {            // 确认编辑提交
              const self = this;
              let params = {
                code:self.form.code,
                name:self.form.name,
                holderId:self.form.holderId,
                coverage:self.form.coverage,
                free:self.form.free,
                span:self.form.span,
                category:self.form.category,
                priority:self.form.priority,
                intro:self.form.intro,
                wechatSupported:self.form.wechatSupported,
                scope:self.form.scope,
              };
              self.$refs[form].validate((valid)=> {
                if (valid) {
                  self.editLoading = true;
                  self.$api.put('/product', params, r => {
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
            handleDelete(row){    // 删除
              this.$confirm('确认删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                cancelButtonClass: 'cancel'
              }).then(() => {
                const self = this;
                self.form = Object.assign({}, row);
                console.log(self.form.id);
                self.$api.delete('/product/' + self.form.id, null, r => {
                  if (r.code === 200) {
                    this.$message({
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
                }
                self.$api.get('/product',param, r =>{
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
    };
</script>
<style>
    .el-pagination {
        text-align: center;
        margin-top: 30px;
    }
    /*title*/
    .title{
        border-bottom: 1.5px solid #aaa;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }
    /*修改样式*/
    .el-table .cell, .el-table th>div{
        padding-left: 5px!important;
        padding-right: 5px;
        font-size:12.5px;
        text-align: center;
    }
    .el-button+.el-button{
      margin: 0!important;
    }
</style>
