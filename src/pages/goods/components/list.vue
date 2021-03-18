<template>
  <div>
   <el-table
    :data="goodsData"
    border
    style="width: 100%;margin-top:10px;">
    <el-table-column
      prop="id"
      label="商品编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="goodsname"
      label="商品名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格"
      width="180">
    </el-table-column>
    <el-table-column
      prop="market_price"
      label="市场价格"
      width="180">
    </el-table-column>

    <el-table-column
      label="图片">
        <template v-slot="prop">
          <img :src="$preImg+prop.row.img" alt="" class="img">
        </template>
    </el-table-column>

       <el-table-column
      fixed="right"
      label="是否新品">
      <template v-slot="scope">
        <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
        <el-button type="danger" v-else>否</el-button>
      </template>
    </el-table-column>
       <el-table-column
      fixed="right"
      label="状态" >
      <template v-slot="scope">
        <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
        <el-button type="danger" v-else>否</el-button>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="状态">
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
import {successAlert} from '../../../utils/alert'
import { delGoods } from "../../../utils/request";
import { mapActions, mapGetters } from 'vuex';
export default {

    computed:{
        ...mapGetters({
            'goodsData':'goods/goodsList',
            'count':'goods/count'
        })
    },
    methods:{
        ...mapActions({
            'requestGoodsList':'goods/goodsListActions',
            'requestCount':'goods/countActions',
            'requestPage':'goods/pageActions'
        }),
        changePage(page){
            this.requestPage(page);
            this.requestGoodsList();
        },
        edit(id){
            this.$emit('edit',id);
        },
        del(id){
         // 向用户发送确认删除的消息提示
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发起删除菜单请求
          delGoods({id}).then(res=>{
            // 删除成功的消息提示
            successAlert(res.data.msg);
            this.requestCount();
            this.requestGoodsList();
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
     this.requestGoodsList();
     this.requestCount();
    }
}
</script>

<style scoped>
.img{
    width:100px;
    height: 100px;
}
</style>