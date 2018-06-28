<template>
    <div>
        <el-form ref="form" :rules="rules" :model="form">
            <el-form-item label="账号" prop="name">
                <el-input v-model="form.name" style="width: 70%;"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="fullName">
                <el-input v-model="form.fullName" style="width: 70%;"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="form.email" style="width: 70%;"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input type="number" v-model="form.mobile" style="width: 70%;"></el-input>
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
            // 自定义手机号验证
            var checkPhone = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请输入手机号'));
                }else if(!value.match(/^1[34578]\d{9}$/)){
                    callback(new Error('请输入正确的手机号'));
                }else{
                    callback();
                }
            };
            return {
                editLoading:false,
                form: {
                    name: '',
                    fullName: '',
                    email: '',
                    mobile:'',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    fullName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    email: [
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ],
                    mobile: [
                        { required: true, validator: checkPhone, trigger: 'blur,change' }
                    ]
                },
            }
        },
        methods:{
            handleSave (form) {            // 确认添加提交
                const self = this;
                self.$refs[form].validate((valid)=> {
                    if (valid) {
                        this.editLoading = true;
                        self.$api.post('/user', self.form, r => {
                            if (r.code === 200) {
                                alert(r.message);
                                this.$message({
                                    message: "操作成功！",
                                    type: 'success'
                                });
                                this.editLoading = false;
                                this.$router.push("/user_list");
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
                    path: '/user_list',
                });
            },
            resetForm(form) {       // 重置
                this.$refs[form].resetFields();
            },
        }




    }
</script>