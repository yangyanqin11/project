import { getSpec,specCount } from "../../utils/request";

const state = {
    specList:[],
    size:2,
    page:1,//显示第一页码
    count:0
}
const mutations = {
    changeSpecList(state,arr){
      state.specList = arr;
    },
    changeCount(state,num){
        state.count = num;
    },
    changePage(state,page){
        state.page = page;
    }
}
const actions = {
    // 列表操作
    specListActions(context){
        var params = {
            size:context.state.size,
            page:context.state.page
        }
        getSpec(params).then(res=>{
            if((res.data.list.length == 0 ||res.data.list==null)&&context.state.page>1){
                var p = context.state.page - 1;
                context.commit('changePage',p);
                context.dispatch('specListActions');
                return;
            }
            context.commit('changeSpecList',res.data.list)
        })
    },
    //总数操作
    countActions(context){
        specCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
        })
    },
    // 页数操作
    pageActions(context,page){
        context.commit('changePage',page);
    }
}
const getters = {
    specList(state){
        return state.specList;
    },
    count(state){
        return state.count;
    }
}
export default {
    state,mutations,actions,getters,
    namespaced:true
}