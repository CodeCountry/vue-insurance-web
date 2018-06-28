<template>
    <div>
      <div class="top">
        <div class="title" style="margin-bottom: 20px">保单核对</div>
        <el-form :inline="true" ref="formInline" :model="formInline" enctype="multipart/form-data" :rules="rules" id="form_upload" method="post" action="/order/verification_ply_no">
          <el-form-item label="工作空间"  prop="sheetName">
            <el-input placeholder="请输入工作空间名" name="sheetName" v-model="formInline.sheetName"></el-input>
          </el-form-item>
          <el-form-item label="保单号所在列" prop="orderNoColumn">
            <el-input placeholder="请输入保单号所在列" name="orderNoColumn" v-model="formInline.orderNoColumn"></el-input>
          </el-form-item>
          <el-form-item label="列数" prop="columns">
            <el-input placeholder="请输入列数" name="columns" v-model="formInline.columns"></el-input>
          </el-form-item>
          <el-form-item label="选择日期段" name="beginDate" prop="beginDate">
            <el-date-picker
              v-model="formInline.beginDate"
              start-placeholder="开始日期"
              value-format="yyyyMMdd"
              name="beginDate">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="选择日期段" name="endDate" prop="endDate">
            <el-date-picker
              v-model="formInline.endDate"
              end-placeholder="结束日期"
              value-format="yyyyMMdd"
              name="endDate">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="保障产品" prop="productName">
            <el-select v-model="formInline.productName" name="productName"  placeholder="保障产品" @change="getInsurerName()">
              <el-option v-for="item in productArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保险公司" prop="insurerName">
            <el-select v-model="formInline.insurerName" name="insurerName"  placeholder="保险公司">
              <el-option v-for="item in insurerArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="图片上传" prop="file">-->
            <!--<input type="file" name="file"/>-->
            <!--&lt;!&ndash;<input type="button" class="submit_style" style="margin-left: 10px;" size="small" value="上传到服务器"  @click="onSubmit()"/>&ndash;&gt;-->
            <!--<el-button type="primary" size="medium" v-loading="editLoading" @click="onSubmit()">上传到服务器</el-button>-->
            <!--<div slot="tip" class="el-upload__tip">只能上传.xlsx文件，且不超过50MB</div>-->
          <!--</el-form-item>-->
          <el-form-item label="选择文件" prop="file">
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
      // 自定义手机号验证
      let checkNumber = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('不能为空'));
        }else if(!value.match("^[0-9]*$")){
          callback(new Error('请输入纯数字'));
        }else{
          callback();
        }
      };
      return {
        isAble:true,
        editLoading:false,
        formInline: {    // 上传参数
          sheetName:'',    // 空间名
          columns: '',      // 列数
          beginDate: '',   // 开始日期
          endDate:'',      // 结束日期
          insurerName:'',
          orderNoColumn:'', // 保险号所在列
          file:'',          // 文件名
          filename:''
        },
        productArr:[],          // 保障产品下拉
        insurerArr:[],          // 保险公司下拉
        rules: {
          sheetName: [
            { required: true, message: '请输入当前表格的名称即sheet名（区分大小写）', trigger: 'blur' }
          ],
          columns: [
            { required: true,  validator: checkNumber,message: '请输入的有效总列数（纯数字）', trigger: 'blur' }
          ],
          beginDate: [
            { required: true, message: '请输入时间段', trigger: 'blur' }
          ],
          endDate: [
            { required: true, message: '请输入时间段', trigger: 'blur' }
          ],
          insurerName: [
            { required: true, message: '请选择保险公司', trigger: 'change' }
          ],
          orderNoColumn: [
            { required: true, validator: checkNumber, message: '请输入保单号所在列（纯数字）', trigger: 'blur' }
          ],
          file: [
            { required: true, message: '请上传文件', trigger: 'blur' }
          ],
        },
        fileList:[],   // 文件预览列表
      }
    },
    created(){
      const self = this;
      self.$api.get('/product/all/name',null,r=>{
        if(r.code===200){
          self.productArr = r.data;
          if(r.data.length === 1){
            self.formInline.productName = r.data[0].id;
            self.getInsurerName();
          }
        }else{
          alert(r.message);
        }
      },res=>{
        this.$router.push({
          path: '/login',
        });
      })
      self.$api.get('/insurer/option/all', null, r =>{                    // 保险公司名称
        console.log(r.data);
        if (r.code === 200) {
          self.insurerArr = r.data;
        }else{
          alert(r.message);
        }
      });
    },
    methods: {
      getInsurerName(){
        const self = this;
        self.$api.get('/insurer/'+self.formInline.productName+'/product',null,r=>{
          if(r.code===200){
            if(r.data.length === 1){
              self.formInline.insurerName = r.data[0].id;
            }else if(r.data.length === 0){
              self.formInline.insurerName = '';
            }
          }else{
            alert(r.message);
          }
        },res=>{
          this.$router.push({
            path: '/login',
          });
        })
      },
      uploadFile(e){
        this.formInline.file = e.target.files[0];
        this.formInline.filename = e.target.files[0].name;
      },
      onSubmit() {
        const self = this;
        self.$refs['formInline'].validate((valid) => {
          if (valid) {
            self.editLoading = true;
            document.getElementById('form_upload').submit();
            self.editLoading = false;
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
  .el-form-item{
    margin-bottom:32px;
  }
</style>
