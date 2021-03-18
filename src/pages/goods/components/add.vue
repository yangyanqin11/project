<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="opened">
        <el-form :model="form">
           <el-form-item label="一级分类" :label-width="formLabelWidth">
            <el-select v-model="form.first_cateid" @change="changeCate(false)" >
              <el-option label="--请选择--" disabled value=""></el-option>
              <!-- 遍历一级分类列表 -->
              <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="二级分类" :label-width="formLabelWidth">
            <el-select v-model="form.second_cateid" >
              <el-option label="--请选择--" disabled value=""></el-option>
              <!-- 遍历二级分类列表 -->
              <el-option v-for="item in seconedCate" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.goodsname"></el-input>
          </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价格" :label-width="formLabelWidth">
            <el-input v-model="form.market_price"></el-input>
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth">
              <div class="img-box">
                <h3>+</h3>
                <img v-if="imageUrl" :src="imageUrl" alt="">
                <input type="file" @change="changeImg">
              </div>
          </el-form-item>
          <el-form-item label="商品规格" :label-width="formLabelWidth">
            <el-select v-model="form.specsid"  @change="changeSpec(false)">
              <el-option label="--请选择--" disabled value=""></el-option>
              <!-- 遍历商品规格列表 -->
              <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="规格属性" :label-width="formLabelWidth">
            <el-select v-model="form.specsattr" multiple>
              <el-option label="--请选择--" disabled value=""></el-option>
              <!-- 遍历规格属性列表 -->
              <el-option v-for="(item,index) in secondSpec" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否新品" :label-width="formLabelWidth">
            <template>
                <el-radio v-model="form.isnew" :label="1">是</el-radio>
                <el-radio v-model="form.isnew" :label="2">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="是否热卖" :label-width="formLabelWidth">
            <template>
                <el-radio v-model="form.ishot" :label="1">是</el-radio>
                <el-radio v-model="form.ishot" :label="2">否</el-radio>
            </template>
          </el-form-item>
           <el-form-item label="商品状态" :label-width="formLabelWidth">
              <el-switch
                  v-model="form.status"
                  active-color="blue"
                  inactive-color="grey" :active-value="1" :inactive-value="2">
                </el-switch>
           </el-form-item>
           <el-form-item label="描述" :label-width="formLabelWidth">
             <div id="box"></div>
           </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" v-if="info.isAdd"  @click="sure"> 确 定</el-button>
          <el-button type="primary" v-else @click="update">修 改</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import E from 'wangeditor'
import {mapGetters,mapActions} from 'vuex'
import { successAlert, warningAlert } from '../../../utils/alert';
import { addGoods,oneGoods} from "../../../utils/request";
export default {
  props:['info'],
  data(){
    return {
      imageUrl:'',//要显示在页面中的图片地址
      formLabelWidth:'120px',
      seconedCate:[],//获取二级分类列表
      secondSpec:[],//获取规格属性列表
      editor:'',//存放富文本内容
      form:
      {
        first_cateid:'',
        second_cateid:'',
        goodsname:'',
        price:'',
        market_price:'',
        img:'',
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      }
    }
  },
  computed:{
    ...mapGetters({
      "cateList":"cate/cateList",
      "specList":"spec/specList",
    })
  },
  methods:{
    ...mapActions({
      "requestCateList":"cate/cateListActions",
      "requestSpecList":"spec/specListActions",
      'requestGoodsList':'goods/goodsListActions',
      'requestCount':'goods/countActions'
    }),

    // 富文本这里需要在打开对话框结束之后进行回调
    opened(){
       this.editor = new E('#box')
       this.editor.create()
       this.editor.txt.html(this.form.description)
    },

    // 改变一级分类时获取二级分类
    changeCate(bool){
        if(!bool){
        this.form.second_cateid = '';
        }
      var index =  this.cateList.findIndex(item=>item.id==this.form.first_cateid)
      this.seconedCate = this.cateList[index].children
    },

    // 改变文件时,获取图片的地址和详细信息
    changeImg(e){
      var file = e.target.files[0];
      //文件大小处理
      if(file.size > 2*1024*1024){
        warningAlert('上传图片不能超过2M');
        return;
      }
      //文件的后缀处理
      var ext = ['.png','.jpg','.jpeg','.gif'];
      var extName = file.name.slice(file.name.lastIndexOf('.'));
      if(!ext.some(item=>item==extName)){
        warningAlert('上传图片格式不正确');
        return;
      }

      //将图片信息生成图片地址并显示
      this.imageUrl = URL.createObjectURL(file);
      //将图片信息存入this.form.img中
      this.form.img = file;
    },

    // 当我们改变商品规格的时候，随机通过下标可以获得到规格属性的菜单
    changeSpec(bool){
        if(!bool){
           this.form.specsattr= [];
        }
      var index = this.specList.findIndex(item=>item.id==this.form.specsid)
      this.secondSpec = this.specList[index].attrs
    },

    // 取消的一系列操作
    cancel(){
      this.info.show = false;
      this.form = {
        first_cateid:'',
        second_cateid:'',
        goodsname:'',
        price:'',
        market_price:'',
        img:'',
        description:'',
        specsid:'',
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      };
      this.imageUrl = '';
    },
    // 当点击确定时，一系列操作
    sure(){
        //我们先来打印一下，看看数据是否后台所期望的，要使有不合理的，则需要做处理，之后再发给后台
        // 将文本框中的内容进行处理；
        this.form.description = this.editor.txt.html();
        // 向后端发起请求
        addGoods(this.form).then(res=>{
            successAlert(res.data.msg);
            // 页面消失
            this.cancel();
            this.requestGoodsList();
            this.requestCount();
        })
    },
    // 获取详情
    getDetail(id){
        oneGoods({id}).then(res=>{
            this.form = res.data.list;
            this.form.id = id;
            //通过操作发现里面的图片，以及规格属性以及二级菜单并没有给我们进行显示，所以我们需要将获取到的数据做一个处理
            //图片的处理
            this.imageUrl = this.$preImg+this.form.img;

            //规格属性的处理
             this.form.specsattr = this.form.specsattr.split(',');
             this.changeSpec(true);

            // 二级分类的处理（展现在页面中的直接是个数字）；
            this.changeCate(true);
        })
    },
    //当点击修改的时候
    update(){
        // 向后端发起请求
        this.form.description = this.editor.txt.html();
        updateGoods(this.form).then(res=>{
            // 后台给我们修改成功的消息提示
            successAlert(res.data.msg);
            this.cancel();
            // 在此渲染页面
            this.requestGoodsList();
        })
    } 
  },
  mounted(){
    // 一级分类请求
    this.requestCateList()
    // 商品规格请求
    this.requestSpecList()
  }
}
</script>

<style scoped>
.img-box{
  width:150px;
  height: 150px;
  border:1px dashed blueviolet;
  position: relative;
}
.img-box h3{
  text-align: center;
  line-height: 150px;
  width:100%;
  height: 100%;
}
.img-box img{
  width:100%;
  height: 100%;
  position: absolute;
  left:0;
  top:0;
}
.img-box input{
  width: 100%;
  height: 100%;
  position: absolute;
  left:0;
  top:0;
  opacity: 0;
}

</style>
