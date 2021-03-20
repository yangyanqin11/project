import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import actions from "./actions";
import { state,mutations,getters } from "./mutations";
import menu from "./module/menu";
import role from "./module/role";
import manager from "./module/manager";
import cate from "./module/cate";
import spec from "./module/spec";
import goods from "./module/goods";
import member from "./module/member";
import banner from "./module/banner";
import seckill from "./module/seckill";


const  store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu,
        role,
        manager,
        cate,
        spec,
        goods,
        member,
        banner,
        seckill
    }
})
export default store;