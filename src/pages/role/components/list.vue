<template>
  <el-table
    :data="tableData"
    style="width: 100%; margin-bottom: 20px;margin-top:10px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="id" label="角色编号"> </el-table-column>
    <el-table-column prop="rolename" label="角色名称"> </el-table-column>

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
import {delRole} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
 import { warningAlert } from '../../../utils/alert';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      tableData: "role/roleList",
    }),
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/roleListActions",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id){
          this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发起删除菜单请求
          delRole({id}).then((res)=>{
              warningAlert(res.data.msg)
              //让页面重新渲染
              this.requestRoleList();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });  
    }
  },
  mounted() {
    this.requestRoleList();
  },
};
</script>

<style>
</style>