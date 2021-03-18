<template>
  <div v-if='info.show'>
   <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:10px;">
    <el-table-column
      prop="id"
      label="规格编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="specsname"
      label="规格名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="rolename"
      label="规格属性">
      <template v-slot="prop">
       <el-tag v-for='item in prop.row.attrs' :key='item'>{{item}}</el-tag>
      </template>
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
        <el-button @click="edit(scope.row.id)" type="primary" >编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 每页的条数应该和我们给后台发过去的size数进行对应,这样数据才可以按照正确的方式进行显示 -->
  <el-pagination  background layout="prev, pager, next" :total="count" style="margin-top:10px" :page-size='2' @current-change="changePage">
  </el-pagination>
  </div>
</template>

<script>
import { successAlert} from "../../../utils/alert";
import { mapActions, mapGetters } from 'vuex';
import {delSpec} from "../../../utils/request";
export default {
    props:['info'],
    computed:{
        ...mapGetters({
             // 在页面中进行显示的时候，我们发现我们的规格属性并没有显示，所以在这里我们需要处理
            'tableData':'spec/specList',
            //  获取总数
            'count':'spec/count'
        })
    },
  methods:{
      ...mapActions({
          'requestSpecList':'spec/specListActions',
          'requestCount':'spec/countActions',
          'requestPage':'spec/pageActions'
      }),
      changePage(page){
          //请求当前页面的数据，首先让页数进行改变，之后再渲染列表
          this.requestPage(page);
          this.requestSpecList();
      },
    //编辑操作，在这里的作用是：传递自定义方法
      edit(id){
          this.$emit('edit',id)
      },
      del(id){
        //向后端发送请求，要是删除数据成功，后端给我们返回删除成功的消息提示；
         // 向用户发送确认删除的消息提示
         delSpec({id}).then(res=>{
              successAlert(res.data.msg);
              this.requestSpecList();
              this.requestCount();
         })
      }
  },
  mounted(){
      this.requestSpecList();
      this.requestCount();
  }
}
</script>

<style>

</style>