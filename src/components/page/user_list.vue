<template>
    <section>
        <el-row>
            <el-col :span="24">
                <!--<div class="title">用户</div>-->
                <!--表单-->
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="关键字搜索">
                        <el-input placeholder="关键字搜索" v-model="formInline.keySearch"></el-input>
                    </el-form-item>
                    <span class="button_center">
                        <el-button type="primary" size="small" icon="el-icon-search"  @click="onSubmit">查询</el-button>
                        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="handleAdd" style="margin-bottom:10px">添加</el-button>
                    </span>
                </el-form>
                <div class="title">用户列表</div>
               <!--表格-->
                <el-table  v-loading="loading" :data="tableData" border style="width: 100%">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="name" label="账号"></el-table-column>
                    <el-table-column prop="fullName" label="姓名"></el-table-column>
                    <el-table-column prop="createdAt" label="创建日期"></el-table-column>
                    <el-table-column prop="email" label="邮箱"></el-table-column>
                    <el-table-column prop="mobile" label="手机号"></el-table-column>
                    <el-table-column prop="locked" label="是否被锁" width="80"></el-table-column>
                    <el-table-column prop="expired" label="是否过期" width="80"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini"   @click="handleUnLocking(scope.row)">账户解锁</el-button>
                            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="total,prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <el-dialog title="修改用户" :visible.sync="dialogFormVisible" width="30%">
            <el-form ref="form" :rules="rules" :model="form" :label-position="labelPosition" label-width="90px">
                <el-form-item label="账号" prop="name">
                    <el-input v-model="form.name" style="width: 70%;" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="fullName">
                    <el-input v-model="form.fullName" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" style="width: 70%;"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="form.mobile" style="width: 70%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSave('form')" v-loading="editLoading">修改</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    export default {
        data () {
            // 自定义手机号验证
            var checkPhone = (rule, value, callback) => {
                if(!value.match(/^1[34578]\d{9}$/)){
                    return callback(new Error('请输入正确的手机号'));
                }
            };
            return {
                formInline: {    // 查询
                    keySearch:''
                },
                labelPosition:'left',
                tableData: [],  // 表格数据
                loading: true,
                total:1,
                pageSize:20,  // 一页显示几条数据
                currentPage: 1,
                value1:'',
                select:false,
                editLoading:false,
                dialogFormVisible:false, // 弹框编辑
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
                        { required: true, validate: checkPhone, message:'请输入手机号', trigger: 'blur,change' }
                    ]
                },
            };
        },
        created () {
            const self = this;
            self.$api.get('/user', null, r =>{
                console.log(r.data);
                if (r.code === 200) {
                    this.getTable(r.data);
                }else{
                    alert(r.message);
                }
            },res=>{
                this.$router.push({
                    path: '/login',
                });
            })
        },
        methods: {
            onSubmit () {
                const self = this;
                self.formInline.keySearch = self.formInline.keySearch.replace(/[\s*]/g,"");
                if(self.formInline.keySearch === "" || self.formInline.keySearch === null || self.formInline.keySearch === undefined) {
                    console.log(self.formInline.keySearch);
                }else{
                    self.select = true;
                    self.loading = true;
                    self.$api.get('/user/keyword/'+ self.formInline.keySearch, null, r =>{
                        if (r.code === 200) {
                            this.getTable(r.data);
                        }else{
                            alert(r.message);
                        }
                    },res=>{
                        this.$router.push({
                            path: '/login',
                        });
                    })
                }
            },
            getTable(data){
                const self = this;
                self.total = data.total;
                self.tableData = data.content;
                console.log(self.tableData);
                for(let i = 0;i<self.tableData.length;i++){
                    let date =  self.tableData[i].createdAt;
                    self.tableData[i].createdAt = self.getDate(date);
                    if(self.tableData[i].locked){   // 锁定
                        self.tableData[i].locked = "是"
                    } else{
                        self.tableData[i].locked = "否"
                    }
                    if(self.tableData[i].expired){  // 过期
                        self.tableData[i].expired = "是"
                    } else{
                        self.tableData[i].expired = "否"
                    }
                }
                self.loading = false;
            },
            handleEdit (index, row) {    // 编辑
                this.dialogFormVisible = true;
                this.form = Object.assign({}, row);
                this.table_index = index;
            },
            handleAdd () {    // 添加
                this.$router.push('/add_user');
            },
            handleSave (form) {            // 确认编辑提交
                const self = this;
                self.$refs[form].validate((valid)=> {
                    if (valid) {
                        self.editLoading = true;
                        self.$api.put('/user', self.form, r => {
                            if (r.code === 200) {
                                alert(r.message);
                                self.editLoading = false;
                                self.$router.go(0);
                                self.$message({
                                    message: "操作成功！",
                                    type: 'success'
                                });
                            } else {
                                alert(r.message);
                                self.editLoading = false;
                            }
                        }, res => {
                            self.$router.push({
                                path: '/login',
                            });
                        });
                    }else{

                    }
                });
                // 日期
//                    let date = this.form.date;
//                    if (typeof date === "object") {
//                        date = [date.getFullYear(), (date.getMonth() + 1), (date.getDate())].join('-');
//                        this.form.date = date
//                    }
//                    this.tableData[this.table_index] = this.form;
//                    this.tableData.splice(this.table_index, 0, this.form);
            },
            handleDelete(row){    // 删除
                this.$confirm('确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'cancel'
                }).then(() => {
                    const self = this;
                    self.form = Object.assign({}, row);
                    console.log(self.form.id);
                    self.$api.get('/user/discard/' + self.form.id, null, r => {
                        if (r.code === 200) {
                            alert(r.message);
                            self.$router.go(0);
                            self.total = self.total - 1;
                        } else {
                            alert(r.message);
                        }
                        self.loading = false;
                    }, res => {
                        this.$router.push({
                            path: '/login',
                        });
                    })
                }).catch(() => {
                });
            },
            handleUnLocking(row){  // 账户解锁
                const self = this;
                self.form = Object.assign({}, row);
                console.log(self.form.id);
                self.$api.get('/user/unlocking_account/'+self.form.id,null, r =>{
                    if (r.code === 200) {
                        self.$message({
                          message: "操作成功！",
                          type: 'success'
                        });
                        self.$router.go(0);
                    }else{
                        alert(r.message);
                    }
                    self.loading = false;
                },res=>{
                    this.$router.push({
                        path: '/login',
                    });
                })
            },
            handleCurrentChange(val) {      // 分页切换
                const self = this;
                self.currentPage = val;
                console.log(self.currentPage);
                let param;
                param = {
                    size: self.pageSize,
                    page: self.currentPage-1
                };
                self.$api.get('/user',param, r =>{
                    if (r.code === 200) {
                        this.getTable(r.data);
                    }else{
                        alert(r.message);
                    }
                },res=>{
                    this.$router.push({
                        path: '/login',
                    });
                })
            }
        }
    };
</script>
<style>
    .el-pagination {
        text-align: center;
        margin-top: 30px;
    }
    .el-message-box__btns .cancel {
        float: right;
        margin-left: 10px;
    }
    .title{
        border-bottom: 1.5px solid #aaa;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }
    /*修改样式*/
    .el-table .cell, .el-table th>div{
        padding-left: 5px;
        padding-right: 5px;
        font-size:12.5px;
        text-align: center;
    }
    .content .el-dialog{
        min-width:400px;
    }
    .el-button--mini, .el-button--mini.is-round {
        padding: 5px 7px;
    }
</style>
