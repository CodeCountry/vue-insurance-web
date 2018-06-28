<template>
  <div>
    <el-form ref="form" :label-position="labelPosition" label-width="150px"  :rules="rules" :model="form">
      <el-form-item label="保障产品编号" prop="code">
        <el-input v-model="form.code" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="保障名称" prop="name">
        <el-input v-model="form.name" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="投保人" prop="holderId">
        <el-select v-model="form.holderId">
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
      <el-form-item label="作用范围" prop="scope">
        <el-input v-model="form.scope" style="width: 80%;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSave('form')" v-loading="editLoading">添加</el-button>
      <el-button @click="handleCancel()">取消</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        labelPosition: 'left',
        editLoading:false,
        titleArr:[],
        categoryOption:[],       // 险种下拉
        form: {
          wechatSupported:false,
          free:false,
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
      }
    },
    created(){
      const self = this;
      self.$api.get('/holder/option/all',null,r => {
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
    methods:{
      handleSave (form) {            // 确认添加提交
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            this.editLoading = true;
            self.$api.post('/product', self.form, r => {
              if (r.code === 200) {
                this.$message({
                  message: "操作成功！",
                  type: 'success'
                });
                this.editLoading = false;
                console.log(self.form);
                this.$router.push("/product_list");
              } else {
                alert(r.message);
                this.editLoading = false;
              }
            }, res => {
              this.$router.push({
                path: '/login',
              });
            });
          }else{

          }
        })
      },
      handleCancel(){    // 取消
        this.$router.push({
          path: '/product_list',
        });
      },
      resetForm(form) {       // 重置
        this.$refs[form].resetFields();
      },
    }


  }
</script>
