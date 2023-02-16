<template>
  <div class="name">
    <van-nav-bar
      left-text="取消"
      right-text="确定"
      title="修改昵称"
      @click-left="left"
      @click-right='right'
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="20"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  props:{
    mess:{
      type:String,
      require:true
    }
  },
  created(){
    this.message = this.mess
  },
  methods:{
    left(){
      console.log('dddd');
      this.$emit('show',false)
    },
    right(){
      if(this.message == '')return;
      this.$emit('message',this.message);
      this.$emit('show',false);
    }
  }
};
</script>

<style lang="less" scoped>
.name {
  width: 100%;
  height: 100%;
  background: #ededed;
  /deep/ .van-nav-bar__content {
    background: #fff !important;
    .van-nav-bar__title {
      color:black!important;
    }

  }
}
</style>


