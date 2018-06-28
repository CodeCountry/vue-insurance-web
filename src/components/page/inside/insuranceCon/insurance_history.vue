<template>
  <div>
    <el-table v-loading="loading" :data="tableData" border style="width:100%">
      <el-table-column type="expand" label="详情" width="50">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="保险产品名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="保险产品介绍">
              <span>{{ props.row.intro }}</span>
            </el-form-item>
            <el-form-item label="险种">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="保额">
              <span>{{ props.row.coverage }}</span>
            </el-form-item>
            <el-form-item label="保障时间">
              <span>{{ props.row.span }}月</span>
            </el-form-item>
            <el-form-item label="保险产品创建日期">
              <span>{{ props.row.createdAt }}</span>
            </el-form-item>
            <el-form-item label="所属保险公司">
              <span>{{ props.row.insurerName }}</span>
            </el-form-item>
            <el-form-item label="所属保险公司介绍">
              <span>{{ props.row.insurerIntro }}</span>
            </el-form-item>
            <el-form-item label="保险公司创建日期">
              <span>{{ props.row.insurerCreatedAt }}</span>
            </el-form-item>
            <el-form-item label="生效方式">
              <span>{{ props.row.effectiveWay }}</span>
            </el-form-item>
            <el-form-item label="开始日期">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="结束日期">
              <span>{{ props.row.endTime }}</span>
            </el-form-item>
            <el-form-item label="上下架">
              <span>{{ props.row.active }}</span>
            </el-form-item>
            <el-form-item label="版本号">
              <span>{{ props.row.version }}</span>
            </el-form-item>
            <el-form-item label="编码格式">
              <span>{{ props.row.code }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="保险产品名"></el-table-column>
      <el-table-column prop="coverage" label="险种"></el-table-column>
      <el-table-column prop="insurerName" label="所属保险公司名"></el-table-column>
      <el-table-column prop="active" label="上下架" width="80"></el-table-column>
      <el-table-column prop="version" label="版本号" width="80"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],  // 表格数据
        loading: true,
        form: {
        },
      }
    },
    created(){
      const self = this;
      self.loading = false;
      self.form.productId =JSON.parse(localStorage.getItem('product')).id;
      console.log(self.form.productId);
      self.$api.get('/insurerproduct/'+self.form.productId+'/history', null, r =>{
        console.log(r.data);
        if (r.code === 200) {
          self.getTable(r); // 表格赋值及分页
          console.log(self.tableData);
          for(let i = 0;i<r.data.content.length;i++){
            r.data.content[i].active=r.data.content[i].active.toString();  // 布尔转字符串
          }
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
    methods:{
      getTable(r){
        const self = this;
        self.total = r.data.total;
        self.tableData = r.data.content;
        console.log(self.tableData);
        for(let i = 0;i<self.tableData.length;i++){
          let date =  self.tableData[i].createdAt;
          self.tableData[i].createdAt = self.getDate(date);
          self.tableData[i].insurerName = self.tableData[i].insurer.name;
          self.tableData[i].insurerIntro = self.tableData[i].insurer.intro;
          self.tableData[i].insurerCreatedAt = self.getDate(self.tableData[i].insurer.createdAt);
      
        }
        self.loading = false;
      },
    }
  }
</script>
