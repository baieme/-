<template>
  <div>
    <!-- 遮罩 -->
      <div class="wrapper" slot="default">
        <van-field
          v-model="message"
          rows="5"
          autosize
          label="评论:"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
          border
        />
        <div class="cross">
          <van-icon name="cross" size="large" class="btn" @click="close" />
          <van-button
            :disabled="message ? false : true"
            type="default"
            round
            size="small"
            @click="submit"
            >提交</van-button
          >
        </div>
      </div>
  </div>
</template>

<script>
import { getComment } from "@/api/detail.js";
export default {
  data() {
    return {
      message:"",
      show:false,
    };
  },
  props:{
    id:{
      type:String,
      require:true
    }
  },
  watch:{
    isShow(val){
      this.show = val
    }
  },
  mounted(){

  },
  methods: {
    close() {
      this.$emit('showover',false)
      // this.show = false;
    },
    async submit() {
      const { data } = await getComment({
        target: this.id,
        content: this.message,
      });
      console.log(data, "进行评论");
      this.$emit("dat", data.data.new_obj);
      this.message = "";
      this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .van-field {
    width: 280px;
    /deep/ .van-field__label {
      width: 40px;
    }
  }
  .cross {
    position: relative;
    flex-direction: column;
    height: 100%;
    .btn {
      position: absolute;
      right: 0;
      top: -50px;
    }
  }
}
</style>

