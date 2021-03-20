<template>
  <div>
      <el-dialog :title="info.title" :visible.sync="info.show">
        <el-form :model="form">

          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
            <!-- 图片 -->
          <el-form-item label="图片" :label-width="formLabelWidth">
              <div class="img-box">
                <h3>+</h3>
                <img v-if="imageUrl" :src="imageUrl">
                <input type="file" @change="changeImg">
              </div>
          </el-form-item>
          <el-form-item label="商品状态" :label-width="formLabelWidth">
              <el-switch
                  v-model="form.status"
                  active-color="blue"
                  inactive-color="grey" :active-value="1" :inactive-value="2">
                </el-switch>
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
import { addBanner ,oneBanner,updateBanner} from "../../../utils/request";
import { mapActions } from 'vuex';
import { successAlert, warningAlert } from '../../../utils/alert';
export default {
    props:['info'],
    data(){
        return {
            formLabelWidth:'120px',
            imageUrl:'',
            form:{
                img:'',
                title:'',
                status:1
            }
        }
    },
    methods:{
        cancel(){
            this.info.show = false;
            this.form ={
                img:'',
                title:'',
                status:1
            };
            this.imageUrl = ''
        },
        // 当图片改变的时候，获取图片信息
        changeImg(e){
            console.log(e);
            var file = e.target.files[0];
            // 处理图片的大小
            if(file.size> 2*1024*1024){
                warningAlert('文件大小不能超过2M');
                return;
            }
            // 处理图片的后缀
            var ext = ['.jpg','.jpeg','.png','.gif'];
            var extName = file.name.slice(file.name.lastIndexOf('.'));
            if(!ext.some(item=>item==extName)){
                warningAlert('文件格式不正确');
            }
            this.imageUrl = URL.createObjectURL(file);
            this.form.img = file;

        },
        sure(){
            // 此时我们向后端发起添加数据的请求
            addBanner(this.form).then(res=>{
                // 成功后给我们返回添加成功的消息提示
                successAlert(res.data.msg);
                this.cancel();
                //重新渲染页面
                this.requestBannerList();
            })
        },
        ...mapActions({
            'requestBannerList':'banner/bannerListActions'
        }),
        getDetail(id){
            // 向后端发起获取详情的请求
            oneBanner({id}).then(res=>{
                this.form=res.data.list;
                this.form.id= id;
                this.imageUrl = this.$preImg+this.form.img;
            })
        },
        update(){
            // 向后端发起请求，要是修改成功则后端向我们发来修改成功的消息提示
            updateBanner(this.form).then(res=>{
                successAlert(res.data.msg);
                this.cancel();
                this.requestBannerList();
            })

        }
    }

}
</script>

<style scoped>
.img-box{
    width: 200px;
    height: 200px;
    border:1px dashed pink;
    position: relative;
}
.img-box h3{
    text-align: center;
    line-height: 200px;
}
.img-box input{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0px;
    left: 0px;
    opacity: 0;
}
.img-box img{
    width:200px;
    height: 200px;
    position: absolute;
    left: 0px;
    top:0px;
}

</style>