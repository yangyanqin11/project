import  axios from "axios";
import qs from "qs";
const baseUrl = '/api';
import store from '../store/index'
import { errorAlert } from "../utils/alert";
import router from "../router";
// 在这设置请求头信息，请求头信息的设置
// axios.interceptors.request.use(config=>{
//     console.log('本次的请求头信息为:'+config.url);
//     // 在这里判断是否是登录页面，不是登录页面的时候，访问其它的页面需要有一个令牌
//     if(config.url != baseUrl+'/login'){
//         // 设置响应头
//         config.headers.authorization = store.state.user.token;
//     }
//     return config;
// })
// 在这设置一个响应的拦截
axios.interceptors.response.use(res=>{
    console.group('本次响应路径为'+res.config.url);
    console.log(res);
    // 在这里的时候我们需要做一个判断，要是用户信息过期了，我们需要将其跳转到首页，让它再次进行登录
    if(res.data.code !== 200){
        // 在这里再次进行判断，要是出现403的话，则就跳转到登录页面，重新登录，要不是的话，则直接弹出错误提示
       if(res.data.code==403){
           router.push('/login')
       }
          errorAlert(res.data.msg);
          return;
    }
    return res
})

//添加菜单时候的请求
export const addMenu = (data)=>{
    //利用axios向后端发起请求，里面包括请求的方式，地址，如果需要参数则这个时候我们也应该传递相应的参数
    return axios({
       method:'post',
       url:baseUrl+'/api/menuadd',
      //将我们添加的信息进行传递
       data:qs.stringify(data)
    })
}

// 菜单列表的请求
export const getMenu = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/menulist',
        params
    })
}
// 获得一条数据的请求
export const oneMenu = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/menuinfo',
        params
    })
}
// 获得修改菜单的请求
export  const updateMenu = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/menuedit',
        data:qs.stringify(data)
    })
}
// 删除菜单
export const delMenu = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/menudelete',
        data:qs.stringify(data)
    })
}

// 添加角色管理的请求
export const addRole=(data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roleadd',
        data:qs.stringify(data)
    })
}

// 获取角色列表的请求
export const roleList = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/rolelist'
    })
}

// 获取修改信息
export const oneRole = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/roleinfo',
        params,
    })
}
//  修改角色
 export const updateRole = (data)=>{
     return axios({
         method:'post',
         url:baseUrl+'/api/roleedit',
         data:qs.stringify(data)
     })
 }
//  角色的删除
export const delRole = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roledelete',
        data:qs.stringify(data)
    })
}
// 添加管理员
export const addManager = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/useradd',
        data:qs.stringify(data)
    })
}
// 管理列表

export const managerList = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/userlist',
        params,
    })
}
// 管理员总数
export const managerCount = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/usercount'
    })
}
// 详情页信息获取
export const oneManager = (params)=>{
    return axios({
        methods:'get',
        url:baseUrl+'/api/userinfo',
        params,
    })
}
// 修改管理员信息
export const updateManager = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/useredit',
        data:qs.stringify(data)
    })
}
// 删除管理员信息
export const delManager = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/userdelete',
        data:qs.stringify(data),
    })
}

// 登录页面
export const login = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/userlogin',
        data:qs.stringify(data),
    })
}
// ---------------------------商品分类start----------------------
// 商品分类列表的请求
export const getCate = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/catelist',
        params,
    })
}

// 添加商品分类

export const addCate = (data)=>{
    var form  = new FormData();
    for(let i in data){
        form.append(i,data[i])
    };
    return axios({
        method:'post',
        url:baseUrl+'/api/cateadd',
        data:form
    })
}
// 获取详情信息
export const oneCate = (params)=>{
    return axios({
        method:'get',
        url:baseUrl +'/api/cateinfo',
        params,
    }
    )
}
// 更新数据
export const updateCate = (data)=>{
    var form  = new FormData();
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:'post',
        url:baseUrl+'/api/cateedit',
        data:form
    })
}
// 删除商品
export const delCate = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/catedelete',
        data:qs.stringify(data)
    })
}
// ---------------------商品规格start---------------------------
// 添加商品规格
export const addSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/specsadd',
        data:qs.stringify(data)
    })
}
// 商品规格列表
export const getSpec = (params)=>{
    return axios({
    method:'get',
    url:baseUrl+'/api/specslist',
    params
    })
}
// 计算总数
export const specCount = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/specscount'
    })
}
// 商品规则属性详情
export const oneSpec = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/specsinfo',
        params,
    })
}
// 更新数据
export const updateSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/specsedit',
        data:qs.stringify(data)
    })
}
// 删除商品规则
export const delSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/specsdelete',
        data:qs.stringify(data)
    })
}
// -------------------------------商品管理start--------------
export const addGoods = (data)=>{
    var form = new FormData();
    for(let i in data){
        form.append(i,data[i])
    };
    return axios({
        method:'post',
        url:baseUrl+'/api/goodsadd',
        data:form
    })
}
// 商品总数的获取
export const goodsCount = ()=>{
    return axios({
      method:'get',
      url:baseUrl+'/api/goodscount'
    })
}
// 商品列表
export const getGoods = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/goodslist',
        params,
    })
}
// 获取详情
export const oneGoods = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/goodsinfo',
        params
    })
}
// 更新数据
export const updateGoods = (data)=>{
    var form  = new FormData();
    for(let i in form){
        form.append(i,data[i])
    };
    return axios({
        method:'post',
        url:baseUrl+'/api/goodsedit',
        data:form
    })
}
// 删除商品
export const delGoods = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/goodsdelete',
        data:qs.stringify(data)
    })
}
// -------------------------------会员管理--------------------------
export const getMember = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/memberlist'
    })
}
// 请求数据
export const oneMember = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/memberinfo',
        params,
    })
}