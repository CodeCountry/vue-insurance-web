<template>
    <div class="sidebar">
        <!--:collapse="isCollapse" 控制折叠-->
        <el-menu :default-active="$route.path.replace('/', '')" class="el-menu-vertical-demo el-menu--dark"  backgroundColor="#344259"
                 text-color="#fff"
                 active-text-color="#ffd04b" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.name }}</template>
                        <el-menu-item v-for="(item,i) in item.children" :key="i" :index="item.url">{{ item.name }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.name }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                items: [

                ],
//                isCollapse:false,  // 折叠
            }
        },
        methods:{
            getCookie (cname) {        // 获取cookie
                let name = cname + "=";
                let ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') {c = c.substring(1)};
                    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
                }
                return "";
            },
        },
        created(){
            const self = this;
            if(!self.getCookie("shenmajr_insurance_user")){
              this.$router.push({
                path: '/login',
              });
            }else{
              self.$api.get('/menu/root', null, r =>{
                if (r.code === 200) {
                  self.items = r.data;
                  console.log(self.items);
                }
                console.log(r.data);
              },res=>{
                this.$router.push({
                  path: '/login',
                });
              })
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        /*!*width: 220px;*!*/
        left: 0;
        top: 70px;
        bottom:0;
        background: #344259;
        overflow: scroll;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 188px;
        min-height: 400px;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-submenu .el-menu-item:focus{
        outline: none;
    }
    .el-submenu .el-menu-item{
      height:45px;
      line-height: 45px;
    }
</style>
