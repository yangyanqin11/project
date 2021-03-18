<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">
    <!-- 提交的内容区域 -->
    <el-form :model="form">
      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="上级菜单" :label-width="formLabelWidth">
        <el-select v-model="form.pid">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option label="顶级菜单" :value="0"></el-option>
          <!-- 菜单的遍历 -->
          <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="菜单类型" :label-width="formLabelWidth">
        <el-radio v-model="form.type" :label="1">目录</el-radio>
        <el-radio v-model="form.type" :label="2">菜单</el-radio>
      </el-form-item>
      <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type===1">
        <!-- 菜单图标的遍历 -->
        <el-select v-model="form.icon" >
        <el-option v-for="item in icons" :key="item" :label="item" :value="item" ></el-option>
        </el-select>
      </el-form-item>
      <!-- 菜单地址的遍历 -->
      <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
        <el-select v-model="form.url">
          <el-option  v-for="item in menuAddress" :key="item" :lable="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-switch v-model="form.status" active-color="blue" inactive-color="gray" :active-value='1' :inactive-value='2'>
         </el-switch>
      </el-form-item>
    </el-form>
    <!-- 确定、取消区域 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="sure"  v-if="info.isAdd">确 定</el-button>
       <el-button type="primary" @click="update" v-else>修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {  successAlert} from "../../../utils/alert";
import { addMenu,oneMenu,updateMenu } from "../../../utils/request";
import {  mapActions, mapGetters} from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      // 这些数据都应该按照接口来
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: "",
        url: '',
        status: 1,
      },
      formLabelWidth: "120px",
      // 菜单图标
      icons:['el-icon-s-help','el-icon-picture-outline','el-icon-s-claim','el-icon-bangzhu'],
      // 所有可选择的地址
      menuAddress:['menu',
          'home',
          'role',
          'manager',
          'cate',
          'spec',
          'goods',
          'member',
          'banner',
          'seckill']
    };
  },
 
  methods:{
    //点击确定的时候
    sure(){
      // 当点击添加的时候，发起添加菜单的一个请求
      addMenu(this.form).then(res=>{
        //当是成功的时候，则给我们返回成功的消息提示，数据提交给后台,
        successAlert(res.data.msg);
        // 页面随之消失，我们调用取消的方法即可
        this.cancel();
        // 并且将添加的数据渲染到页面上面
        this.resquestMenuList();
      })
    },
    // 当点击取消按钮时，让里面对应内容消失，添加组件随着消失；
    cancel(){
      this.info.isShow = false;
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: "",
        url: '',
        status: 1,
      }
    },
    ...mapActions({
      'resquestMenuList':"menu/menuListActions"
    }),

    // 获取详情，将获取到的信息显示在我们的修改列表中，方便我们操作
    getDetail(id){
      //发起请求，之后将详情显示在列表中
      oneMenu({id}).then(res=>{
        this.form = res.data.list;
        this.form.id = id;
      })
    },
    // 修改菜单
    update(){
      // 发起修改菜单的请求，将修改的结果提交给后端，后端给我们发来修改成功的消息提示；
      updateMenu(this.form).then(res=>{
         successAlert(res.data.msg);
         this.cancel();
         this.resquestMenuList();
      })
    }
  },
  computed:{
    ...mapGetters({
      'list':'menu/menuList'
    })
  },

  mounted(){
    //当组件加载完成时，获取菜单列表，将菜单列表中的数据渲染到页面中
    this.resquestMenuList();
  }
};
</script>

<style scoped>
</style>