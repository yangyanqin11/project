<template>
  <div class="wrap">
    <div class="login">
      <h2>登录</h2>
      <el-input
        placeholder="请输入用户名"
        type="text"
        v-model="user.username"
      ></el-input>
      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="user.password"
      ></el-input>
      <template>
        <el-button type="primary" @click="login">登录</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import { login} from "../../utils/request";
import { successAlert, warningAlert } from '../../utils/alert';
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
         ...mapActions({
          'requestUser':'userActions',
      }),
        login(){
            if(this.user.username != '' && this.user.password != ''){
                // 此时将给后端发起登录请求
                login(this.user).then(res=>{
                    // 成功后，后端给我们发来登录成功的消息
                    successAlert(res.data.msg);
                    // 在成功之后，我们将这个数据保存在vuex中，页面进行跳转
                    this.requestUser(res.data.list);
                    this.$router.push('/')
                })
            }
            // // 首先判断用户名和密码是否为空，只有不为空的时候，才可以允许用户跳转
            // if(this.user.name != '' && this.user.password != ''){
            // // 向后端发起请求，并且将这个数据进行保存
            // this.Login(this.user).then(res=>{
            //     // 成功后则向我们弹出登录成功的消息
            //     successAlert(res.data.msg);
            //     // 将这个数据保存在我们的本地localStorage里面，在本地存储的时候，我们应该注意方式，第一个是键值对中的键名，第二个是简直对中的值，在这里我们的名字是user,因为后台需要的数据是字符串的类型，在这里的时候，我们需要进行一个转换
            //     // 在这里还需要做一个判断，看用户名在我们的localStorage里面是否为空，要是为空的话，则需要将这个移除
            //     if(localStorage.getItem('user') == null){
            //         // 将为空的用户名移除
            //         localStorage.removeItem('user');
            //     }
            //     // 将登录的用户信息存入本地
            //     localStorage.setItem('user',JON.Stringify(res.data.list));
                
            //     this.$router.push('/');
            // })}
            else{
                // 要是输入的信息有空的，给用户做一个提醒
                warningAlert('请输入所需要的信息哦，亲')
            }
        }
  },
}
</script>

<style scoped>
.wrap {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#533545, #2f3d60);
}
.login {
  width: 400px;
  height: 300px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h2 {
  line-height: 60px;
  text-align: center;
}
.el-input,
.el-button {
  margin: 20px 30px 10px 30px;
  width: 80%;
}
.el-button {
  line-height: 20px;
}
</style>