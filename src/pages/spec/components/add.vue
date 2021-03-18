<template>
  <el-form
    ref="form"
    :model="form"
    label-width="100px"
    v-if="info.isShow"
    margin-top="10px"
  >
    <el-form-item font-size="20px"
      ><h3>{{ info.title }}</h3></el-form-item
    >
    <el-form-item label="规格名称">
      <el-input v-model="form.specsname"></el-input>
    </el-form-item>
    <!-- 规格属性的一个遍历：新增规格属性只走一次，我们可以利用下标进行判断，要是下标为0的时候，则让走新增规格属性，其余的都走删除这块 -->
    <el-form-item
      label="规格属性"
      v-for="(item, index) in specArr"
      :key="index">
      <!-- 一共分成的是24分，占去19分 -->
      <el-col :span="19">
        <el-input v-model="item.value"></el-input>
      </el-col>

      <el-button type="primary" @click="addSpec" v-if="index === 0">新增规格属性</el-button>
      <el-button type="danger" v-else @click="delSpec(index)">删除</el-button>
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
import { mapActions, mapGetters } from 'vuex';
import { successAlert, warningAlert } from "../../../utils/alert";
import { addSpec,oneSpec,updateSpec } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      specArr: [{ value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  methods: {
    addSpec() {
      //当点击添加的时候，则向我们的数组里面添加；
      this.specArr.push({ value: "" });
    },
    delSpec(index) {
      this.specArr.splice(index, 1);
    },
    cancel() {
      this.info.isShow = false;
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
    //在这个里面的值恢复初始值
      this.info.show = true;
      this.specArr = [{value:""}];
    },
    sure() {
      // 首先我们这里判断一下：输入的规格属性值是否为空，要是为空的话，则发出提醒
      if (this.specArr.some((item) => {return item.value === "";})) {
        warningAlert("规则属性不能为空哦");
        return;
      }
      // 以上满足之后，我们将specArr进行处理，处理成后端所需要的形式
      this.form.attrs = this.specArr.map((item) => {return item.value;}).join(','),
      //向后端发起请求，添加成功之后，后端给我们返回添加成功的消息提醒；
      addSpec(this.form).then((res) => {
        successAlert(res.data.msg);
        this.requestSpecList();
        this.cancel();
      });
    },
    ...mapActions({
        'requestSpecList':'spec/specListActions'
    }),
    getDetail(id){
        // 在这里我们向后端去请求数据，将数据详情进行显示
        oneSpec({id}).then(res=>{
            // 在这里我们需要看一下后台的给我们反过来的数据
            this.form = res.data.list[0];
            this.form.id = id;
           //因为从后台传过来的是：字符串类型的规格属性，在这里我们需要将字符串类型的进行一个转 化，装成我们需要的数组类型的，之后再在页面中进行显示,
           var arr = this.form.attrs.split(',');
           this.specArr = [];
           for(let i in arr){
               this.specArr.push({value:arr[i]})
           }
        })
    },
    update(){
        if(this.specArr.some(item=>{return item.value ===''})){
            warningAlert('属性规格不能出现空值')
        }
        // 在我们的数组转化为字符串的方法中，里面写的分隔符是，将数组用分隔符进行分开
       this.form.attrs = this.specArr.map(item=>item.value).join(',');
       //向后端发送数据，要是成功之后，后端给我们返回修改成功的消息提示
        updateSpec(this.form).then(res=>{
        successAlert(res.data.msg);
        // 在弹出成功的消息之后，在重新渲染页面
        this.cancel();
        this.requestSpecList();
        })
    }
  },
};
</script>

<style>
</style>