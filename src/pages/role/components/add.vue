<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">
    <!-- 提交的内容区域 -->

    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限" :label-width="formLabelWidth">
        <el-tree 
        :data="data" 
        show-checkbox node-key="id"
        :props="defaultProps"  
        :default-checked-keys="defaultKey" ref="tree">
        </el-tree>
      </el-form-item>

      <el-form-item :label-width="formLabelWidth">
        <el-switch v-model="form.status" active-color="blue" inactive-color="gray" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>
    </el-form>

    <!-- 确定、取消区域 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" v-if="info.isAdd" @click="sure">确 定</el-button>
      <el-button type="primary" v-else @click="update">修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import { successAlert } from '../../../utils/alert';
import { addRole,oneRole,updateRole } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
        form:{
            rolename:'',
            menus:'',
            status:1
        },
      formLabelWidth: "120px",
      defaultProps: {
          children: 'children',
          label: 'title'
        },
        defaultKey:[]//默认选中的key值
    };
  },
  computed:{
    ...mapGetters({
      "data":'menu/menuList',
    })
  },
  methods:{
    ...mapActions({
      'requestMenuList':'menu/menuListActions',
      'requestRoleList':'role/roleListActions'
    }),
    // 当点击取消按钮的时候，第一：这个页面消失；第二：里面的内容清空
    cancel(){
      this.info.isShow = false;
      this.form = {
            rolename:'',
            menus:'',
            status:1
      };
     //此时我们还需要将选中角色权限进行一个修改，首先获取，之后再针对里面的方法做操作
      this.defaultKey=this.$refs.tree.setCheckedKeys([])
    },

    // 当点击确定的时候，我们向后端发起请求，将我们添加的数据提交到后端，后端给我们返回添加成功的提示即可
    sure(){

      // 在我们发起请求之前我们先打印一下，数据，看看是不是符合后端的要求,要是不符合的时候，则需要进行转化
     this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
    //  向后端发起请求
    addRole(this.form).then(res=>{
      successAlert(res.data.msg);
      this.info.isShow = false;
      this.cancel();
      // 重新渲染页面
      this.requestRoleList();
    }) 
    },
    getDetail(id){
      // 发起后端的请求，将点击的这条数据显示在页面中
     
      oneRole({id}).then(res=>{
        this.form = res.data.list;
        this.form.id = id;
       this.defaultKey = JSON.parse(this.form.menus);
      })
    },
    update(){
      // 当点击修改的时候，我们向后端发起请求，将数据传到后端去，后端给我们传过来成功的消息提醒
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      updateRole(this.form).then(res=>{
        successAlert(res.data.msg);
        this.info.isShow = false;
        this.cancel();
        // 重新渲染页面
        this.requestRoleList();
      })
    }
  },
  // 当我们的页面挂载完完成时候，定义方法；请求菜单列表中的数据，显示在我们的添加页面中
  mounted(){
   this.requestMenuList();
  }
};
</script>

<style>
</style>