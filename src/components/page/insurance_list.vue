<template>
    <section>
        <el-row>
            <el-col :span="24">
                <div class="title">什马保障订单查询</div>
                <!--表单-->
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="保障订单号">
                        <el-input v-model="formInline.irInsNo"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="formInline.isInsuredName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码">
                        <el-input v-model="formInline.isInsuredIdNo"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="formInline.isInsuredPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="保障名称">
                        <el-select v-model="formInline.insureCode" placeholder="保障名称">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="(val,key) in titleArr" :key="key" :label="key" :value="val">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请日期">
                        <el-date-picker
                            v-model="formInline.isDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyyMMdd">
                        </el-date-picker>
                    </el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form>
                <div class="title">订单详情</div>
                <!--表格-->
                <el-table  v-loading="loading" :data="tableData" border style="width: 100%">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="isCreateDate" label="申请日期"></el-table-column>
                    <el-table-column prop="irInsNo" label="保障订单号"  width="180px"></el-table-column>
                    <el-table-column prop="insureCode" label="保障名称"></el-table-column>
                    <el-table-column prop="isInsuredName" label="被保人姓名"></el-table-column>
                    <el-table-column prop="isInsuredIdNo" label="身份证号码" width="180px"></el-table-column>
                    <el-table-column prop="isInsuredPhone" label="手机号码"></el-table-column>
                    <el-table-column prop="isInsuredProvName" label="所属地区"></el-table-column>
                    <el-table-column label="操作"  fixed="right" width="95">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="show_detail(scope.$index)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pageSize"
                            layout="total,sizes,prev, pager, next"
                            :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </section>
</template>
<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                formInline: {    // 查询
                    irInsNo: '',
                    isInsuredIdNo: '',
                    isInsuredPhone: '',
                    insureCode: '',
                    isDate:'',
                    isCreateDate: '',
                    isCreateDate2:'',
                    irPlyStatusDesc: '',
                },
                titleArr:{},   // 保障名称下拉
                tableData: [],  // 表格数据
                loading: true,
                total:1,
                pageSize:10,  // 一页显示几条数据
                currentPage: 1,
                value1:'',
                select:false,
            };
        },
        created () {
            const self = this;
            self.$api.get('/insurance', null, r =>{
                console.log(r.data);
                if (r.code === 200) {
                    self.getTable(r);
                    console.log(self.tableData);
                }else{

                }
                self.loading = false;
            },res=>{
                this.$router.push({
                    path: '/login',
                });
            });
            self.$api.get('/insurance/protitleForExt', null, r =>{
                console.log(r.data);
                if (r.code === 200) {
                    self.titleArr = r.data;
                    console.log(self.titleArr);
                }else{
                }
            });
        },
        methods: {
            // 表格及分页赋值
            getTable(r){
                const self = this;
                self.total = r.data.total;
                self.tableData = r.data.list;
                self.pageSize = r.data.pageSize;
                self.loading = false;
            },
            onSubmit () {
                const self = this;
                self.select = true;
                self.loading = true;
                let formInline = self.formInline;
                let date1,date2,irNo;
                console.log(formInline);
                if(formInline.isDate !== '' && formInline.isDate !== null){
                    date2 = formInline.isDate[1];
                    date1 = formInline.isDate[0];
                }else{
                    date2 = "";
                    date1 = "";
                }
                if(formInline.irInsNo.slice(0,2) === "bx"){
                    irNo = formInline.irInsNo.slice(2);
                }else{
                    irNo = formInline.irInsNo;
                }
                let formInline1 = {
                    irInsNo: irNo,
                    isInsuredIdNo: formInline.isInsuredIdNo,
                    isInsuredPhone: formInline.isInsuredPhone,
                    insureCode: formInline.insureCode,
                    isCreateDate:date1 ,
                    isCreateDate2:date2,
                    irPlyStatusDesc: formInline.irPlyStatusDesc,
                    isInsuredName:formInline.isInsuredName
                }
                console.log(formInline1);
                self.$api.get('/insurance', formInline1, r =>{
                    console.log(r.data);
                    if (r.code === 200) {
                        self.getTable(r);
                    }else{
                      alert(r.message);
                    }
                },res=>{
                    this.$router.push({
                        path: '/login',
                    });
                })
            },
            show_detail(index) {
                localStorage.removeItem('idNo');
                localStorage.setItem('idNo',this.tableData[index].irInsNo);
                this.$router.push({
                    path: '/table_one_detail',
                })
            },
            handleSizeChange(val) {     // 一页显示几条数据
                const self = this;
                self.loading = true;
                self.pageSize = val;
                let param;
                if(!self.select){
                    param = {
                        pageSize:self.pageSize,
                        pageNum:self.currentPage
                    }
                }else{
                    console.log(self.formInline);
                    param = self.formInline;
                    param.irInsNo = param.irInsNo.slice(2);
                    if(param.isDate === "" || param.isDate === null){
                        param.isCreateDate2 = "";
                        param.isCreateDate = "";
                    }else{
                        param.isCreateDate2 = param.isDate[1];
                        param.isCreateDate = param.isDate[0];
                    }
                    param.isDate = "";
                    param.pageSize = self.pageSize;
                    param.pageNum = self.currentPage
                }

                self.$api.get('/insurance',param, r =>{
                    console.log(r.data);
                    if (r.code === 200) {
                        self.getTable(r);
                        self.loading = false;
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
            handleCurrentChange(val) {      // 当前第几页
                const self = this;
                self.loading = true;
                self.currentPage = val;
                let param;
                if(!self.select) {
                    param = {
                        pageSize: self.pageSize,
                        pageNum: self.currentPage
                    }
                }else{
                    param = self.formInline;
                    param.irInsNo = param.irInsNo.slice(2);
                    if(param.isDate === "" || param.isDate === null){
                        param.isCreateDate2 = "";
                        param.isCreateDate = "";
                    }else{
                        param.isCreateDate2 = param.isDate[1];
                        param.isCreateDate = param.isDate[0];
                    }
                    param.isDate = "";
                    param.pageSize = self.pageSize;
                    param.pageNum = self.currentPage
                }
                self.$api.get('/insurance',param, r =>{
                    console.log(r.data);
                    if (r.code === 200) {
                        self.getTable(r);
                        self.loading = false;
                    }else{
                      alert(r.message);
                    }
                    self.loading = false;
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
    /*.el-message-box__btns .cancel {*/
        /*float: right;*/
        /*margin-left: 10px;*/
    /*}*/
    /*title*/
    .title{
        border-bottom: 1.5px solid #aaa;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }
    /*!*修改样式*!*/
    .el-table .cell, .el-table th>div{
        padding-left: 5px!important;
        padding-right: 5px;
        font-size:12.5px;
    }
</style>
