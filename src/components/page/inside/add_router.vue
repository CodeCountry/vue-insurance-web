<template>
  <div>
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
          <el-select v-model="form.insurerProduct">
            <el-option v-for="item in titleArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-input v-model="form.priority" type="number" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="触发条件" prop="conditions">
          <el-input type="textarea" v-model="form.conditions" style="width: 80%;"></el-input>
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
            { required: true, message: '请输入纯数字的优先级', trigger: 'blur' }
          ],
          conditions: [
            { required: true, message: '请输入条件范围', trigger: 'blur' }
          ],
        },
        titleArr:[],  // 下拉列表
      }
    },
    created(){
      const self = this;
      self.form.product = JSON.parse(localStorage.getItem('product')).productName;
      self.$api.get('/insurerproduct/option/all', null, r =>{
        console.log(r.data);
        if (r.code === 200) {
          self.titleArr= r.data;
        }else{

        }
      });
    },
    methods:{
      handleSave (form) {            // 确认添加提交
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            this.editLoading = true;
            self.form.productId = JSON.parse(localStorage.getItem('product')).id;
            self.form.insurerProductId = self.form.insurerProduct;
            self.$api.post('/insuranceroute/', self.form, r => {
              if (r.code === 200) {
                this.$message({
                  message: "操作成功！",
                  type: 'success'
                });
                this.editLoading = false;
                this.$router.push("/product_detail");
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
          path: '/product_detail',
        });
      },
      resetForm(form) {       // 重置
        this.$refs[form].resetFields();
      },
    }


  }
</script>
