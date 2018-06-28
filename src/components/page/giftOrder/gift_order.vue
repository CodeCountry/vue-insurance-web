<template>
  <section>
    <el-row>
      <el-col :span="24">
        <div class="title">保障查询</div>
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input v-model="formInline.orderId"></el-input>
          </el-form-item>
          <el-form-item label="被保人姓名">
            <el-input v-model="formInline.insuredName"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码">
            <el-input v-model="formInline.insuredIdNumber"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formInline.insuredMobile"></el-input>
          </el-form-item>
          <el-form-item label="保障产品">
            <el-select v-model="formInline.productCode" placeholder="保障产品">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in titleArr" :key="item.name" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="进件时间">
            <el-date-picker
              v-model="entryTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="formInline.orderStatus" placeholder="订单状态">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(val,key) in statusArr" :key="key" :label="key" :value="val"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车架号">
            <el-input v-model="formInline.vin"></el-input>
          </el-form-item>
          <el-form-item label="品类" v-if="categoryShow">
            <el-select v-model="formInline.category" placeholder="品类">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(val,key) in categoryArr" :key="key" :label="key" :value="val"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求ID">
            <el-input v-model="formInline.requestId"></el-input>
          </el-form-item>
          <el-form-item label="保单号">
            <el-input v-model="formInline.PolicyId"></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form>
        <div class="title">订单列表</div>
        <!--表格-->
        <el-table  v-loading="loading" :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="保障订单号"></el-table-column>
          <el-table-column prop="createdAt" label="进件时间"></el-table-column>
          <el-table-column prop="product.name" label="保障名称" width="140"></el-table-column>
          <el-table-column prop="insured.name" label="被保人姓名" width="100"></el-table-column>
          <el-table-column prop="insured.idNumber" label="身份证号码"></el-table-column>
          <el-table-column prop="insured.mobile" label="手机号码" width="100"></el-table-column>
          <el-table-column prop="modeValue" label="进件来源" width="100"></el-table-column>
          <el-table-column prop="insured.livingProvince" label="所属地区" width="80"></el-table-column>
          <el-table-column prop="status" label="订单状态" width="100">
            <template slot-scope="scope">
              <el-popover v-if="scope.row.refusalReason" trigger="hover" placement="top">
                <p>退回原因: {{ scope.row.refusalReason }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.status.value }}</el-tag>
                </div>
              </el-popover>
              <div v-else>{{scope.row.status.value}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作"  fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="show_detail(scope.$index)">查看详情</el-button>
              <!--<el-button v-if="scope.row.status!=='已撤销'" type="danger" size="small" @click="reject_insurance(scope.row)">撤保</el-button>-->
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
          orderId:this.$store.state.orderId,
          insuredIdNumber:this.$store.state.insuredIdNumber,
          insuredName:this.$store.state.insuredName,
          insuredMobile:this.$store.state.insuredMobile,
          productCode:this.$store.state.productCode,
          orderInsuredTime1:this.$store.state.orderInsuredTime1,
          orderInsuredTime2:this.$store.state.orderInsuredTime2,
          orderStatus:this.$store.state.orderStatus,
          vin:this.$store.state.vin,
          category:this.$store.state.category,
          requestId:this.$store.state.requestId,
          PolicyId:this.$store.state.PolicyId,
        },
        isDate1:'',        // 时间中间介质
        isDate2:'',       // 时间中间介质
//        modeValue:'',       // 来源
        titleArr:[],  // 保障产品下拉
        statusArr:[],  // 订单状态下拉
        categoryArr:[],   // 品类下拉
        tableData: [],  // 表格数据
        loading: true,
        total:1,
        pageSize:this.$store.state.pageSize,  // 一页显示几条数据
        currentPage: this.$store.state.currentPage,
        select:this.$store.state.select,
        entryTime:this.$store.state.entryTime,   // 时间
        categoryShow:true,
      };
    },
    created () {
      const self = this;
      self.formInline.size = self.pageSize;
      self.formInline.page = self.currentPage-1;
      self.$api.get('/order/selectAll', self.formInline, r =>{
        console.log(r.data);
        if (r.code === 200) {
          self.getTable(r);  // 表格赋值
          console.log(self.tableData);
        }else{
        }
        self.loading = false;
      },res=>{
        this.$router.push({
          path: '/login',
        });
      });
      self.$api.get('/product/option/all', null, r =>{                    // 保障产品名称
        console.log(r.data);
        if (r.code === 200) {
          self.titleArr = r.data;
        }else{
          alert(r.message);
        }
      });
      self.$api.get('/gift_order/order_status', null, r =>{                   // 订单状态
        console.log(r.data);
        if (r.code === 200) {
          self.statusArr = r.data;
        }else{
          alert(r.message)
        }
      });
      self.$api.get('/enum/vehicleCategory/values', null, r =>{                   // 品类下拉
        console.log(r.data);
        if (r.code === 200) {
          if(Object.keys(r.data).length>1){
            self.categoryArr = r.data;
          }else{
            self.categoryShow = false;
          }
        }else{
          alert(r.message)
        }
      });
    },
    methods: {
      // 表格及分页赋值
      getTable(r){
        const self = this;
        self.total = r.data.total;
        self.tableData = r.data.content;
        for(let i = 0;i<r.data.content.length;i++){
          self.tableData[i].createdAt = self.getDate(r.data.content[i].createdAt);
          if(r.data.content[i].mode!==null && r.data.content[i].mode!== ''){
            self.tableData[i].modeValue = r.data.content[i].mode.value;    // 来源标识
          }else{
          }
          
//          switch (r.data.content[i].status){
//            case 'IllegalOrder' :
//              self.tableData[i].status = "非法进件";
//              break;
//            case 'AwaitingPay' :
//              self.tableData[i].status = "等待付款";
//              break;
//            case 'PayFailed' :
//              self.tableData[i].status = "付款失败";
//              break;
//            case 'AwaitingInsure' :
//              self.tableData[i].status = "等待投保";
//              break;
//            case 'Failed' :
//              self.tableData[i].status = "投保失败";
//              break;
//            case 'Insured' :
//              self.tableData[i].status = "投保成功";
//              break;
//            case 'Cancelled' :
//              self.tableData[i].status = "已取消";
//              break;
//            case 'Revoked' :
//              self.tableData[i].status = "已撤销";
//          }
        }
        self.pageSize = r.data.size;
        self.loading = false;
      },
      onSubmit () {
        const self = this;
        self.select = true;
        self.loading = true;
        let formInline = self.formInline;
        if(self.entryTime !== '' && self.entryTime !== null && self.entryTime.length !== 0){
          self.isDate2 = self.entryTime[1];
          self.isDate1 = self.entryTime[0];
          formInline.orderInsuredTime1 = self.getTimeStamp(self.isDate1.split('-')[0],self.isDate1.split('-')[1],self.isDate1.split('-')[2]);
          formInline.orderInsuredTime2 = ((self.getTimeStamp(self.isDate2.split('-')[0],self.isDate2.split('-')[1],self.isDate2.split('-')[2]))/1000+86399)*1000;
        }else{
          formInline.orderInsuredTime1 = "";
          formInline.orderInsuredTime2 = "";
        }
        // 保存筛选条件
        self.$store.state.orderId = formInline.orderId;
        self.$store.state.insuredIdNumber = formInline.insuredIdNumber;
        self.$store.state.insuredName = formInline.insuredName;
        self.$store.state.insuredMobile = formInline.insuredMobile;
        self.$store.state.productCode = formInline.productCode;
        self.$store.state.orderStatus = formInline.orderStatus;
        self.$store.state.vin = formInline.vin;
        self.$store.state.category = formInline.category;
        self.$store.state.requestId = formInline.requestId;
        self.$store.state.PolicyId = formInline.PolicyId;
        
        self.$store.state.select = self.select;
        var arr = [];
        if(formInline.orderInsuredTime1!== '' && formInline.orderInsuredTime1 !== null){
          self.$store.state.orderInsuredTime1 = formInline.orderInsuredTime1;
          arr.push(self.getTimeDate(formInline.orderInsuredTime1));
        }
        if(formInline.orderInsuredTime2!== '' && formInline.orderInsuredTime2 !== null){
          self.$store.state.orderInsuredTime2 = formInline.orderInsuredTime2;
          arr.push(self.getTimeDate(formInline.orderInsuredTime2));
        }
        this.$store.state.entryTime = arr;
        // 结束。
        
        console.log(formInline);
        self.$api.get('/order/selectAll', formInline, r =>{
          console.log(r.data);
          if (r.code === 200) {
            self.getTable(r);
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
      show_detail(index) {
        localStorage.removeItem('idNo');
        localStorage.setItem('idNo',this.tableData[index].id);
        this.$router.push({
          path: '/gift_order_detail',
        })
      },
//      reject_insurance(row){            // 撤保
//        this.$confirm('确认撤保吗？', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          cancelButtonClass: 'cancel'
//        }).then(() => {
//          const self = this;
//          self.form = Object.assign({},row);
//          self.$api.get('/order/'+self.form.id+'/revocation',null,r=>{
//            if(r.code === 200){
//              alert(r.message);
//              self.$router.go(0);
//            }
//          })
//        }).catch(() => {
//        });
//      },
      handleSizeChange(val) {     // 一页显示几条数据
        const self = this;
        self.loading = true;
        self.pageSize = val;
        this.$store.state.pageSize = val;
        let param = {};
        if(!self.select){
          param.size = self.pageSize;
          param.page = self.currentPage-1;
        }else{
          console.log(self.formInline);
          param = self.formInline;
          if(self.entryTime !== '' && self.entryTime !== null && self.entryTime.length !== 0){
            self.isDate2 = self.entryTime[1];
            self.isDate1 = self.entryTime[0];
            param.orderInsuredTime1 = self.getTimeStamp(self.isDate1.split('-')[0],self.isDate1.split('-')[1],self.isDate1.split('-')[2]);
            param.orderInsuredTime2 = ((self.getTimeStamp(self.isDate2.split('-')[0],self.isDate2.split('-')[1],self.isDate2.split('-')[2]))/1000+86399)*1000;
          }else{
            param.orderInsuredTime1 = "";
            param.orderInsuredTime2 = "";
          }
          param.size = self.pageSize;
          param.page = self.currentPage-1
        }
        
        self.$api.get('/order/selectAll',param, r =>{
          console.log(r.data);
          if (r.code === 200) {
            self.getTable(r);
            self.loading = false;
          }else{
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
        this.$store.state.currentPage = val;
        let param = {};
        if(!self.select) {
          param.size = self.pageSize;
          param.page = self.currentPage-1;
        }else{
          param = self.formInline;
          if(self.entryTime !== '' && self.entryTime !== null && self.entryTime.length !== 0){
            self.isDate2 = self.entryTime[1];
            self.isDate1 = self.entryTime[0];
            param.orderInsuredTime1 = self.getTimeStamp(self.isDate1.split('-')[0],self.isDate1.split('-')[1],self.isDate1.split('-')[2]);
            param.orderInsuredTime2 = ((self.getTimeStamp(self.isDate2.split('-')[0],self.isDate2.split('-')[1],self.isDate2.split('-')[2]))/1000+86399)*1000;
          }else{
            param.orderInsuredTime1 = "";
            param.orderInsuredTime2 = "";
          }
          param.size = self.pageSize;
          param.page = self.currentPage-1
        }
        self.$api.get('/order/selectAll',param, r =>{
          console.log(r.data);
          if (r.code === 200) {
            self.getTable(r);
            self.loading = false;
          }else{
          
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
    padding-left: 10px!important;
    padding-right: 10px;
    font-size:12.5px;
  }
  .el-button--small, .el-button--small.is-round{
    padding: 9px 12px;
  }
</style>
