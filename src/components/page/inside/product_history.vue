<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="createdAt" label="创建日期" width="90"></el-table-column>
      <el-table-column prop="code" label="保障产品编号"></el-table-column>
      <el-table-column prop="name" label="保障名称"></el-table-column>
      <el-table-column prop="intro" label="介绍" width="120"></el-table-column>
      <!--<el-table-column prop="startTime" label="开始时间"></el-table-column>-->
      <!--<el-table-column prop="endTime" label="结束时间"></el-table-column>-->
      <el-table-column prop="version" label="版本号"></el-table-column>
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
          self.$api.get('/product/'+self.form.productId+'/history', null, r =>{
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
            self.loading = false;
            for(let i = 0;i<self.tableData.length;i++){
              let date =  self.tableData[i].createdAt;
              self.tableData[i].createdAt = self.getDate(date);
//              self.tableData[i].startTime = self.tableData[i].startTime.toString();
//              self.tableData[i].endTime = self.tableData[i].endTime.toString();
            }
          },
        }
    }
</script>
