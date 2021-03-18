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
        member
    }
})
export default store;