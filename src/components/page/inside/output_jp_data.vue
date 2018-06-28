<template>
  <div>
    <div class="top">
      <div class="title" style="margin-bottom: 20px">导出金彭赠险数据</div>
      <el-form :inline="true" ref="formInline" :model="formInline" enctype="multipart/form-data" :rules="rules" id="form_output" method="post" action="/order/exportJpFreeInsurance">
        <el-form-item label="品类" prop="category">
          <el-select v-model="formInline.category" name="category"  placeholder="品类">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="二轮电动车" value="二轮电动车"></el-option>
            <el-option label="三轮电动车" value="三轮电动车"></el-option>
            <el-option label="四轮电动车" value="四轮电动车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择开始日期" prop="beginDate">
          <el-date-picker
            v-model="formInline.beginDate"
            start-placeholder="开始日期"
            value-format="yyyyMMdd 00:00:00"
            name="beginDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择结束日期" prop="endDate">
          <el-date-picker
            v-model="formInline.endDate"
            end-placeholder="结束日期"
            value-format="yyyyMMdd 23:59:59"
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
        formInline: {    // 上传参数
          beginDate: '',   // 开始日期
          endDate:'',      // 结束日期
          category: '',      // 品类
        },
        titleArr:[],  // 保障名称下拉
        rules: {
          category: [
            { required: true, message: '请选择品类', trigger: 'blur' }
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
    methods: {
      onSubmit() {
        const self = this;
        self.$refs['formInline'].validate((valid) => {
          if (valid) {
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
