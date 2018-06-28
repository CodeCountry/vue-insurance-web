<template>
  <div>
    <el-form ref="form" :label-position="labelPosition" label-width="80px" :rules="rules" :model="form">
      <el-form-item label="权限名" prop="name">
        <el-input v-model="form.name"  style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="条件" prop="conditions">
        <el-input v-model="form.conditions" style="width: 70%;"></el-input>
      </el-form-item>
      <el-form-item label="操作对象" prop="entity">
        <el-input v-model="form.entity" style="width: 70%;"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" style="width: 70%;">
          <el-option value="View"></el-option>
          <el-option value="Update"></el-option>
          <el-option value="New"></el-option>
          <el-option value="Delete"></el-option>
        </el-select>
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
      }
    },
    methods:{
      handleSave (form) {            // 确认添加提交
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            this.editLoading = true;
            self.$api.post('/right', self.form, r => {
              if (r.code === 200) {
                this.$message({
                  message: "操作成功！",
                  type: 'success'
                });
                this.editLoading = false;
                this.$router.push("/right_list");
                
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
          path: '/right_list',
        });
      },
      resetForm(form) {       // 重置
        this.$refs[form].resetFields();
      },
    }
    
  }
</script>
