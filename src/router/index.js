import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import login from "../pages/login/login";
import index from "../pages/index/index";
import home from "../pages/home/home";
import menu from "../pages/menu/menu";
import role from "../pages/role/role";
import manager from "../pages/manager/manager";
import cate from "../pages/cate/cate";
import spec from "../pages/spec/spec";
import goods from "../pages/goods/goods";
const member = ()=>import('../pages/member/member');



export default new Router({
  routes: [
    {
      path:'/login',
      alias:'/l',
      component:login
    },
    {
      path:'/',
      component:index,
      children:[
        {
         path:'home',
         component:home
        },
        {
         path:'/menu',
         name:'菜单',
         component:menu
        },
        {
          path:'/role',
          name:'角色',
          component:role
         },
         {
          path:'/manager',
          name:'管理员',
          component:manager
         },
         {
          path:'/cate',
          name:'商品分类',
          component:cate
         },
         {
          path:'/spec',
          name:'商品规格',
          component:spec
         },
         {
           path:'/goods',
           name:'商品管理',
           component:goods
         },
         {
          path:'/member',
          name:'会员管理',
          component:member
        },,
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})
