<template>
  <el-table
    :data="bannerList"
    style="width: 100%; margin-bottom: 20px;margin-top:10px"
    row-key="id"
    border>
    <el-table-column prop="id" label="编号"> </el-table-column>
    <el-table-column prop="title" label="轮播图标题"> </el-table-column>

    <el-table-column label="图片">
     <template v-slot="prop">
          <img :src="$preImg+prop.row.img" class="img">
        </template>
    </el-table-column>


    <el-table-column prop="status" label="状态">
      <!-- 在这里利用卡槽的作用域 -->
      <template v-slot="prop">
        <el-button type="primary" v-if="prop.row.status == 1">启用</el-button>
        <el-button type="danger" v-else>禁止</el-button>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <!-- 在这里利用卡槽的作用域 -->
      <!-- 当点击编辑的时候，弹出编辑的页面，编辑的页面和添加的页面是一样的，所以我们使用同一个页面即可，需要修改的有两处：一处是：将添加菜单修改为修改菜单；一处是：将确定修改为修改 -->
      <template v-slot="prop">
        <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {  delBanner} from "../../../utils/request";
import {successAlert  } from "../../../utils/alert";
import { mapActions, mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters({
            'bannerList':'banner/bannerList'
        })
    },
    methods:{
        ...mapActions({
            'requestBannerList':'banner/bannerListActions'
        }),
        // 点击编辑时
        edit(id){
            this.$emit('edit',id)
        },
        
        // 删除操作
        del(id){
        // 向用户发送确认删除的消息提示
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发起删除菜单请求
          delBanner({id}).then(res=>{
            // 删除成功的消息提示
            successAlert(res.data.msg);
            this.requestBannerList();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
           });          
         });
        }
    },
    mounted(){
        this.requestBannerList();
    }
}
</script>

<style scoped>
.img{
    width: 100px;
    height: 100px;
}
</style>