<template>
<el-table
    :data="seckillList"
    style="width: 100%; margin-bottom: 20px;margin-top:10px"
    row-key="id"
    border>
    <el-table-column prop="title" label="活动名称"> </el-table-column>

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
import { successAlert } from "../../../utils/alert";
import { delSeckill } from "../../../utils/request";
import { mapActions, mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters({
            'seckillList':'seckill/seckillList'
        })
    },
    methods:{
        ...mapActions({
            'requestSeckillList':'seckill/seckillListActions'
        }),
        edit(id){
            this.$emit('edit',id);
        },
        del(id){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发起删除菜单请求
          delSeckill({id}).then(res=>{
            // 删除成功的消息提示
            successAlert(res.data.msg);
            this.requestSeckillList();
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
       this.requestSeckillList();
   }
}
</script>

<style>

</style>