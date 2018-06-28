<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="code" style="width:173px;float: left;">
                    <el-input placeholder="code" v-model="ruleForm.code" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    <span :class="{'error':isA ,'hide':isB}">请输入验证码</span>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button type="primary" @click="sendCode('ruleForm')"  :disabled="disable_control">
                        <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                        <span v-if="!sendMsgDisabled">发送验证码</span>
                    </el-button>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    // 使用md5加密
    import md5 from 'js-md5';
    import axios from 'axios';
    export default {
        data: function(){
            return {
                isA:true,
                isB:true,
                sendMsgDisabled:false,
                disable_control:false,
                time:'60',
                ruleForm: {
                    username: '',
                    password: '',
                    code:'',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
//                    code: [
//                        { required: true, message: '请输入验证码', trigger: 'blur' }
//                    ]
                }
            }
        },
        methods: {
            clickCountDown(){
                let self = this;
                self.sendMsgDisabled = true;
                self.disable_control = true;
                let interval = window.setInterval(function() {
                    if ((self.time--) <= 0) {
                        self.time = 60;
                        self.sendMsgDisabled = false;
                        self.disable_control = false;
                        window.clearInterval(interval);
                    }
                }, 1000);
            },
            sendCode(formName){
                const self = this;
                let param = {
                    "name": self.ruleForm.username,
                    "password": md5(self.ruleForm.password),
                };
                self.$refs[formName].validate((valid)=> {
                    if (valid) {
                        self.$api.post('/user/verification', param, r =>{
//                            console.log(r.data);
                            if (r.code === 200) {
                                self.clickCountDown();
//                                alert('验证码已发送');
                            }else{
                                alert(r.message);
                            }
                        },res=>{
                        })
                    }
                });
            },
            submitForm(formName) {
                const self = this;
                let param = {
                    "name": self.ruleForm.username,
                    "password": md5(self.ruleForm.password),
                    "validCode":self.ruleForm.code,
                };
                console.log(param);
                self.$refs[formName].validate((valid)=>{
                   if(valid){
                       if(self.ruleForm.code !== ''){
                           self.isB = true;
                           self.$api.post('/user/login', param, r =>{
                               console.log(r.data);
                               if (r.code === 200) {
                                   console.log(r.data);
                                   localStorage.setItem('ms_username',r.data.fullName);
                                   self.$router.push('/welcome');
                               }else{
                                   alert(r.message);
                               }
                           },res=>{
                           })
                       }else{
                            self.isB = false;
                       }
                   } else{
                       console.log('error submit!!');
                       return false;
                   }
                });

            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:230px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:38px;
    }
    .error{
        color: #fa5555;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
    }
    .error.hide{
        display: none;
    }
    .error_border{
        border-color: #fa5555;
    }
</style>
