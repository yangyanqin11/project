<template>
<div>
    <el-table ref='table' v-if='info.isShow'
    :data="member"
    style="width: 100%; margin-bottom: 20px; margin-top: 10px"
    row-key="id"
    border>
    <el-table-column prop="id" label="用户编号"> </el-table-column>
    <el-table-column prop="nickname" label="昵称"> </el-table-column>
    <el-table-column label="手机号" prop="phone"></el-table-column>

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
        <el-button type="primary" @click="edit(prop.row.uid)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props:['info'],
    computed:{
        ...mapGetters({
            'member':'member/memberList'
        })
    },
    methods:{
        ...mapActions({
            'requestMemberList':'member/memberListActions'
        }),
        // 当点击编辑的时候将我们的uid进行传递
        edit(uid){    
            this.$emit('edit',uid);
        }
    },
    mounted(){
        this.requestMemberList();
    },
}
</script>

<style>

</style>