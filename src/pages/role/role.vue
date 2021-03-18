<template>
<div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
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
                title:'添加角色',
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
        this.info.title="添加角色",
        this.info.isAdd = true
        },
        edit(id){
        this.info.isShow = true;
        this.info.title = '角色编辑',
       this.info.isAdd = false,
       this.$refs.add.getDetail(id);
    }
    },
    
}
</script>
<style scoped>
.el-button{
    margin-top:10px;
}
</style>