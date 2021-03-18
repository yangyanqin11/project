<template>
  <el-container>
    <el-aside width="200px">
      <!-- router是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>   
           <!--首页是每个用户都用的权利，所以在这里不做考虑  -->
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- 从这里开始遍历 -->
      <template v-for="item in user.menus">
        <!-- 遍历 -->
        <!-- 判断是否包含有children,如果有就是目录 -->
        <!-- 在这里需要注意的是：key需要添加在有意义的标签上面 -->
        <el-submenu :index="item.url"  :key="item.id" v-if="item.children">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group>
            <!-- 在内部遍历的时候，需要注意循环遍历的对象是item.children -->
            <el-menu-item :index="i.url" v-for="i in item.children" :key="i.title">{{i.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <el-menu-item :index="item.url" :key="item.id" v-else>
         {{item.title}}
         </el-menu-item>
      </template>
        
        <!-- 静态的写法 -->
        <!-- <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-shopping-bag-1"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/cate">商品分类</el-menu-item>
            <el-menu-item index="/spec">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/vip">会员管理</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <el-container>
        <!-- 头部 -->
      <el-header height="80px">
        <p>
          {{user.username}}
          &emsp;<i class="el-icon-setting" @click="logout"></i></p>
      </el-header>
      <!-- 主要内容区域 -->
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 二级路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
export default {
   computed:{
    ...mapGetters({
      'user':'user'
    })
   },
   methods:{
    ...mapActions({
      'requestUser':'userActions'
    }),
    logout(){
      // 清空我们的用户信息，
      this.requestUser(null);
      // 跳转页面
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.el-aside {
  height: 100vh;
  background: pink;
}
.el-header {
  background: #b3c0d1;
}
.el-header p {
  text-align: right;
  line-height: 80px;
}
</style>