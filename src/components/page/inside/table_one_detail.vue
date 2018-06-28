<template>
    <section>
        <el-row  v-loading="loading">
            <el-col :span="24" class="one_item">
                <div class="tit">品牌商信息</div>
                <div class="content_item">
                    <div class="left">品牌商：</div>
                    <div class="left" v-model="isCommodityBrand" v-text = "isCommodityBrand"></div>
                    <div class="clear"></div>
                </div>
                </div>
            </el-col>
            <!--保险订单基本信息-->
            <el-col :span="24" class="one_item">
                <div class="tit">保障订单基本信息</div>
                <el-row type="flex" justify="space-around">
                    <el-col :span="5">
                        <div class="content_item">
                            <div class="left">保障订单号：</div>
                            <div class="left" v-model="ins_message.irInsNo" v-text = "ins_message.irInsNo"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">保障名称：</div>
                            <div class="left" v-model="ins_message.insureCode" v-text = "ins_message.insureCode"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="content_item">
                            <div class="left">申请日期：</div>
                            <div class="left" v-model="ins_message.isCreateDate" v-text = "ins_message.isCreateDate"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="content_item">
                            <div class="left">投保日期：</div>
                            <div class="left" v-model="ins_message.isInsureDate" v-text = "ins_message.isInsureDate"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="5">
                        <div class="content_item">
                            <div class="left">投保状态：</div>
                            <div class="left" v-model="ins_message.irPlyStatusDesc" v-text = "ins_message.irPlyStatusDesc"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">保障期间：</div>
                            <div class="left" v-model="ins_message.servicePeriod" v-text = "ins_message.servicePeriod"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="13" >
                        <div class="content_item">
                            <div class="left">保单号：</div>
                            <div class="left">
                                <span v-for="item in insurancePolicy" style="margin-right: 20px">
                                    <span v-text="item.insPlyNo"></span>
                                    <a v-if="item.url !== null && item.url !== '' && item.url !== undefined && !/[\s*]/g.test(item.url)" :href="item.url" download="test.pdf">查看</a>
                                </span>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <!--<el-col>-->
                        <!--<div class="content_item">-->
                            <!--<div class="left">保单号2：</div>-->
                            <!--<div class="left" v-model="irInsPlyNum2" v-text = "irInsPlyNum2"></div>-->
                            <!--<div class="clear"></div>-->
                        <!--</div>-->
                    <!--</el-col>-->
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="24">
                        <div class="content_item">
                            <div class="left">导入时间：</div>
                            <div class="left" v-model="ins_message.irCreateDate" v-text = "ins_message.irCreateDate"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <!--保险产品基本信息-->
            <el-col :span="24" class="one_item">
                <div class="tit">保险产品基本信息</div>
                <el-row type="flex" justify="space-around">
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">保险产品名称：</div>
                            <div class="left" v-model="product_message.pdProcNm" v-text = "product_message.pdProcNm"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">保险公司：</div>
                            <div class="left" v-model="product_message.irProCompName" v-text = "product_message.irProCompName"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">保额：</div>
                            <div class="left" v-model="product_message.irProInsAmount" v-text = "product_message.irProInsAmount"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">保障时间：</div>
                            <div class="left" v-model="product_message.irProTimeRange" v-text = "product_message.irProTimeRange"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="24">
                        <div class="content_item">
                            <div class="left">保险费：</div>
                            <div class="left" v-model="product_message.irProPrice" v-text = "product_message.irProPrice"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <!--经销商信息-->
            <el-col :span="24" class="one_item" v-if="jp_show">
                <div class="tit">经销商信息</div>
                <el-row type="flex" justify="space-around">
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">大区名称：</div>
                            <div class="left" v-model="business_message.isDistrictName" v-text = "business_message.isDistrictName"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">业务经理：</div>
                            <div class="left" v-model="business_message.manager" v-text = "business_message.manager"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="content_item">
                            <div class="left">经销商名称：</div>
                            <div class="left" v-model="business_message.isDealerName" v-text = "business_message.isDealerName"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <!--被保人基本信息-->
            <el-col :span="24" class="one_item">
                <div class="tit">被保人基本信息</div>
                <el-row type="flex" justify="space-around">
                    <el-col :span="4">
                        <div class="content_item">
                            <div class="left">姓名：</div>
                            <div class="left" v-model="insure_message.isInsuredName" v-text = "insure_message.isInsuredName"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">身份证号码：</div>
                            <div class="left" v-model="insure_message.isInsuredIdNo" v-text = "insure_message.isInsuredIdNo"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="content_item">
                            <div class="left">性别：</div>
                            <div class="left" v-model="insure_message.isInsuredGender" v-text = "insure_message.isInsuredGender"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="content_item">
                            <div class="left">手机号码：</div>
                            <div class="left" v-model="insure_message.isInsuredPhone" v-text = "insure_message.isInsuredPhone"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="space-around">
                    <el-col :span="4">
                        <div class="content_item">
                            <div class="left">省：</div>
                            <div class="left" v-model="insure_message.isInsuredProvName" v-text = "insure_message.isInsuredProvName"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">市：</div>
                            <div class="left" v-model="insure_message.isInsuredCityName" v-text = "insure_message.isInsuredCityName"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="content_item">
                            <div class="left">区/县：</div>
                            <div class="left" v-model="insure_message.isInsuredAreaName" v-text = "insure_message.isInsuredAreaName"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="content_item">
                            <div class="left">详细地址：</div>
                            <div class="left" v-model="insure_message.isInsuredAddres" v-text = "insure_message.isInsuredAddres"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <!--被保车辆信息-->
            <el-col :span="24" class="one_item"  v-if="jp_show">
                <div class="tit">被保车辆信息</div>
                <el-row type="flex" justify="space-around">
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">品类：</div>
                            <div class="left" v-model="car_message.isCommodityCategory" v-text = "car_message.isCommodityCategory"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">车辆型号：</div>
                            <div class="left" v-model="car_message.isCommodityModel" v-text = "car_message.isCommodityModel"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">车架号：</div>
                            <div class="left" v-model="car_message.isCommodityBrandId" v-text = "car_message.isCommodityBrandId"></div>
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
                            <div class="left" v-model="car_message.isCommodityColor" v-text = "car_message.isCommodityColor"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">购车日期：</div>
                            <div class="left" v-model="car_message.isCommodityDate" v-text = "car_message.isCommodityDate"></div>
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
                            <div class="left" v-model="car_message.isOtherEquipment" v-text = "car_message.isOtherEquipment"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <!--被保车辆信息雅迪，宗申-->
            <el-col :span="24" class="one_item"  v-if="yd_zs_show">
                <div class="tit">被保车辆信息</div>
                <el-row type="flex" justify="space-around">
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">品类：</div>
                            <div class="left" v-model="car_message.isCommodityCategory" v-text = "car_message.isCommodityCategory"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">车辆型号：</div>
                            <div class="left" v-model="car_message.isCommodityModel" v-text = "car_message.isCommodityModel"></div>
                            <div class="clear"></div>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="content_item">
                            <div class="left">车架号：</div>
                            <div class="left" v-model="car_message.isCommodityBrandId" v-text = "car_message.isCommodityBrandId"></div>
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
            </el-col>
        </el-row>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                isCommodityBrand:'',
                jp_show:false,
                yd_zs_show:false,
                loading:true,
                insPlyNo:'',
//                irInsPlyNum1:'',
//                irInsPlyNum2:'',
                ins_message:{   // 保险订单基本详情
                    irInsNo:'',
                    insureCode:'',
                    isCreateDate:'',
                    isInsureDate:'',
                    servicePeriod:'',     // 保障期间
//                    irPlyStatusDesc:'',
//                    irPlyDateView:'',
//                    irInsPlyNos:[],
                },
                product_message:{  // 保险产品基本信息
                    pdProcNm:'',
                    irProCompName:'',
                    irProInsAmount:'',
                    irPlyBegDate:'',
                    irPlyEndDate:'',
                    irProPrice:''
                },
                business_message:{ // 经销商信息
                    isDistrictName:'',
                    manager:'',
                    isDealerName:''
                },
                insure_message:{  // 被保人信息
                    isInsuredName:'',
                    isInsuredIdNo:'',
                    isInsuredGender:'',
                    isInsuredPhone:'',
                    isInsuredProvName:'',
                    isInsuredCityName:'',
                    isInsuredAreaName:'',
                    isInsuredAddres:'',
                },
                car_message: {    // 车辆信息
                  isCommodityModel: '',
                  isCommodityCategory: '',
                  isCommodityBrandId: '',
                  isCommodityColor: '',
                  isCommodityDate: '',
                  codeKey: '',
                  isExtraEquipment: '',
                  isOtherEquipment: ''
                },
                insurancePolicy:[],          // 保单号
            }
        },
        created () {
            let idNo =  localStorage.getItem('idNo').slice(2);
            const self = this;
            self.$api.get('/insurance/'+ idNo, null, r =>{
                console.log(r.data);
                if (r.code === 200) {
                    self.isCommodityBrand = r.data.isCommodityBrand;
                    self.ins_message = r.data.orderBasicInfo;
                    self.product_message = r.data.productBasicInfo;
                    self.business_message = r.data.dealerBasicInfo;
                    self.insure_message = r.data.insuredBasicInfo;
                    self.car_message = r.data.commodityBasicInfo;
                    // 判断性别
                    if(self.insure_message.isInsuredGender === "F"){
                        self.insure_message.isInsuredGender = "女"
                    }else{
                        self.insure_message.isInsuredGender = "男"
                    }
                    // 设备
                    if(self.car_message.isExtraEquipment === "" || self.car_message.isExtraEquipment === null){
                        self.car_message.isExtraEquipment = "无"
                    }
                    if(self.car_message.isOtherEquipment === "" || self.car_message.isOtherEquipment === null){
                        self.car_message.isOtherEquipment = "无"
                    }
                    if(r.data.isCommodityBrand === "金彭"){
                        self.jp_show = true;
                        self.yd_zs_show = false;
                    }else if(r.data.isCommodityBrand === "雅迪" || r.data.isCommodityBrand === "宗申" || r.data.isCommodityBrand === "力帆"){
                        self.jp_show = false;
                        self.yd_zs_show = true;
                    }
                    // 投保单号
//                    if(self.ins_message.irInsPlyNos !== "" && self.ins_message.irInsPlyNos !== null){
//                        self.irInsPlyNum1 = self.ins_message.irInsPlyNos[0];
//                        self.irInsPlyNum2 = self.ins_message.irInsPlyNos[1];
//                    }else{
//                        self.irInsPlyNum1 = "";
//                        self.irInsPlyNum2 = "";
//                    }
                    // 投保单号
                    if(r.data.orderBasicInfo.irInsPlyNos.toString() !== ""){
                        for(let i = 0;i<r.data.orderBasicInfo.irInsPlyNos.length;i++){
                            self.insurancePolicy[i] = r.data.orderBasicInfo.irInsPlyNos[i];
                            console.log(self.insurancePolicy);
                        }
                    }else {
                        self.insPlyNo = "";
                    }
                    self.loading = false;
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
