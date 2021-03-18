import { roleList} from "../../utils/request";
const state = {
    roleList:[]//初始化
}
const mutations = {
    changeRoleList(state,arr){
        state.roleList = arr
    }
}
const actions = {
    roleListActions(context){
        //这里发起请求
        roleList().then(res=>{
       context.commit('changeRoleList',res.data.list)
        })
    }
}
const getters = {
    roleList(state){
        return state.roleList;
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}