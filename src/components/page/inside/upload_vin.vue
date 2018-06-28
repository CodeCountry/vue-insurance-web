<template>
  <div>
    <div class="top">
      <div class="title" style="margin-bottom: 20px">导入车架号
        <!--<a href="vehicle/downloadExcelTemplate" class="download">下载车架号模板</a>-->
      </div>
      <el-form :inline="true" ref="formInline" :model="formInline" :rules="rules">
        <el-form-item label="品牌" prop="brandId">
          <el-select v-model="formInline.brandId" placeholder="品牌" @change="sendProduct()">
            <el-option v-for="item in titleArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品类" prop="category" v-if="isProduct">
          <el-select v-model="formInline.category" name="category"  placeholder="品类">
            <el-option v-for="(val,key) in categoryArr" :key="key" :label="val" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始行"  prop="startLine">
          <el-input placeholder="请输入数据开始行" v-model="formInline.startLine"></el-input>
        </el-form-item>
        <el-form-item label="经销商名称" prop="dealerNameColumn">
          <el-input placeholder="请输入经销商名称所在列" v-model="formInline.dealerNameColumn"></el-input>
        </el-form-item>
        <el-form-item label="车架号" prop="vinColumn">
          <el-input placeholder="请输入车架号所在列" v-model="formInline.vinColumn"></el-input>
        </el-form-item>
        <el-form-item label="车型号" prop="modelColumn">
          <el-input placeholder="请输入车型号所在列" v-model="formInline.modelColumn"></el-input>
        </el-form-item>
        <el-form-item label="车型名称" prop="nameColumn">
          <el-input placeholder="请输入车型名称所在列" v-model="formInline.nameColumn"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="colorColumn">
          <el-input placeholder="请输入颜色所在列" v-model="formInline.colorColumn"></el-input>
        </el-form-item>
        <el-form-item label="经销商编码" prop="dealerCodeColumn">
          <el-input placeholder="请输入经销商编码所在列" v-model="formInline.dealerCodeColumn"></el-input>
        </el-form-item>
        <el-form-item label="出厂时间" prop="madeAtColumn">
          <el-input placeholder="请输入出厂时间所在列" v-model="formInline.madeAtColumn"></el-input>
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
          <div style="display: inline;">只能上传.xlsx/.xls文件，且不超过5MB</div>
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
          brandId:'',           // 厂商
          category: '',      // 品类
          file:'',
          filename:'',     // 文件名
          startLine:'2',
          dealerNameColumn:'A',  // 经销商名称
          vinColumn:'B',    // 车架号
          modelColumn:'C',  // 车型号
          nameColumn:'D', // 车型名称
          colorColumn:'E',  // 颜色
          dealerCodeColumn:'F',  // 经销商编码
          madeAtColumn:'G',       // 出厂时间
        },
        dataArr:[],
        titleArr:[],   // 保障产品下拉列表
        categoryArr:[],  // 品类
        rules: {
          brandId: [
            { required: true, message: '请选择品牌', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择品类', trigger: 'blur' }
          ],
          startLine: [
            { required: true, message: '请输入数据开始行', trigger: 'blur' }
          ],
          vinColumn: [
            { required: true, message: '请输入车架号所在列', trigger: 'blur' }
          ],
          file: [
            { required: true, message: '请上传文件', trigger: 'blur' }
          ],
        },
      }
    },
    created(){
      const self = this;
      self.$api.get('/brand/option/all', null, r =>{                    // 品牌名称
        console.log(r.data);
        if (r.code === 200) {
          self.titleArr = r.data;
          if(r.data.length === 1){
            self.formInline.brandId = r.data[0].id;
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
        self.formInline.category = '';
        self.$api.get('brandconfig/brand/'+self.formInline.brandId+'/category', null, r =>{     // 品类名称
          console.log(r.data);
          if (r.code === 200) {
            self.dataArr = '';
            self.categoryArr = r.data;
            self.isProduct = true;
            for(let i in r.data) {
              if(Object.keys(r.data).length ===1){      // 长度为1时自动选取
                self.formInline.category = i;
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
            if(this.formInline.file.size/1024/1024 <= 5) {      // 文件大小不能超过5MB
              this.editLoading = true;
              let formData = new FormData();
              formData.append("brandId", self.formInline.brandId);
              formData.append("category", self.formInline.category);
              formData.append("startLine", self.formInline.startLine);
              formData.append("dealerNameColumn",self.formInline.dealerNameColumn);
              formData.append("vinColumn",self.formInline.vinColumn);
              formData.append("modelColumn",self.formInline.modelColumn);
              formData.append("nameColumn",self.formInline.nameColumn);
              formData.append("colorColumn",self.formInline.colorColumn);
              formData.append("dealerCodeColumn",self.formInline.dealerCodeColumn);
              formData.append("madeAtColumn",self.formInline.madeAtColumn);
              formData.append("file", self.formInline.file);
              console.log(formData);
              self.$api.post('/vehicle/uploadVehicleNew', formData, r => {
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
