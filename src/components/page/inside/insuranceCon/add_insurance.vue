<template>
  <div>
    <el-form ref="form" :label-position="labelPosition" label-width="110px" :rules="rules" :model="form">
      <el-form-item label="保险公司名" prop="name">
        <el-input v-model="form.name"  style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="intro">
        <el-input v-model="form.intro" style="width: 80%;"></el-input>
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
        labelPosition:'left',
        editLoading:false,
        form: {},
        rules: {
          name: [
            { required: true, message: '请输入保险公司名', trigger: 'blur' }
          ],
          intro: [
            { required: true, message: '请输入介绍', trigger: 'blur' }
          ],
        },
      }
    },
    methods:{
      handleSave (form) {            // 确认添加提交
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            this.editLoading = true;
            self.$api.post('/insurer', self.form, r => {
              if (r.code === 200) {
                this.$message({
                  message: "操作成功！",
                  type: 'success'
                });
                this.editLoading = false;
                this.$router.push("/insurance_company");
                
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
          path: '/insurance_company',
        });
      },
      resetForm(form) {       // 重置
        this.$refs[form].resetFields();
      },
    }
    
  }
</script>
