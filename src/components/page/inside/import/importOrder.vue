<template>
  <div>
    <div class="top">
      <div class="title" style="margin-bottom: 20px">导入订单</div>
      <el-form :inline="true" ref="formInline" :model="formInline" :rules="rules">
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
        <el-form-item label="开始行"  prop="startLine">
          <el-input placeholder="请输入数据开始行" v-model="formInline.startLine"></el-input>
        </el-form-item>
        <el-form-item label="车架号" prop="vin">
          <el-input placeholder="请输入车架号所在列" v-model="formInline.vin"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名所在列" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNum">
          <el-input placeholder="请输入身份证号所在列" v-model="formInline.idNum"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入手机号所在列" v-model="formInline.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input placeholder="请输入地址所在列" v-model="formInline.address"></el-input>
        </el-form-item>
        <el-form-item label="选择订单文件" prop="file">
          <div class="upload_file">
            <input type="file" name="file" id="file" ref="file" @change="uploadFile" />
            <input type="button" class="submit_style" size="small" value="上传文件"/>
          </div>
          <div style="display: inline;" class="fileName" v-text="formInline.filename"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" v-if="!editLoading" @click="onSubmit('formInline')">上传到服务器</el-button>
          <el-button type="primary" size="medium" v-loading="editLoading" v-else disabled>上传到服务器</el-button>
          <div style="display: inline;">只能上传.xlsx/.xls文件，且不超过2MB</div>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <div v-for="item in dataArr" v-text="item" style="color: red;"></div>
      </el-form>
    </div>
  
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        isAble:true,
        isProduct:false,
        editLoading:false,
        formInline: {    // 上传参数
          productCode:'',           // 厂商
          commodityCategory: '',      // 品类
          file:'',
          filename:'',     // 文件名
          startLine:'2',
          vin:'B',
          name:'C',
          idNum:'D',
          phone:'E',
          address:'I',
        },
        dataArr:[],
        titleArr:[],
        categoryArr:[],  // 品类
        rules: {
          productCode: [
            { required: true, message: '请选择保障产品', trigger: 'blur' }
          ],
          commodityCategory: [
            { required: true, message: '请选择品类', trigger: 'blur' }
          ],
          startLine: [
            { required: true, message: '请输入数据开始行', trigger: 'blur' }
          ],
          vin: [
            { required: true, message: '请输入车架号所在列', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名所在列', trigger: 'blur' }
          ],
          idNum: [
            { required: true, message: '请输入身份证号所在列', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号所在列', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址所在列', trigger: 'blur' }
          ],
          file: [
            { required: true, message: '请上传文件', trigger: 'blur' }
          ],
        },
      }
    },
    created(){
      const self = this;
      self.$api.get('/product/option/free', null, r =>{                    // 保障产品名称
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
      });
    },
    methods: {
      uploadFile(e){
        this.formInline.file = e.target.files[0];
        this.formInline.filename = e.target.files[0].name;
      },
      sendProduct(){     // 获取品类下拉框
        const self = this;
        self.isProduct = true;
        self.formInline.commodityCategory = '';
        self.$api.get('/brandconfig/product/'+self.formInline.productCode+'/category', null, r =>{     // 品类名称
          console.log(r.data);
          if (r.code === 200) {
            self.dataArr = '';
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
        });
      },
      onSubmit(form) {
        const self = this;
        self.$refs['formInline'].validate((valid) => {
          if (valid) {
            if(this.formInline.file.size/1024/1024 <= 2) {      // 文件大小不能超过2MB
              this.editLoading = true;
              let formData = new FormData();
              formData.append("productId", self.formInline.productCode);
              formData.append("category", self.formInline.commodityCategory);
              formData.append("startLine", self.formInline.startLine);
              formData.append("columns", [self.formInline.vin, self.formInline.name, self.formInline.idNum, self.formInline.phone, self.formInline.address]);
              formData.append("file", self.formInline.file);
              console.log(formData);
              self.$api.post('/order/import', formData, r => {
                console.log(r.data);
                if (r.code === 200) {
                  alert(r.message);
                  self.dataArr = r.data;
                  self.$refs[form].resetFields();
                  document.getElementById('file').value = '';
                  self.formInline.filename = '';
                } else {
                  alert(r.message);
                }
                this.editLoading = false;
              }, res => {
                this.$router.push({
                  path: '/login',
                });
              })
            }else{
              alert('上传文件不能超过2MB,请重新上传');
            }
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
  .upload_file {
      display: inline-block;
      position: relative;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
  }
  .upload_file input[type=file] {
      position: absolute;
      left: 0;
      top: 0;
      bottom:0;
      right:0;
      width: 100%;
      opacity: 0;
      cursor: pointer;
  }
  .upload_file .submit_style {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-family: "Microsoft yahei";
      background-color: #409eff;
      color: #FFF;
      text-decoration: none;
  }
  .submit_style{
      padding:8px 12px;
      border:none;
      background-color: #409eff;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      color: #fff;
  }
  .download{
      display: inline-block;
      padding: 8px 12px;
      border: none;
      background-color: #409eff;
      border-radius: 3px;
      color: #fff;
      font-size: 13px;
  }
</style>
