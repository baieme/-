<template>
  <div class="tabbar">
    <van-tabbar @change='change'>
      <van-tabbar-item class="one">
        <div slot="icon">
          <van-button type="default" size='small' round @click='show'>写评论</van-button>
        </div>
      </van-tabbar-item>
      <van-tabbar-item icon="comment-o" :badge="length"></van-tabbar-item>
      <van-tabbar-item :icon="col?'star': 'star-o'" :class="col?'on':''" ></van-tabbar-item>
      <van-tabbar-item :icon="atti== -1 ? 'good-job-o':'good-job'"  :class="atti == -1 ? '' : 'current' "></van-tabbar-item>
      <van-tabbar-item icon="share"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {article,cancalArticle} from '@/api/detail.js'
export default {
  data() {
    return {

    };
  },
 props:{
   attitude:{
     type:Number,
     require:true,
   },
   collect:{
    type:Boolean,
    require:true,
   },
   id:{
    type:String,
    require:true,
   },
   top:{
    type:Number,
    require:true,
   },
   element:{
    type:[HTMLDivElement,String] ,
    require:true
   },
   length:{
    type:Number,
    require:true
   }
 },
 data(){
  return {
     col:'',
     atti:'',
  }
 },
 methods:{
    async change(index){
      console.log(this.id,'4444')
      switch(index){
        case 0:
          return;
        case 1:
          this.$emit('scroll')
          return;

        case 2:
          this.col= !this.col;
          if(this.col){
            this.$toast.success('收藏成功');
          }else{
            this.$toast('取消收藏');
          }
          return;
        case 3:
          if(this.atti == -1){
            this.atti = 1;
            this.$toast.success('点赞成功')
          }else {
            this.atti = -1;
            this.$toast('取消点赞')
          }
          return;
          //
      }
      console.log(index,'444');
     },
     show(){
        this.$emit('shw',true);
     }
 },
 created(){
  this.col = this.collect;
  this.atti = this.attitude;
  console.log(this.atti,this.attitude,'ddddd')
 },
 computed:{

 }
};
</script>

<style lang="less" scoped>
.tabbar {
  .one {
    flex-shrink: 0!important;
    width: 180px;
    flex:unset;
    .van-button {
      padding: 0 50px;
    }
  }
  .on {
    color:orangered
  }
  .current {
    color:pink
  }
}
</style>


