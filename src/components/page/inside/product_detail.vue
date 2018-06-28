<template>
    <div>
      <el-button type="primary" size="small" style="margin-bottom:20px " icon="el-icon-circle-plus-outline" @click="handleAdd()">添加</el-button>
      <el-table v-loading="loading" :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="路由名称"></el-table-column>
        <el-table-column prop="intro" label="路由介绍" ></el-table-column>
        <el-table-column prop="product" label="保障产品"></el-table-column>
        <el-table-column prop="insurerProduct" label="保险产品"></el-table-column>
        <el-table-column prop="priority" label="优先级"></el-table-column>
        <el-table-column prop="conditions" label="触发条件"></el-table-column>
        <el-table-column label="上下架">
          <template slot-scope="scope">
            <span v-if="scope.row.active" class="blue">是</span>
            <span v-else class="red">否</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  fixed="right" width="150">
          <template slot-scope="scope">
            <el-button type="primary" v-if="!scope.row.active" size="mini" @click="handleModifyStatus(scope.row)">上架</el-button>
            <el-button type="danger" v-else  size="mini" @click="handleModifyStatus(scope.row)">下架</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改路由信息" :visible.sync="dialogRouter" width="30%">
        <el-form ref="form" :label-position="labelPosition" label-width="110px" :rules="rules" :model="form">
          <el-form-item label="路由名称" prop="name">
            <el-input v-model="form.name" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="路由介绍" prop="intro">
            <el-input v-model="form.intro" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="保障产品" prop="product">
            <el-input v-model="form.product" style="width: 80%;" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="保险产品" prop="insurerProduct">
            <el-select v-model="form.insurerProduct" placeholder="保险产品">
              <el-option v-for="item in titleArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优先级" prop="priority">
            <el-input v-model="form.priority" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="触发条件" prop="conditions">
            <el-input type="textarea" v-model="form.conditions"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSave('form')" v-loading="editLoading">修改</el-button>
          <el-button @click="dialogRouter = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              loading: true,
              editLoading: false,
              labelPosition: 'left',
              tableData: [],
              form: {
              },
              rules: {
                name: [
                  { required: true, message: '请输入路由名称', trigger: 'blur' }
                ],
                intro: [
                  { required: true, message: '请输入路由介绍', trigger: 'blur' }
                ],
                product: [
                  { required: true, message: '请输入保障产品', trigger: 'blur' }
                ],
                insurerProduct: [
                  { required: true, message: '请选择保险公司', trigger: 'blur' }
                ],
                priority: [
                  { required: true, message: '请输入优先级', trigger: 'blur' }
                ],
                conditions: [
                  { required: true, message: '请输入条件范围', trigger: 'blur' }
                ],
              },
              titleArr:[],  // 下拉列表
              dialogRouter:false,
            }
        },
        created(){
            const self = this;
            self.loading = false;
            self.form.productId =JSON.parse(localStorage.getItem('product')).id;
            console.log(self.form.productId);
            self.$api.get('/product/'+self.form.productId, null, r =>{
                console.log(r.data.routes);
                if (r.code === 200) {
                    self.loading = false;
                    self.getTable(r); // 表格赋值及分页
//                    for(let i = 0;i<r.data.routes.length;i++){
//                        if(r.data.routes[i].active){
//                          r.data.routes[i].active = '是'
//                        }else{
//                          r.data.routes[i].active = '否'
//                        }
////                        r.data.routes[i].active=r.data.routes[i].active.toString();  // 布尔转字符串
//                    }
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
          // 表格赋值
          getTable(r){
            const self = this;
            self.total = r.data.total;
            self.tableData = r.data.routes;
            self.loading = false;
            console.log(self.tableData);
            for(let i = 0;i<self.tableData.length;i++){
              self.tableData[i].product = self.tableData[i].product.name;
              self.tableData[i].insurerProduct = self.tableData[i].insurerProduct.name;
            }
          },
          handleModifyStatus(row){   // 上下架
            const self = this;
            self.form = Object.assign({}, row);
            // 字符串转布尔。
//            self.form.active =  eval(self.form.active.toLowerCase());
//            if(self.form.active === "是"){
//              self.form.active = true;
//            }else{
//              self.form.active = false;
//            }
            self.$api.post('/insuranceroute/activation/'+self.form.id+'/'+ !self.form.active, null, r => {
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
            this.$router.push('/add_router');
          },
          handleEdit (index, row) {    // 编辑
            const self = this;
            self.dialogRouter = true;
            self.$api.get('/insurerproduct/option/all', null, r =>{
              console.log(r.data);
              if (r.code === 200) {
                self.titleArr= r.data;
              }else{
                alert(r.message);
              }
            });
            self.form = Object.assign({}, row);
            self.table_index = index;

          },
          handleSave (form) {            // 确认编辑提交
            const self = this;
            self.$refs[form].validate((valid)=> {
              if (valid) {
                self.editLoading = true;
                self.form.productId = JSON.parse(localStorage.getItem('product')).id;  // 取productId
                self.form.insurerProductId = self.form.insurerProduct;
                self.$api.post('/insuranceroute/', self.form, r => {
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
              self.$api.delete('/insuranceroute/' + self.form.id, null, r => {
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
        }
    }
</script>
