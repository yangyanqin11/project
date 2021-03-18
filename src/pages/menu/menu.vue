<template>
  <div>
    <!-- 添加按钮，当点击添加按钮的时候让我们的add页面显示出来 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加组件,需要事件的点击才可以显示 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表组件 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";

export default {
  data(){
    return {
      info:{
        isShow:false,
        title:'',
        isAdd:true
      }
    }
  },
  // 注册组件
  components:{
    vAdd,
    vList
  },
  methods:{
     add(){
     this.info.isShow = true;
     this.info.title='添加菜单',
     this.info.isAdd = true
     },
     edit(id){
       this.info.isShow = true;
       this.info.title='修改菜单',
       this.info.isAdd = false,
      // 在这里的时候我们获取到添加组件，添加组件的获取需要唯一的id标识
      this.$refs.add.getDetail(id);
     },
     
  }
}
</script>

<style scoped>
.el-button{
  margin-top:10px;
 
}

</style>