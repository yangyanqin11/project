<template>
<div>
  <v-list @edit="edit" :info='info'></v-list>
  <v-edit :info='info' ref="edit"></v-edit>
</div>
 
</template>

<script>
import vEdit from "./components/edit";
import vList from "./components/list";
export default {
  data(){
    return {
      info:{
        show:false,
        isShow:true
      }
    }
  },
 components:{
   vList,
   vEdit
 },
 methods:{
   edit(uid){
     this.info.show = true;
     this.info.isShow = false;
     this.$refs.edit.getDetail(uid);

   }
 }
}
</script>

<style>

</style>