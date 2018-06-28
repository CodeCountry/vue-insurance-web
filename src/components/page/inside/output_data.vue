<template>
  <div>
    <div class="top">
      <div class="title" style="margin-bottom: 20px">导出赠险数据</div>
      <el-form :inline="true" ref="formInline" :model="formInline" enctype="multipart/form-data"  :rules="rules" method="post" id="form_output" action="">
        <!--<el-form-item label="保障名称" prop="insureCode">-->
          <!--<el-select v-model="formInline.insureCode" placeholder="保障名称" name="insureCode">-->
            <!--<el-option value="all" label="全部">全部</el-option>-->
            <!--<el-option v-for="(val,key) in titleArr" :key="key" :label="key" :value="val"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="保障产品" prop="productCode">
          <el-select v-model="formInline.productCode" placeholder="保障产品" @change="sendProduct()">
            <el-option v-for="item in titleArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品类" prop="commodityCategory" v-if="isProduct">
          <el-select v-model="formInline.commodityCategory" name="commodityCategory"  placeholder="品类">
            <el-option v-for="(val,key) in categoryArr" :key="key" :label="val" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择下载模板" prop="downloadModel" v-if="isProduct">
          <el-select v-model="formInline.downloadModel" name="downloadModel"  placeholder="选择下载模板">
            <el-option :key="modelArr.id" :label="modelArr.name" :value="modelArr.id"></el-option>
            <!--<el-option v-for="item in modelArr" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="进件开始日期" prop="beginDate">
          <el-date-picker
            v-model="formInline.beginDate"
            start-placeholder="开始日期"
            value-format="yyyy-MM-dd"
            name="beginDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="进件结束日期" prop="endDate">
          <el-date-picker
            v-model="formInline.endDate"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            name="endDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <input type="button" class="submit_style" style="margin-left: 10px;" size="small" value="导出数据"  @click="onSubmit()"/>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        isProduct:false,
        postUrl:'',
        formInline: {    // 上传参数
          productCode:'',    // 保障名称
          commodityCategory: '',      // 品类
          downloadModel:'',             // 订单下载
          beginDate: '',   // 开始日期
          endDate:'',      // 结束日期
          isDate1:'',
          isDate2:'',
        },
        titleArr:[],  // 保障名称下拉
        categoryArr:[],  // 品类
        modelArr:{},  // 选择下载模板
        rules: {
          productCode: [
            { required: true, message: '请选择保障名称', trigger: 'blur' }
          ],
          commodityCategory: [
            { required: true, message: '请选择品类', trigger: 'blur' }
          ],
          downloadModel: [
            { required: true, message: '请选择下载模板', trigger: 'blur' }
          ],
          beginDate: [
            { required: true, message: '请输入时间段', trigger: 'blur' }
          ],
          endDate: [
            { required: true, message: '请输入时间段', trigger: 'blur' }
          ],
        },
      }
    },
    created(){
      const self = this;
//      self.$api.get('/insurance/protitleForExt', null, r =>{
//        console.log(r.data);
//        if (r.code === 200) {
//          self.titleArr = r.data;
//        }else{
//        }
//      });
      self.$api.get('/product/export', null, r =>{                    // 保障产品名称
        console.log(r.data);
        if (r.code === 200) {
          self.titleArr = r.data;
          if(r.data.length === 1){
            self.formInline.productCode = r.data[0].id;
            self.sendProduct();
          }
        }else{
          alert(r.message);
        }
      },res=>{
        this.$router.push({
          path: '/login',
        });
      });
    },
    methods: {
      sendProduct(){     // 获取品类下拉框
        const self = this;
        self.isProduct = true;
        self.formInline.commodityCategory = '';
        self.$api.get('/brandconfig/product/'+self.formInline.productCode+'/category', null, r =>{     // 品类名称
          console.log(r.data);
          if (r.code === 200) {
            self.categoryArr = r.data;
            for(let i in r.data) {
              if(Object.keys(r.data).length ===1){      // 长度为1时自动选取
                self.formInline.commodityCategory = i;
                console.log(self.formInline.commodityCategory);
              }
            }
          }else{
            alert(r.message);
          }
        },res=>{
          this.$router.push({
            path: '/login',
          });
        });
        for(let i = 0;i<self.titleArr.length;i++){
          if(self.titleArr[i].id === self.formInline.productCode){
            self.modelArr = self.titleArr[i].exportTemplate;
            self.formInline.downloadModel = self.modelArr.id;
          }
        }
//        self.modelArr
//        self.$api.get('/exportTemplate/'+self.formInline.productCode, null, r =>{     // 订单模板
//          console.log(r.data);
//          if (r.code === 200) {
//            self.modelArr = r.data;
//            for(let i in r.data) {
//              if(Object.keys(r.data).length ===1){      // 长度为1时自动选取
//                self.formInline.commodityCategory = i;
//                console.log(self.formInline.commodityCategory);
//              }
//            }
//          }else{
//            alert(r.message);
//          }
//        });
      },
      onSubmit(form) {
        const self = this;
        self.formInline.isDate1 = self.getTimeStamp(self.formInline.beginDate.split('-')[0],self.formInline.beginDate.split('-')[1],self.formInline.beginDate.split('-')[2]);
        self.formInline.isDate2 = ((self.getTimeStamp(self.formInline.endDate.split('-')[0],self.formInline.endDate.split('-')[1],self.formInline.endDate.split('-')[2]))/1000+86399)*1000;
        self.$refs['formInline'].validate((valid) => {
          if (valid) {
            console.log(self.formInline.endDate);
//            self.postUrl = '/order/export/product/'+self.formInline.productCode+'/category/'+self.formInline.commodityCategory+'/start/'+self.formInline.isDate1+'/end/'+self.formInline.isDate2;
            self.postUrl = '/order/export/template/'+self.formInline.downloadModel+'/'+self.formInline.isDate1+'/'+self.formInline.isDate2+'/'+self.formInline.productCode+'/'+self.formInline.commodityCategory;
            document.getElementById('form_output').action = self.postUrl;
            document.getElementById('form_output').submit();
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
    }
  }
</script>
<style>
  .submit_style{
    padding:8px 12px;
    border:none;
    background-color: #409eff;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    color: #fff;
  }
  .submit_style:focus, .submit_style:hover {
    color: #fff;
    border-color: #66b1ff;
    background-color:#66b1ff;
  }
</style>
