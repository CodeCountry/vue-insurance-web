<template>
    <section>
        <el-row>
            <el-col :span="24">
                <div class="title">保障产品管理</div>
                <!--表单-->
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="产品编号">
                        <el-input v-model="formInline.irInsNo"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="保障名称">-->
                    <!--<el-input v-model="formInline.irProTitle"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="保障名称">
                        <el-select v-model="formInline.irProTitle" placeholder="保障名称">
                            <el-option label="区域一" value="123"></el-option>
                            <el-option label="区域二" value="23432"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品类型">
                        <el-input v-model="formInline.irInsNo"></el-input>
                    </el-form-item>
                    <el-form-item label="保障产品">
                        <el-input v-model="formInline.irInsNo"></el-input>
                    </el-form-item>
                    <el-form-item label="时间选择">
                        <el-date-picker
                                v-model="formInline.isDate"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyyMMdd">
                        </el-date-picker>
                    </el-form-item>
                    <!--<el-form-item label="申请状态">-->
                    <!--<el-input v-model="formInline.irPlyStatusDesc"></el-input>-->
                    <!--</el-form-item>-->
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form>
                <div class="title">保障产品</div>
                <!--表格-->
                <el-table  v-loading="loading" :data="tableData" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="isCreateDate" label="创建日期"></el-table-column>
                    <el-table-column prop="irInsNo" label="产品编号"></el-table-column>
                    <el-table-column prop="irProTitle" label="保障名称"></el-table-column>
                    <el-table-column prop="irProTitle" label="产品类型"></el-table-column>
                    <el-table-column prop="irProTitle" label="分期产品"></el-table-column>
                    <el-table-column prop="irProTitle" label="分期期数"></el-table-column>
                    <el-table-column prop="irProTitle" label="品牌"></el-table-column>
                    <el-table-column prop="isInsuredName" label="品类"></el-table-column>
                    <el-table-column prop="isInsuredName" label="地区"></el-table-column>
                    <el-table-column prop="isInsuredName" label="费用收取方式"></el-table-column>
                    <el-table-column prop="isInsuredName" label="收费方式"></el-table-column>
                    <el-table-column prop="isInsuredName" label="收费金额（元）"></el-table-column>
                    <el-table-column prop="isInsuredName" label="费用减免比例"></el-table-column>
                    <el-table-column prop="isInsuredIdNo" label="开始时间"></el-table-column>
                    <el-table-column prop="isInsuredPhone" label="结束时间"></el-table-column>
                    <el-table-column prop="isInsuredPhone" label="状态"></el-table-column>
                    <el-table-column label="操作"  fixed="right" width="210">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="show_detail(scope.$index)">查看</el-button>
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                    irProTitle: '',
                    isDate:'',
                    isCreateDate: '',
                    isCreateDate2:'',
                    irPlyStatusDesc: '',
                },
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
                    self.getTable(r); // 表格赋值及分页
                    console.log(self.tableData);
                    self.getTitle();  //
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
        methods: {
            // 保障名称赋值
            getTitle(){
                const self = this;
                console.log(self.tableData);
                for(let i = 0;i<self.tableData.length;i++){
                    if(self.tableData[i].isCommodityBrand === "金彭"){
                        self.tableData[i].irProTitle = "三责险-金彭"
                    }else if(self.tableData[i].isCommodityBrand === "雅迪"){
                        self.tableData[i].irProTitle = "安乘保-雅迪"
                    }else if(self.tableData[i].isCommodityBrand === "宗申"){
                        self.tableData[i].irProTitle = "骑行保-宗申"
                    }
                }
            },
            // 表格赋值
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
                    irProTitle: formInline.irProTitle,
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
                        self.getTitle();
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
                        pageNum:self.pageNum
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
                    param.pageNum = self.pageNum
                }

                self.$api.get('/insurance',param, r =>{
                    console.log(r.data);
                    if (r.code === 200) {
                        self.getTable(r);
                        self.getTitle();
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
                        self.getTitle();
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
    /*修改样式*/
    .el-table .cell, .el-table th>div{
        padding-left: 5px!important;
        padding-right: 5px;
        font-size:12.5px;
        text-align: center;
    }
</style>
