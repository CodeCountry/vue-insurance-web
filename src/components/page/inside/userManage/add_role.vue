<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="form.name" style="width: 70%;"></el-input>
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
        editLoading:false,
        form: {
          name: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
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
            self.$api.post('/role', self.form, r => {
              if (r.code === 200) {
                this.$message({
                  message: "操作成功！",
                  type: 'success'
                });
                this.editLoading = false;
                this.$router.push("/role_list");
                
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
          path: '/role_list',
        });
      },
      resetForm(form) {       // 重置
        this.$refs[form].resetFields();
      },
    }
    
  }
</script>
