<template>
<div v-if='info.show'>
   <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:10px;">
    <el-table-column
      prop="id"
      label="用户编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="rolename"
      label="所属角色">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="状态"
      >
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <el-button type="danger" v-else>禁止</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row.uid)" type="primary" >编辑</el-button>
        <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 每页的条数应该和我们给后台发过去的size数进行对应 -->
  <el-pagination  background layout="prev, pager, next" :total="count" style="margin-top:10px" :page-size='2' @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>
import { delManager} from "../../../utils/request";
import { mapActions, mapGetters } from 'vuex';
import { successAlert } from '../../../utils/alert';
export default {
    props:['info'],
    computed:{
        ...mapGetters({
            'tableData':'manager/managerList',
            'count':'manager/managerCount'
        })
    },
    methods:{
        ...mapActions({
            'requestManagerList':'manager/managerListActions',
            "requestManagerCount":'manager/managerCountActions',
            'requestPage':'manager/pageActions'
        }),
        // 获取到当前的页数，现在我们需要做的操作是：当我们点击到第几页的时候，第几页的内容显示出来，我们请求当前的页数，将页数进行改变，在将页面随之渲染
        changePage(page){
            this.requestPage(page);
            this.requestManagerList(); 
        },
        // 修改数据
        edit(uid){
            this.$emit('edit',uid)
        },
        del(uid){
          // 向用户发送确认删除的消息提示
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发起删除菜单请求
          delManager({uid}).then(res=>{
            // 删除成功的消息提示
            successAlert(res.data.msg);
            this.requestManagerCount();
            this.requestManagerList();
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
        this.requestManagerList();
        this.requestManagerCount();
    }
}
</script>

<style>

</style>