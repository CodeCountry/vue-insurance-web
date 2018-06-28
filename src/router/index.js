import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/welcome',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/page/Welcome.vue'], resolve)
        },
         // 外部系统
        {
          path: '/insurance_list',
          component: resolve => require(['../components/page/Insurance_list.vue'], resolve)
        }, {
          path: '/table_one_detail',
          component: resolve => require(['../components/page/Table_one_detail.vue'], resolve)
        }, {
          path: '/user_list',
          component: resolve => require(['../components/page/User_list.vue'], resolve)
        },
        // -----------------------------------------------内部系统---------------------------
        {
          path: '/insurance_list2',
          component: resolve => require(['../components/page/inside/Insurance_list.vue'], resolve)
        }, {
          path: '/table_one_detail2',
          component: resolve => require(['../components/page/inside/Table_one_detail.vue'], resolve)
        }, {
          path: '/product_list',  // 保障产品
          component: resolve => require(['../components/page/inside/Product_list.vue'], resolve)
        }, {
          path: '/add_prod',  // 添加保障产品
          component: resolve => require(['../components/page/inside/Add_prod.vue'], resolve)
        }, {
          path: '/product_detail',  // 路由详情
          component: resolve => require(['../components/page/inside/Product_detail.vue'], resolve)
        }, {
          path: '/product_history',  // 历史版本
          component: resolve => require(['../components/page/inside/Product_history.vue'], resolve)
        }, {
          path: '/add_router',  // 添加路由
          component: resolve => require(['../components/page/inside/Add_router.vue'], resolve)
        }, {
          path: '/check_policy',  // 保单核对
          component: resolve => require(['../components/page/inside/Check_policy.vue'], resolve)
        }, {
          path: '/output_data',  // 导出数据
          component: resolve => require(['../components/page/inside/Output_data.vue'], resolve)
        }, {
          path: '/output_jp_data',  // 导出金彭数据
          component: resolve => require(['../components/page/inside/Output_jp_data.vue'], resolve)
        }, {
          path: '/upload_codeKey',  // 上传兑换码
          component: resolve => require(['../components/page/inside/Upload_codeKey.vue'], resolve)
        }, {
          path: '/upload_vin',  // 上传车架号
          component: resolve => require(['../components/page/inside/Upload_vin.vue'], resolve)
        }, {
          path: '/product_manage', // 保障管理
          component: resolve => require(['../components/page/inside/Product_manage.vue'], resolve)
        },
        // 角色
        {
          path: '/role_list',
          component: resolve => require(['../components/page/inside/userManage/Role_list.vue'], resolve)
        },
        {
          path: '/role_detail',
          component: resolve => require(['../components/page/inside/userManage/Role_detail.vue'], resolve)
        },
        {
          path: '/add_role',
          component: resolve => require(['../components/page/inside/userManage/Add_role.vue'], resolve)
        },
        // 权限
        {
          path: '/right_list',
          component: resolve => require(['../components/page/inside/userManage/Right_list.vue'], resolve)
        },
        {
          path: '/add_right',
          component: resolve => require(['../components/page/inside/userManage/Add_right.vue'], resolve)
        },
        // 保险
        {
          path: '/insurance_company',
          component: resolve => require(['../components/page/inside/insuranceCon/Insurance_company.vue'], resolve)
        },
        {
          path: '/insurance_products',
          component: resolve => require(['../components/page/inside/insuranceCon/Insurance_products.vue'], resolve)
        },
        {
          path: '/add_insurance',
          component: resolve => require(['../components/page/inside/insuranceCon/Add_insurance.vue'], resolve)
        },
        {
          path: '/add_insurance_product',
          component: resolve => require(['../components/page/inside/insuranceCon/Add_insurance_product.vue'], resolve)
        },
        {
          path: '/insurance_history',
          component: resolve => require(['../components/page/inside/insuranceCon/Insurance_history.vue'], resolve)
        },
        // 赠险列表
        {
          path: '/gift_order',
          component: resolve => require(['../components/page/giftOrder/gift_order.vue'], resolve)
        },
        {
          path: '/gift_order_detail',
          component: resolve => require(['../components/page/giftOrder/gift_order_detail.vue'], resolve)
        },
        // 增加用户
        {
          path: '/add_user',
          component: resolve => require(['../components/page/Add_user.vue'], resolve)
        },
          // 修改密码
        {
          path: '/change_password',
          component: resolve => require(['../components/page/change_password.vue'], resolve)
        },
        // { // 菜单
        //   path: '/menu_list',
        //   component: resolve => require(['../components/page/inside/menu/Menu_list.vue'], resolve)
        // },
        { // 菜单
          path: '/menu_list',
          component: resolve => require(['../components/page/inside/menu/List.vue'], resolve)
        }, { // 导入订单
          path: '/importOrder',
          component: resolve => require(['../components/page/inside/import/importOrder.vue'], resolve)
        }, { // 导入保单
          path: '/importPolicy',
          component: resolve => require(['../components/page/inside/import/importPolicy.vue'], resolve)
        },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
  ]
})
