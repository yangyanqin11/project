<template>
  <div>
    <el-button type='primary' @click="add">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list :info ='info' @edit='edit'></v-list>
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
        show:true,
        title:'',
        isAdd:true
      }
    }
  },
  components:{
    vAdd,
    vList
  },
  methods:{
    add(){
      this.info.isShow = true;
      this.info.show = false;
      this.info.title = '添加管理员',
      this.info.isAdd = true
    },
    edit(uid){
      console.log(uid);
      this.info.isShow = true;
      this.info.show = false;
      this.info.title = '编辑管理员',
      this.info.isAdd = false;
      this.$refs.add.getDetail(uid);
    }
  }

}
</script>

<style scoped>
.el-button{
  margin-top:10px;
}

</style>