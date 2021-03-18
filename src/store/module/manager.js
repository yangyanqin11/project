import { managerList,managerCount } from "../../utils/request";

const state = {
    managerList:[],//初始化
    page:1,
    size:2,
    managerCount:0
}

const mutations = {
    // 管理员列表数据操作
    changeManagerList(state,arr){
        state.managerList = arr
    },
    // 操作管理员总数数据操作
    changeManagerCount(state,num){
        state.managerCount = num
    },
    // 总页数的改变
    changePage(state,num){
    state.page = num
    }
}
const actions = {
    // 管理员列表的方法
    managerListActions(context){
        var size = context.state.size;
        var page = context.state.page;
        var parmas = {
            size,
            page
        }
        // 发起请求
        managerList(parmas).then(res=>{
            // 在这里需要进行判断，要是数据为空，则我们的页数需要减去1，要是不为空则正常显示
            if((res.data.list == null || res.data.list.length == 0) && context.state.page>1){
             var p =  context.state.page - 1;
            // 调用修改页数的方法之后，我们在自己调用一次自己，将页面信息，重新进行渲染；
              context.commit('changePage',p);
              context.dispatch('managerListActions');
              return;
            }
            context.commit('changeManagerList',res.data.list)
        })
    },
    // 管理员总数的方法
    managerCountActions(context){
        // 发起请求
        managerCount().then(res=>{
            context.commit('changeManagerCount',res.data.list[0].total)
        })
    },
    // 页数修改方法
    pageActions(state,page){
     state.commit('changePage',page)
    }

}
const getters = {
    // 返回管理员列表数据
    managerList(state){
        return state.managerList;
    },
    // 返回管理员总数数据
    managerCount(state){
        return state.managerCount;
    },
    //返回修改的页数
    page(state){
        return state.page;
    } 
}
export default{
    state,mutations,actions,getters,
    namespaced:true
}
