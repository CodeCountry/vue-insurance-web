<template>
  <div>
    <el-button type="primary" class="tit" size="small" icon="el-icon-circle-plus-outline" @click="handleAdd">添加</el-button>
    <el-table v-loading="loading" :data="tableData" border style="width:100%">
      <el-table-column type="expand" label="详情" width="50">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="保险产品名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="保险产品介绍">
              <span>{{ props.row.intro }}</span>
            </el-form-item>
            <el-form-item label="险种">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="保额">
              <span>{{ props.row.coverage }}</span>
            </el-form-item>
            <el-form-item label="保障时间">
              <span>{{ props.row.span }}月</span>
            </el-form-item>
            <el-form-item label="保险产品创建日期">
              <span>{{ props.row.createdAt }}</span>
            </el-form-item>
            <el-form-item label="所属保险公司">
              <span>{{ props.row.insurerName }}</span>
            </el-form-item>
            <el-form-item label="所属保险公司介绍">
              <span>{{ props.row.insurerIntro }}</span>
            </el-form-item>
            <el-form-item label="保险公司创建日期">
              <span>{{ props.row.insurerCreatedAt }}</span>
            </el-form-item>
            <el-form-item label="生效方式">
              <span>{{ props.row.effectiveWay }}</span>
            </el-form-item>
            <el-form-item label="开始日期">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="结束日期">
              <span>{{ props.row.endTime }}</span>
            </el-form-item>
            <el-form-item label="上下架">
              <span v-if="props.row.active" class="blue">是</span>
              <span v-else class="red">否</span>
              <!--<span>{{ props.row.active }}</span>-->
            </el-form-item>
            <el-form-item label="版本号">
              <span>{{ props.row.version }}</span>
            </el-form-item>
            <el-form-item label="编码格式">
              <span>{{ props.row.code }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="保险产品名"></el-table-column>
      <el-table-column prop="category" label="险种"></el-table-column>
      <el-table-column prop="effectiveWay" label="生效方式"></el-table-column>
      <el-table-column prop="insurerName" label="所属保险公司名"></el-table-column>
      <el-table-column label="上下架" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.active" class="blue">是</span>
          <span v-else class="red">否</span>
        </template>
      </el-table-column>
      <el-table-column prop="version" label="版本号" width="80"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="show_history(scope.$index)">历史版本</el-button>
          <el-button type="primary" v-if="!scope.row.active" size="mini" @click="handleModifyStatus(scope.row)">上架</el-button>
          <el-button type="danger" v-else  size="mini" @click="handleModifyStatus(scope.row)">下架</el-button>
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
    <el-dialog title="编辑保险产品" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="form" :label-position="labelPosition" label-width="110px" :rules="rules" :model="form">
        <el-form-item label="保险产品名" prop="name">
          <el-input v-model="form.name"  style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="保险介绍" prop="intro">
          <el-input v-model="form.intro" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="险种" prop="category">
          <el-select v-model="form.category" style="width: 80%;">
            <el-option v-for="item in categoryOption" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保额" prop="coverage">
          <el-input v-model="form.coverage" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="保障时间" prop="span">
          <el-input v-model="form.span" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="所属保险公司" prop="insurerName">
          <el-select v-model="form.insurerName" style="width: 80%;" @change="change()">
            <el-option v-for="item in titleArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效方式" prop="effectiveWay">
          <el-select v-model="form.effectiveWay" style="width: 80%;">
            <el-option v-for="item in effectiveWayOption" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code" style="width: 80%;"></el-input>
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
            {required:true, message:'请输入介绍',trigger:'blur'},
          ],
          category:[
            {required:true, message:'请选择险种',trigger:'blur'},
          ],
          coverage:[
            {required:true, message:'请输入保额',trigger:'blur'},
          ],
          insurerName:[
            {required:true, message:'请选择所属保险公司',trigger:'blur'},
          ],
          span:[
            {required:true, message:'请输入保障时间',trigger:'blur'},
          ],
          effectiveWay:[
            {required:true, message:'请选择生效方式 ',trigger:'blur'},
          ],
          code:[
            {required:true, message:'请输入编码格式 ',trigger:'blur'},
          ],
        },
        titleArr:[],
        categoryOption:[],    // 险种
        effectiveWayOption:[],   // 生效方式
      }
    },
    created(){
      const self = this;
      self.$api.get('/insurerproduct',null,r=>{
        console.log(r.data);
        if(r.code === 200){
          self.getTable(r);
//          for(let i = 0;i<r.data.content.length;i++){
//            r.data.content[i].active=r.data.content[i].active.toString();  // 布尔转字符串
//          }
        }else{
          alert(r.message);
        }
      },res=>{
        self.$router.push('/login');
      })
      self.$api.get('/insurer/all',null,r=>{     // 所属保险公司下拉列表
        console.log(r.data);
        if(r.code===200){
          self.titleArr = r.data;
        }else{
          alert(r.message);
        }
      },res=>{
        self.$router.push('/login');
      })
      self.$api.get('insurerproduct/insuranceCategory',null,r=>{     // 险种下拉列表
        console.log(r.data);
        if(r.code===200){
          self.categoryOption = r.data;
        }else{
          alert(r.message);
        }
      },res=>{
        self.$router.push('/login');
      })
      self.$api.get('insurerproduct/effectiveWay',null,r=>{     // 生效方式下拉列表
        console.log(r.data);
        if(r.code===200){
          self.effectiveWayOption = r.data;
        }else{
          alert(r.message);
        }
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
          self.tableData[i].insurerName = self.tableData[i].insurer.name;
          self.tableData[i].insurerId = self.tableData[i].insurer.id;
          self.tableData[i].insurerIntro = self.tableData[i].insurer.intro;
          self.tableData[i].insurerCreatedAt = self.getDate(self.tableData[i].insurer.createdAt);
          
        }
        self.loading = false;
      },
      change(){       // 当保险公司改变选中值时触发。
        this.form.insurerId = this.form.insurerName;
        console.log(this.form.insurerId);
      },
      handleAdd(){
        this.$router.push('/add_insurance_product');
      },
      handleEdit(row){
        const self = this;
        self.dialogFormVisible = true;
        self.form = Object.assign({},row);
        console.log(self.form);
      },
      handleSave(form){
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            self.$api.put('/insurerproduct', self.form, r => {
              if (r.code === 200) {
                self.dialogFormVisible = false;
                self.$router.go(0);
                self.$message({
                  message: '操作成功！',
                  type: 'success'
                })
              } else {
                alert(r.message);
              }
            }, res => {
              self.$router.push('/login');
            })
          }else{}
        })
      },
      show_history(index){      // 历史版本
        localStorage.removeItem('product');
        let data = {'id':this.tableData[index].id,'productName':this.tableData[index].name};
        data = JSON.stringify(data);
        localStorage.setItem('product',data);
        this.$router.push({
          path: '/insurance_history',
        })
      },
      handleModifyStatus(row){   // 上下架
        const self = this;
        self.form = Object.assign({}, row);
        // 字符串转布尔。
//        self.form.active =  eval(self.form.active.toLowerCase());
        self.$api.post('/insurerproduct/activation/'+self.form.id+'/'+ !self.form.active, null, r => {
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
      handleDelete(row){
        const self = this;
        self.$confirm('确认删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          self.form = Object.assign({}, row);
          self.$api.delete('/insurerproduct/'+self.form.id,null,r=>{
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
        self.$api.get('/insurerproduct',param, r =>{
          console.log(r.data);
          if (r.code === 200) {
            self.getTable(r);
            for(let i = 0;i<r.data.content.length;i++){
              r.data.content[i].active=r.data.content[i].active.toString();  // 布尔转字符串
            }
            self.loading = false;
          }else{
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 135px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
