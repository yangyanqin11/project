<template>
  <div>
      <el-button type='primary' @click="add" ref='btn'>添加</el-button>
      <v-add :info='info' ref="add"></v-add>
      <v-list :info='info' @edit='edit'></v-list>
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
                isAdd:true,
                show:true,
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
          this.info.title='添加商品分类';
          this.info.isAdd = true;
           this.info.show = false;
      },
      edit(id){
          this.info.isShow = true;
          this.info.title = '编辑商品分类';
          this.info.isAdd = false;
          this.info.show = false;
          this.$refs.add.getDetail(id);
      }
  }
}
</script>

<style scoped>
.el-button{
    margin-top:10px;
}
</style>