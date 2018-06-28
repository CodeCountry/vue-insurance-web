<template>
    <div>
        <el-form ref="form" :rules="rules" :model="form">
            <el-form-item label="原密码" prop="oldPassword">
                <el-input type="password" v-model="form.oldPassword" style="width: 70%;"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword1">
                <el-input type="password" v-model="form.newPassword1" style="width: 70%;"></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码" prop="newPassword2">
                <el-input type="password" v-model="form.newPassword2" style="width: 70%;"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSave('form')" v-loading="editLoading">确认修改</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </div>
    </div>
</template>
<script>
    // 使用md5加密
    import md5 from 'js-md5';
    export default {
        data() {
            // 自定义密码验证
            var checkPassword1 = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请输入新密码'));
                }else if (this.form.newPassword2 !== '') {
                    this.$refs.form.validateField('newPassword2');
                }
                callback();
            };
            var checkPassword2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.newPassword1) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                editLoading:false,
                form: {
                    oldPassword: '',
                    newPassword1: '',
                    newPassword2: '',
                },
                rules: {
                    oldPassword: [
                        { required: true, message: '请输入原密码', trigger: 'blur' }
                    ],
                    newPassword1: [
                        { required: true, validator: checkPassword1, trigger: 'blur,change' }
                    ],
                    newPassword2: [
                        { required: true, validator: checkPassword2, trigger: 'blur,change' }
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
                        let param = {
                            oldPwd:md5(self.form.oldPassword),
                            newPwd:md5(self.form.newPassword2),
                        }
                        self.$api.post('/user/modification_password',param, r => {
                            if (r.code === 200) {
                                alert(r.message);
                                this.$message({
                                    message: "操作成功！",
                                    type: 'success'
                                });
                                this.editLoading = false;
                                this.$router.push("/login");
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
            resetForm(form) {       // 重置
                this.$refs[form].resetFields();
            },
        }
    }
</script>
