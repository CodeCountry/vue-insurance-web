<template>
  <div>
    <div class="top">
      <div class="title" style="margin-bottom: 20px">导入保单</div>
      <el-form :inline="true" ref="formInline" :model="formInline" :rules="rules">
        <el-form-item label="开始行"  prop="startLine">
          <el-input  type="number" placeholder="请输入数据开始行" v-model="formInline.startLine"></el-input>
        </el-form-item>
        <el-form-item label="保单ID" prop="pId">
          <el-input placeholder="请输入保单ID所在列" v-model="formInline.pId"></el-input>
        </el-form-item>
        <el-form-item label="保单号" prop="num">
          <el-input placeholder="请输入保单号所在列" v-model="formInline.num"></el-input>
        </el-form-item>
        <el-form-item label="保单生成时间" prop="time">
          <el-input placeholder="请输入保单生成时间所在列" v-model="formInline.time"></el-input>
        </el-form-item>
        <el-form-item label="保险起期" prop="beginDate">
          <el-input placeholder="请输入保险起期所在列" v-model="formInline.beginDate"></el-input>
        </el-form-item>
        <el-form-item label="保险止期" prop="endDate">
          <el-input placeholder="请输入保险止期所在列" v-model="formInline.endDate"></el-input>
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
          file:'',
          filename:'',     // 文件名
          startLine:'2',
          pId:'Z',
          num:'AA',
          time:'AB',
          beginDate:'AC',
          endDate:'AD',
        },
        dataArr:[],
        rules: {
          startLine: [
            { required: true, message: '请输入数据开始行', trigger: 'blur' }
          ],
          pId: [
            { required: true, message: '请输入保单号所在列', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '请输入保单号所在列', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '请输入保单生成时间所在列', trigger: 'blur' }
          ],
          beginDate: [
            { required: true, message: '请输入保险起期所在列', trigger: 'blur' }
          ],
          endDate: [
            { required: true, message: '请输入保险止期所在列', trigger: 'blur' }
          ],
          file: [
            { required: true, message: '请上传文件', trigger: 'blur' }
          ],
        },
      }
    },
    created(){
    
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
            if(this.formInline.file.size/1024/1024 <= 2){     // 文件不能超过2MB
              this.editLoading = true;
  //            console.log(self.formInline.beginDate);
              let formData = new FormData();
              formData.append("startLine",self.formInline.startLine);
              formData.append("columns",[self.formInline.pId,self.formInline.num,self.formInline.time,self.formInline.beginDate,self.formInline.endDate]);
              formData.append("file", self.formInline.file);
  //            console.log(formData);
              self.$api.post('/policy/import',formData, r => {
  //              console.log(r.data);
                if(r.code === 200){
                  alert(r.message);
                  self.dataArr = r.data;
                  self.$refs[form].resetFields();
                  document.getElementById('file').value = '';
                  self.formInline.filename = '';
                }else{
                  alert(r.message);
                }
                this.editLoading = false;
              },res=>{
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
