<template>
    <div class="header">
        <div class="logo">后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="change_password">修改密码</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'linxin'
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            setCookie: function (name, value, days) {  // 设置登录超时
                let d = new Date;
                d.setTime(d.getTime() + 24*60*60*1000*days);
                window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
            },
            clearCookie:function (name) {   // 清除cookie
                this.setCookie(name,"",-1);
            },
            handleCommand(command) {
                if(command === 'loginout'){   // 退登
                    this.$api.get('/user/logout', null, r =>{
                        if(r.code === 200){
                            localStorage.removeItem('ms_username');
                            this.$router.push('/login');
                        }
                    },res=>{
                        this.$router.push({
                            path: '/login',
                        });
                    })
                }else if(command === "change_password"){  // 修改密码
                    this.$router.push('/change_password');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
