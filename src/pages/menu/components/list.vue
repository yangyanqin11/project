<template>
  <el-table
    :data="tableData"
    style="width: 100%; margin-bottom: 20px;margin-top:10px"
    row-key="id" border :tree-props="{ children: 'children' }">
    <el-table-column prop="id" label="菜单编号">
    </el-table-column>
    <el-table-column prop="title" label="菜单名称">
    </el-table-column>
    <el-table-column prop="icon" label="菜单图标"> </el-table-column>
    <el-table-column prop="url" label="菜单地址"> </el-table-column>
    <el-table-column prop="status" label="状态">
      <!-- 在这里利用卡槽的作用域 -->
      <template v-slot="prop">
        <el-button type="primary" v-if="prop.row.status == 1">启用</el-button>
        <el-button type="danger" v-else>禁止</el-button>
      </template>
    </el-table-column>

    <el-table-column prop="status" label="操作">

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
import { warningAlert } from "../../../utils/alert";
import {delMenu} from '../../../utils/request'
import {mapActions,mapGetters } from "vuex";

export default {
  computed:{
      ...mapGetters({
          'tableData':'menu/menuList'
      })
  },
  methods:{
      ...mapActions({
          'requestMenuList':'menu/menuListActions'
      }),
      edit(id){
      // 传递自定义edit事件过去,将我们的这个数据传递到父级中，在父级中有显示或者隐藏add组件的属性
      this.$emit('edit',id)
    },
    del(id){
       this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发起删除菜单请求
          delMenu({id}).then((res)=>{
              warningAlert(res.data.msg)
              //让页面重新渲染
              this.requestMenuList()
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
    // 发起菜单列表请求
    this.requestMenuList();
  }
};
</script>
<style scoped>

.el-button{
  margin-top:10px;
}
</style>