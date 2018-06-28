<template>
  <div>
    <div class="top">
      <div class="title" style="margin-bottom: 20px">导入兑换码  <a href="codeKey/downloadExcelTemplate" class="download">下载兑换码模板</a></div>
      <!--<el-form :inline="true" ref="formInline" :model="formInline" :rules="rules" id="form_upload" enctype="multipart/form-data" method="post" action="/import/uploadCodeKeys">-->
      <el-form :inline="true" ref="formInline" :model="formInline" :rules="rules">
        <el-form-item label="厂商" prop="facturer">
          <el-select v-model="formInline.facturer" name="facturer" placeholder="厂商">
            <el-option label="金彭" value="金彭"></el-option>
            <el-option label="宗申" value="宗申"></el-option>
            <el-option label="雅迪" value="雅迪"></el-option>
            <el-option label="力帆" value="力帆"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="品类" prop="commodityCategory">-->
          <!--<el-select v-model="formInline.commodityCategory" name="commodityCategory"  placeholder="品类">-->
            <!--<el-option label="二轮电动车" value="二轮电动车"></el-option>-->
            <!--<el-option label="二轮摩托车" value="二轮摩托车"></el-option>-->
            <!--<el-option label="三轮电动车" value="三轮电动车"></el-option>-->
            <!--<el-option label="三轮摩托车" value="三轮摩托车"></el-option>-->
            <!--<el-option label="四轮电动车" value="四轮电动车"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        
        <el-form-item label="兑换码文件上传" prop="file">
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
    </div>
  
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        isAble:true,
        editLoading:false,
        formInline: {    // 上传参数
          facturer:'',           // 厂商
//          commodityCategory: '',      // 品类
          file:'',          // 文件名
          filename:'',
        },
        rules: {
          facturer: [
            { required: true, message: '请选择厂商', trigger: 'blur' }
          ],
//          commodityCategory: [
//            { required: true, message: '请选择品类', trigger: 'blur' }
//          ],
          file: [
            { required: true, message: '请上传文件', trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      uploadFile(e){
        this.formInline.file = e.target.files[0];
        this.formInline.filename = e.target.files[0].name;
      },
      onSubmit(form) {
        const self = this;
        self.$refs['formInline'].validate((valid) => {
          if (valid) {
            self.editLoading = true;
            let formData = new FormData();
            formData.append("facturer", self.formInline.facturer);
//            formData.append("commodityCategory",self.formInline.commodityCategory);
            formData.append("file", self.formInline.file);
            self.$api.post('/codeKey/uploadCodeKey',formData, r => {
              console.log(r.data);
              if(r.code === 200){
                alert(r.message);
                self.$refs[form].resetFields();
                document.getElementById('file').value = '';
                
              }else{
                alert(r.message);
              }
              self.editLoading = false;
            },res=>{
              this.$router.push({
                path: '/login',
              });
            })
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
