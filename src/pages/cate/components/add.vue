<template>
  <el-form ref="form" :model="form" label-width="100px" v-if="info.isShow">
    <el-form-item font-size="20px"
      ><h3>{{ info.title }}</h3></el-form-item
    >
    <el-form-item label="上级分类">
      <el-select placeholder="请选择" v-model="form.pid">
        <el-option label="--请选择--" value="" disabled></el-option>
        <el-option label="顶级分类" :value="0"></el-option>
        <el-option
          :label="item.catename"
          :value="item.id"
          v-for="item in cateList"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="分类名称">
      <el-input v-model="form.catename"></el-input>
    </el-form-item>
    <!-- 第一种图片上传的方式，我们自己写布局，在布局里面，我们应该去注意input的定位，图片的大小在这里也需要设置 -->
    <el-form-item label="图片">
      <div class="imgbox">
        <h3>+</h3>
        <!-- 在这里是要显示的图片 -->
        <img :src="imageUrl"  v-if="imageUrl"  alt='暂无图片'>
        <!-- 我们在上传的时候，将图片上传到后端，从后端获取图片 -->
        <input type="file" @change="imgUrl" />
      </div>
    </el-form-item>

    <el-form-item label="状态">
      <!-- 在这里要么状态是1,要么状态是2,是变化存在的，所以是变量 -->
      <el-switch
        active-color="blue"
        inactive-color="gray"
        v-model="form.status"
        :active-value="1"
        :inactive-value="2"
      ></el-switch>
    </el-form-item>

    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" v-if="info.isAdd" @click="sure">确定</el-button>
      <el-button type="primary" v-else @click="update">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { addCate,oneCate,updateCate } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
    imageUrl:'',//要显示的图片地址
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/cateListActions",
    }),

    // 当改变图片时候的方法
    imgUrl(e) {
      // 首先我们打印一下这个事件源，看看事件源里面到底有一些什么
      // 处理图片的大小
      var file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件大小不能超过2M");
        return;
      }
      // 处理文件的后缀
      var ext = [".jpg", ".png", ".jpeg", ".gif"];
      var extName = file.name.slice(file.name.lastIndexOf("."));
      //  在我们利用数组中的some方法，都不满足的时候，则就弹出警告
      if (!ext.some((item) => item == extName)) {
        warningAlert("上传文件格式不正确");
        return;
      };
      //将图片显示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 点击取消按钮的时候，则让此页面消失，里面的内容也随之清空
    cancel(){
        this.info.isShow = false;
        this.info.show = true;
        this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
        },
        this.imageUrl ='';
    },
    sure(){
        // 此时我们需要向后端发起请求，要是添加成功的话，后端则给我们返回添加成功的消息提示；
         addCate(this.form).then(res=>{
             successAlert(res.data.msg);
            // 页面在一次进行渲染
            this.requestCateList();
            // 调用取消的方法
            this.cancel();
         });
    },
    // 获取详情信息
    getDetail(id){
        // 在这个时候向后端发起获取详情页面的请求，后端将详情页面的信息给我们返回，我们在页面中进行展示即可
        oneCate({id}).then(res=>{
            this.form = res.data.list;
            console.log(this.form);
            // 在这里需要传递一个id,可以根据指定的编号获取到一条对应的商品分类信息,
            this.form.id = id;
            this.imageUrl = this.$preImg+this.form.img
        })
    },

    // 更新信息
    update(){
        // 此时向后端发起修改的请求，修改成功后，后端给我们发来修改成功的消息提示即可
     updateCate(this.form).then(res=>{
         successAlert(res.data.msg);
        //  重新渲染页面
         this.requestCateList();
         this.cancel();
     })
    }
  },
  mounted() {
      this.requestCateList();
    },
};
</script>

<style scoped>
.imgbox {
  width: 200px;
  height: 200px;
  border: 1px dashed pink;
  position: relative;
}
.imgbox h3 {
  text-align: center;
  line-height: 200px;
  color: gray;
  font-size: 20px;
}
.imgbox input {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.imgbox img{
 width:100%;
  height: 100%;
  position: absolute;
  left:0;
  top:0; 
}
</style>