<template>
  <section>
    <el-row>
      <el-col :span="24" class="one_item">
        <div class="tit">品牌商信息</div>
        <div class="content_item">
          <div class="left">品牌商：</div>
          <div class="left" v-model="isCommodityBrand" v-text = "isCommodityBrand"></div>
          <div class="clear"></div>
        </div>
      </el-col>
      <!--保障订单基本信息-->
      <el-col :span="24">
        <div class="tit">保障订单基本信息</div>
        <div class="content_item">
          <div class="left">来源标识：</div>
          <div class="left" v-model="modeValue" v-text="modeValue"></div>
          <div class="clear"></div>
        </div>
        <el-row type="flex" justify="space-around">
          <el-col :span="8">
            <div class="content_item">
              <div class="left">保障订单号：</div>
              <div class="left" v-model="ins_message.id" v-text = "ins_message.id"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">保障名称：</div>
              <div class="left" v-model="ins_message.name" v-text = "ins_message.name"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">申请日期：</div>
              <div class="left" v-model="ins_message.createdAt" v-text = "ins_message.createdAt"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="content_item">
              <div class="left">保障订单状态：</div>
              <div class="left" v-model="ins_message.status.value" v-text = "ins_message.status.value"></div>
              <div class="clear"></div>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="4">
            <div class="content_item">
              <div class="left">省：</div>
              <div class="left" v-model="insured.livingProvince" v-text = "insured.livingProvince"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="content_item">
              <div class="left">市：</div>
              <div class="left" v-model="insured.livingCity" v-text = "insured.livingCity"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="content_item">
              <div class="left">区/县：</div>
              <div class="left" v-model="insured.livingDistrict" v-text = "insured.livingDistrict"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="content_item">
              <div class="left">详细地址：</div>
              <div class="left" v-model="insured.livingAddress" v-text = "insured.livingAddress"></div>
              <div class="clear"></div>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col  v-if="refusalReason">
            <div class="content_item">
              <div class="left">投保失败原因：</div>
              <div class="left" v-model="refusalReason" v-text = "refusalReason"></div>
              <div class="clear"></div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!--被保车辆信息-->
      <el-col :span="24" v-if="jp_show">
        <div class="tit">被保车辆信息</div>
        <el-row type="flex" justify="space-around">
          <el-col :span="6">
            <div class="content_item">
              <div class="left">品类：</div>
              <div class="left" v-model="car_message.category.value" v-text = "car_message.category.value"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">车辆型号：</div>
              <div class="left" v-model="car_message.model" v-text = "car_message.model"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">车架号：</div>
              <div class="left" v-model="car_message.vin" v-text = "car_message.vin"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">兑换码：</div>
              <div class="left" v-model="car_message.codeKey" v-text = "car_message.codeKey"></div>
              <div class="clear"></div>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="6">
            <div class="content_item">
              <div class="left">颜色：</div>
              <div class="left" v-model="car_message.color" v-text = "car_message.color"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">购车日期：</div>
              <div class="left" v-model="car_message.purchaseDate" v-text = "car_message.purchaseDate"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">辅助设备：</div>
              <div class="left" v-model="car_message.isExtraEquipment" v-text = "car_message.isExtraEquipment"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">其他辅助设备：</div>
              <div class="left" v-model="car_message.remark" v-text = "car_message.remark"></div>
              <div class="clear"></div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!--被保车辆信息雅迪，宗申-->
      <el-col :span="24" v-if="zs_show">
        <div class="tit">被保车辆信息</div>
        <el-row type="flex" justify="space-around">
          <el-col :span="6">
            <div class="content_item">
              <div class="left">品类：</div>
              <div class="left" v-model="car_message.category.value" v-text = "car_message.category.value"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">车辆型号：</div>
              <div class="left" v-model="car_message.model" v-text = "car_message.model"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">车架号：</div>
              <div class="left" v-model="car_message.vin" v-text = "car_message.vin"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">兑换码：</div>
              <div class="left" v-model="car_message.codeKey" v-text = "car_message.codeKey"></div>
              <div class="clear"></div>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="6">
            <div class="content_item">
              <div class="left">购车价格：</div>
              <div class="left" v-model="car_message.price" v-text = "car_message.price"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">购车用途：</div>
              <div class="left" v-model="car_message.purchasePurpose" v-text = "car_message.purchasePurpose"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="content_item">
              <div class="left">购车日期：</div>
              <div class="left" v-model="car_message.purchaseDate" v-text = "car_message.purchaseDate"></div>
              <div class="clear"></div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!--经销商信息-->
      <el-col :span="24" class="one_item">
        <div class="tit">经销商信息</div>
        <el-row type="flex" justify="space-around">
          <el-col :span="6">
            <div class="content_item">
              <div class="left">大区名称：</div>
              <div class="left" v-model="business_message.area" v-text = "business_message.area"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="content_item">
              <div class="left">业务经理：</div>
              <div class="left" v-model="business_message.director" v-text = "business_message.director"></div>
              <div class="clear"></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="content_item">
              <div class="left">经销商编码：</div>
              <div class="left" v-model="business_message.code" v-text = "business_message.code"></div>
              <div class="clear"></div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <div v-for="(item,index) in insurancePolicy">
        <!--子产品一基本信息-->
        <el-col :span="24" >
          <div class="tit">保单<span v-if="insurancePolicy.length>1" v-text="index+1"></span>&nbsp; 基本信息</div>
          <el-row type="flex" justify="space-around">
            <el-col>
              <div class="content_item">
                <div class="left">保险产品名称：</div>
                <div class="left" v-text = "item.insurerProduct.name"></div>
                <div class="clear"></div>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <div class="content_item">
                <div class="left">保单创建时间：</div>
                <div class="left" v-text = "item.insCreateTime"></div>
                <div class="clear"></div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content_item">
                <div class="left">保险起期：</div>
                <div class="left" v-text ="item.startTime"></div>
                <div class="clear"></div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content_item">
                <div class="left">保险止期：</div>
                <div class="left" v-text = "item.endTime"></div>
                <div class="clear"></div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content_item">
                <div class="left">保单状态：</div>
                <div class="left" v-text = "item.status.value"></div>
                <div class="clear"></div>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col v-if="insurancePolicy!=''">
              <div class="content_item">
                <div class="left">保单号：</div>
                <div class="left">
                  <span v-text="item.insPlyNo"></span>
                  <a v-if="item.url !== null && item.url !== '' && item.url !== undefined && !/[\s*]/g.test(item.url)" :href="item.url" download="test.pdf">查看</a>
                </div>
                <div class="clear"></div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <!--被保人基本信息-->
        <el-col :span="24" class="one_item">
          <div class="tit">被保人基本信息</div>
          <el-row type="flex" justify="space-around" v-for="number in item.insuredPolicies" :key="number.insuredId">
            <el-col :span="4">
              <div class="content_item">
                <div class="left" v-text="number.name"></div>
                <div class="left" v-text = "insured.name" v-if="number.insuredId===insured.id"></div>
                <div class="left" v-text = "passenger.name" v-else></div>
                <div class="clear"></div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content_item">
                <div class="left">身份证号码：</div>
                <div class="left" v-text = "insured.idNumber" v-if="number.insuredId===insured.id"></div>
                <div class="left" v-text = "passenger.idNumber" v-else></div>
                <div class="clear"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="content_item">
                <div class="left">性别：</div>
                <div class="left" v-text = "insured.gender" v-if="number.insuredId===insured.id"></div>
                <div class="left" v-text = "passenger.gender" v-else></div>
                <div class="clear"></div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="content_item">
                <div class="left">手机号码：</div>
                <div class="left" v-text = "insured.mobile" v-if="number.insuredId===insured.id"></div>
                <div class="left" v-text = "passenger.mobile" v-else></div>
                <div class="clear"></div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </div>
      
    </el-row>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        isCommodityBrand:'',            // 品牌
        jp_show:false,
        zs_show:false,
        insPlyNo:'',
        refusalReason:'',
        modeValue:'',
        ins_message:{        // 保障订单
          status:'',
        },
        insured:{},        // 被保人信息
        passenger:{},      // 乘车人信息
        business_message:{},
        car_message:{          // 车辆信息
         
          isExtraEquipment:[],   // 辅助设备
        },
        insurancePolicy:[],          // 保险产品
      }
    },
    created () {
      let idNo =  localStorage.getItem('idNo');
      const self = this;
      self.$api.get('/gift_order/order_detail/'+ idNo, null, r =>{
        if (r.code === 200) {
          if(r.data.commodity.brand ==="金彭"){
            self.jp_show = true;
          }else{
            self.zs_show = true;
          }
          if(r.data.mode!== null && r.data.mode!== ''){
            self.modeValue = r.data.mode.value;
          }else{}
          self.refusalReason = r.data.refusalReason;  // 投保失败原因
          self.isCommodityBrand = r.data.commodity.brand;
          self.ins_message = r.data;
          self.insured = r.data.insured;               // 被保人信息
          self.passenger = r.data.passenger;           // 乘车人信息
          self.business_message = r.data.commodity.dealer;
          self.car_message = r.data.commodity;
          self.ins_message.name = r.data.product.name;    // 保障名称
          // 时间
          self.ins_message.createdAt = self.getDate(r.data.createdAt)
          if(r.data.commodity.purchaseDate===0){
            self.car_message.purchaseDate=null;
          }else{
            self.car_message.purchaseDate = self.getDate(r.data.commodity.purchaseDate)
          }
          // 判断性别
          if(r.data.insured.gender === "Male"){
            self.insured.gender = "男"
          }else{
            self.insured.gender = "女"
          }
          if(r.data.passenger.gender === "Male"){
            self.passenger.gender = "男"
          }else{
            self.passenger.gender = "女"
          }
          // 投保单号
          self.insurancePolicy = r.data.policies;
          for(let i = 0;i<r.data.policies.length;i++){
            self.insurancePolicy[i].insCreateTime = self.getDate(r.data.policies[i].insCreateTime);
            self.insurancePolicy[i].endTime = self.getDate(r.data.policies[i].endTime)
            self.insurancePolicy[i].startTime = self.getDate(r.data.policies[i].startTime)
          }
          // 辅助设备
          let extraEquipment = new Array();
          if(r.data.commodity.airCondition){
            extraEquipment.push('空调');
          }
          if(r.data.commodity.rangeExtender){
            extraEquipment.push('增程器');
          }
//          console.log(extraEquipment.toString());
          if(extraEquipment.toString() === ''){
            self.car_message.isExtraEquipment = '无';
          }else{
            self.car_message.isExtraEquipment = extraEquipment.toString();
          }
          // 其他辅助设备
          if(r.data.commodity.remark === "" || r.data.commodity.remark === null){
            self.car_message.remark = "无";
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
  }
</script>
<style>
  .left{
    float:left;
  }
  .clear{
    clear: both;
  }
  .one_item{
    border-bottom: 1.5px solid #aaa;
    padding-bottom: 20px;
    margin-bottom: 15px;
  }
  .tit{
    font-size:15px;
    margin-bottom: 15px;
    font-weight:bold;
  }
  .content_item{
    font-size:14px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .content_item div:first-child{
    margin-right: 10px;
  }
</style>
