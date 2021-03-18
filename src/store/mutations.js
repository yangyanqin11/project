export const state= {
   user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
};
export const mutations ={
    // 对存储的用户名进行操作，要是不为空的话，则将它进行存储，要是为空的话，则进行删除
    changeUser(state,user){
        state.user = user;
        if(user){
            // 将用户信息同时存入sessionStorage中
            sessionStorage.setItem('user',JSON.stringify(user))
        }else{
            sessionStorage.removeItem('user');
        }
    }

};
export const getters = {
    user(state){
        return state.user;
    }
};