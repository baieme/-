<template>
  <div class='gender'>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      :default-index='i'
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: ['女','男'],
      i:''
    };
  },
  props:{
    index:{
      type:Number,
      require:true
    }
  },
  created(){
    this.i = this.index;
  },
  methods: {
    onConfirm(value, index) {
        this.$emit('message',index)
        console.log(index,'index')
        this.$emit('show',false)
    },
    // onChange(picker, value, index) {
    //   this.$toast(`当前值：${value}, 当前索引：${index}`);
    // },
    onCancel() {
      this.$emit('show',false)
      // this.$toast("取消");
    },
  },
};
</script>

<style lang="less" scoped>
.gender {
  height:20%;
  background: #fff;
 /deep/ .van-picker__columns {
    // height:200px!important;
  }
}
</style>

