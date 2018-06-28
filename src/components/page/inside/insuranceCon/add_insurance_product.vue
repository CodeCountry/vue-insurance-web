<template>
  <div>
    <el-form ref="form" :label-position="labelPosition" label-width="110px" :rules="rules" :model="form">
      <el-form-item label="保险产品名" prop="name">
        <el-input v-model="form.name"  style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="保险介绍" prop="intro">
        <el-input v-model="form.intro" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="险种" prop="category">
        <el-select v-model="form.category" style="width: 80%;">
          <el-option v-for="item in categoryOption" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="开始时间" prop="startTime">-->
        <!--<el-date-picker type="date" placeholder="选择日期" value-format="yyyyMMdd" v-model="form.startTime" style="width: 80%;"></el-date-picker>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="结束时间" prop="endTime">-->
        <!--<el-date-picker type="date" placeholder="选择日期" value-format="yyyyMMdd"  v-model="form.endTime" style="width: 80%;"></el-date-picker>-->
      <!--</el-form-item>-->
      <el-form-item label="保额" prop="coverage">
        <el-input v-model="form.coverage" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="保障时间" prop="span">
        <el-input v-model="form.span" style="width: 80%;"></el-input>
      </el-form-item>
      <el-form-item label="生效方式" prop="effectiveWay">
        <el-select v-model="form.effectiveWay" style="width: 80%;">
          <el-option v-for="item in effectiveWayOption" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属保险公司" prop="insurerName">
        <el-select v-model="form.insurerName" style="width: 80%;">
          <el-option v-for="item in titleArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="编码格式" prop="code">
        <el-input v-model="form.code" style="width: 80%;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSave('form')" v-loading="editLoading">添加</el-button>
      <el-button @click="handleCancel()">取消</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
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
        labelPosition:'left',
        editLoading:false,
        form: {
          name:'',
          intro:'',
          category:'',
//          startTime:'',
//          endTime:'',
          coverage:'',
          insurerName:'',
          span:'',
          effectiveWay:'',
          code:''
        },
        rules: {
          name:[
            {required:true,message:'请输入保险产品名',trigger:'blur'},
          ],
          intro:[
            {required:true, message:'请输入介绍',trigger:'blur'},
          ],
          category:[
            {required:true, message:'请选择类型',trigger:'blur'},
          ],
//          startTime: [
//            { required: true, message: '请选择开始时间', trigger: 'blur' }
//          ],
//          endTime: [
//            { required: true, message: '请选择结束时间', trigger: 'blur' }
//          ],
          coverage:[
            {required:true,validator: checkNumber, message:'请输入保额（纯数字）',trigger:'blur'},
          ],
          insurerName:[
            {required:true, message:'请选择所属保险公司',trigger:'blur'},
          ],
          span:[
            {required:true, validator: checkNumber,message:'请输入保障时间（单位月，纯数字）',trigger:'blur'},
          ],
          effectiveWay:[
            {required:true, message:'请选择生效方式 ',trigger:'blur'},
          ],
          code:[
            {required:true, message:'请输入编码格式 ',trigger:'blur'},
          ],
        },
        titleArr:[],     // 保险公司下拉框
        categoryOption:[],   // 险种下拉框
        effectiveWayOption:[],     // 生效方式下拉框
      }
    },
    created(){
      const self = this;
      self.$api.get('/insurer/all',null,r=>{     // 所属保险公司下拉列表
        console.log(r.data);
        if(r.code===200){
          self.titleArr = r.data;
        }
      },res=>{
        self.$router.push('/login');
      })
      self.$api.get('insurerproduct/insuranceCategory',null,r=>{     // 险种下拉列表
        console.log(r.data);
        if(r.code===200){
          self.categoryOption = r.data;
        }
      },res=>{
        self.$router.push('/login');
      })
      self.$api.get('insurerproduct/effectiveWay',null,r=>{     // 生效方式下拉列表
        console.log(r.data);
        if(r.code===200){
          self.effectiveWayOption = r.data;
        }
      },res=>{
        self.$router.push('/login');
      })
    },
    methods:{
      handleSave (form) {            // 确认添加提交
        const self = this;
        self.$refs[form].validate((valid)=> {
          if (valid) {
            this.editLoading = true;
            self.form.insurerId = self.form.insurerName;
            console.log(self.form);
            self.$api.post('/insurerproduct', self.form, r => {
              if (r.code === 200) {
                this.$message({
                  message: "操作成功！",
                  type: 'success'
                });
                this.editLoading = false;
                this.$router.push("/insurance_products");
                
              } else {
                alert(r.message);
                this.editLoading = false;
              }
            }, res => {
              this.$router.push({
                path: '/login',
              });
            });
          }else{
          
          }
        })
      },
      handleCancel(){    // 取消
        this.$router.push({
          path: '/insurance_products',
        });
      },
      resetForm(form) {       // 重置
        this.$refs[form].resetFields();
      },
    }
    
  }
</script>
