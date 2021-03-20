<template>
  <el-dialog :title="info.title" :visible.sync="info.isShow">
    <el-form :model="form">
      <!-- 活动名称 -->
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <!-- 活动期限 -->
      <el-form-item label="活动期限" :label-width="formLabelWidth">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <!-- 一级分类 -->
      <el-form-item label="一级分类" :label-width="formLabelWidth">
        <el-select v-model="form.first_cateid" @change="changeCate">
          <el-option label="请选择" value="" disbaled></el-option>
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="item in cateList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 二级分类 -->
      <el-form-item label="二级分类" :label-width="formLabelWidth">
        <el-select v-model="form.second_cateid" @change="changeGoods">
          <el-option label="请选择" value="" disbaled></el-option>
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="item in secondCate"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品" :label-width="formLabelWidth">
        <el-select v-model="form.goodsid">
             <el-option label="请选择" value="" disbaled></el-option>
             <el-option
             :label="item.goodsname"
             :value="item.id"
             v-for="item in goods"
             :key="item.id">
             </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" :label-width="formLabelWidth">
        <!-- 在这里要么状态是1,要么状态是2,是变化存在的，所以是变量 -->
        <el-switch
          active-color="blue"
          inactive-color="gray"
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" v-if="info.isAdd"  @click="sure">确 定</el-button>
      <el-button type="primary" v-else @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from '../../../utils/alert';
import { addSeckill,oneSeckill,updateSeckill } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
         formLabelWidth:"80px",
         goods:[],
         secondCate: [], //存储二级分类
         form: {
          title: "",
          begintime:'',
          endtime:'',
          first_cateid: "",
          second_cateid: "",
          goodsid: "",
          status: 1,
      },
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2021, 2, 10, 10, 10), new Date(2021, 4, 11, 10, 10)],
        value2: ''
      };
  },
  computed: {
    ...mapGetters({
      "cateList": "cate/cateList",
      'goodsList':'goods/goodsList'
    }),
  },
  methods: {
    ...mapActions({
      "requestCateList": "cate/cateListActions",
      'requestGoodsList':'goods/goodsListActions'
    }),
    changeCate() {

      //在这里需要注意绑定的问题；Value里面提交的时候
      var i = this.cateList.findIndex((item)=>{return item.id==this.form.first_cateid});
      this.secondCate = this.cateList[i].children;

    },
    changeGoods(){
         this.goods= this.goodsList.filter(item=>item.second_cateid==this.form.second_cateid);
    },
    cancel(){
        this.info.isShow = false;
        this.form = {
          title: "",
          begintime:'',
          endtime:'',
          first_cateid: "",
          second_cateid: "",
          goodsid: "",
          status: 1,
        }
    },
    sure(){
       var date1 = new Date(this.value1[0])
        this.form.begintime =date1.getTime() ;
        var date2 = new Date(this.value1[1])
        this.form.endtime =date2.getTime() ;
        addSeckill(this.form).then(res=>{
            successAlert(res.data.msg);
            this.cancel();
            this.requestSeckillList();
        })
    },
    ...mapActions({
        'requestSeckillList':'seckill/seckillListActions'
    }),
    getDetail(id){
        oneSeckill({id}).then(res=>{
        this.form = res.data.list;
        this.form.id = id;
        })
    },
    update(){
      updateSeckill(this.form).then(res=>{
        successAlert(res.data.msg);
        this.cancel();
        this.requestSeckillList();
      })
    }
  },
  mounted() {
    this.requestCateList();
    this.requestGoodsList();
  },
};
</script>

<style>
</style>