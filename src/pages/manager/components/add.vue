<template>
  <el-form ref="form" :model="form" label-width="100px" v-if="info.isShow">
    <el-form-item  font-size="20px"><h3>{{info.title}}</h3></el-form-item>
    <el-form-item label="所属角色">
      <el-select v-model="form.roleid" placeholder="请选择所属角色" >
        <el-option label="--请选择--" value="" disabled></el-option>
        <el-option
          :label="item.rolename"
          :value="item.id"
          v-for="item in role"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="用户名" required-asterisk>
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.password"></el-input>
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
      <el-button type="primary" v-if="info.isAdd" @click="sure">确定</el-button>
      <el-button type="primary" v-else @click="update">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addManager, oneManager, updateManager } from "../../../utils/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert} from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      role: "role/roleList",
    }),
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/roleListActions",
      requestManagerList: "manager/managerListActions",
      requestManagerCount: "manager/managerCountActions",
    }),
    //当点击取消按钮的时候，则让页面消失，随之我们填写的内容恢复成原来的样子
    cancel() {
       this.info.isShow = false;
       this.info.show = true;
       this.form = {
          roleid: "",
          username: "",
          password: "",
          status: 1,
        };
    },
    // 当点击确定的时候，则向后端发送请求，之后将我们的数据提交给后端，后端给我们返回添加成功的消息即可
    sure() {
      //发送请求
       addManager(this.form).then((res) => {
        successAlert(res.data.msg);
        //重现获取数据渲染页面
        this.requestManagerCount();
        this.requestManagerList();
       
        this.info.show = true;
        this.info.isShow = false;
        this.cancel();
      });
    },

    getDetail(uid) {
      //向后端发起页面详情信息请求,将请求的数据展示在页面中,在这里我们需要注意的是：传递的参数名一定要是后端要求的参数名，否则就会给我们报错
      oneManager({ uid }).then((res) => {
        //将获取到的数据赋值给form即可
        this.form = res.data.list;
        //   将密码清空
        this.form.password = "";
      });
    },
    update() {
      //在提交之前先判断一下，提交的信息是否符合给我们的要求
      // 这个时候发起后端的请求，要是修改成功后，后端则给我们返回修改成功的提示消息
      updateManager(this.form).then(res=>{
          successAlert(res.data.msg);
          this.requestManagerList();
          this.requestManagerCount();
          this.info.isShow = false;
          this.info.show = true;
      })
    },

  },
  mounted() {
    this.requestRoleList();
  },
};
</script>

<style>
</style>