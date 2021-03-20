<template>
  <el-form ref="form" :model="form" label-width="100px" v-if="info.show" @edit="getDetail">
    <el-form-item font-size="20px"
      ><h3>{{ info.title }}</h3></el-form-item
    >
    <el-form-item label="手机号">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" type="password"> </el-input>
    </el-form-item>
    <el-form-item label="状态">
      <!-- 在这里要么状态是1,要么状态是2,是变化存在的，所以是变量 -->
      <el-switch
        active-color="blue"
        inactive-color="gray"
        v-model="form.status"
        :active-value="1"
        :inactive-value="2"
      ></el-switch>
    </el-form-item>

    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="update">修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapActions } from "vuex";
import { successAlert } from '../../../utils/alert';
import { oneMember,updateMember } from "../../../utils/request";
export default {
  props:['info'],
  data() {
    return {
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    getDetail(uid){
        oneMember({uid}).then(res=>{
            this.form = res.data.list;
            this.form.uid = uid;
        })
    },
    ...mapActions({
        'requestMemberList':'member/memberListActions'
    })
    ,

    // 当点击修改的时候
    update(){
        console.log(this.form);
    //  此时需要要后端发起请求，修改成功之后后端给我们返回修改成功的消息提示
      updateMember(this.form).then(res=>{
          successAlert(res.data.msg);
          this.cancel();
          this.requestMemberList();
      })
    },
    cancel(){
        this.info.show = false;
        this.info.isShow = true;
        this.form={
        nickname: "",
        phone: "",
        password: "",
        status: 1,
        }
    }
  }, 
};
</script>

<style>
</style>