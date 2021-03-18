import { getMenu} from "../../utils/request";
const  state = {
    menuList:[],//初始化数据
}
const mutations = {
    changeMenuList(state,arr){
        state.menuList = arr;
    }
}
const actions = {
    // 操作方法
    menuListActions(context){
        // 发起axios请求
        getMenu({istree:true}).then(res=>{
            context.commit('changeMenuList',res.data.list)
        }) 
    }
}
const getters={
    menuList(state){
        return state.menuList;
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}