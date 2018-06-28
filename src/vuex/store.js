import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

let state = {
  orderId : '',
  insuredIdNumber:'',
  insuredName:'',
  insuredMobile:'',
  productCode:'',
  orderInsuredTime1:'',
  orderInsuredTime2:'',
  orderStatus:'',
  vin:'',
  category:'',
  requestId:'',
  PolicyId:'',
  pageSize:20,
  currentPage: 1,
  entryTime:[],
  select:false,
}

export default new vuex.Store({
  state,
})
