<template>
  <div class="comment">
    <van-cell>
      <div slot="title" class="title">
        <van-image
          width="50"
          height="50"
          :src="item.aut_photo"
          round
          fit="cover"
        />
      </div>
      <div slot="default">
        <div class="author">
          <div>{{ item.aut_name }}</div>
          <van-icon name="good-job-o" size="large" />
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="time">
          <div class="update">{{ item.pubdate }}</div>
          <!-- <van-button type="default" round size='mini'>{{item.reply_count}} 回复</van-button> -->
        </div>
      </div>
    </van-cell>
    <Comment
      v-if="item.com_id"
      :id="item.com_id"
      type="c"
      :datalist="datalist"
    ></Comment>
    <div class="replay">
      <van-button type="default" size="large" round @click="isshow">评论</van-button>
    </div>
    <van-overlay :show="show" z-index="3" position='bottom'>
       <Filed @dat='success' :id='item.com_id' @showover='show=$event'></Filed>
    </van-overlay>
  </div>
</template>

<script>
import { comment } from "@/api/detail.js";
import Comment from "./comment.vue";
import Filed from './field.vue'
export default {
  data() {
    return {
      // item: "",
      message: "",
      show: false,
      datalist: [],
      isflag: false,
    };
  },
  props:{
    item:{
      type:Object,
      require:true
    }
  },
  mounted() {
    // console.log(this.$b)
  },
  methods: {
    submit() {},
    success(res){
      this.show = false;
      this.datalist.unshift(res);
    },
    close() {
      this.show = false;
    },
    isshow(){
      this.show = true
    }
  },
  components: { Comment,Filed },
};
</script>

<style lang="less" scoped>
.comment {
  .van-cell {
    .van-cell__title {
      flex: unset;
      width: 66px;
    }
    .van-cell__value {
      text-align: left;
      .author {
        display: flex;
        justify-content: space-between;
      }
      .time {
        display: flex;
        .update {
          margin-right: 10px;
        }
        .van-button {
          background: #ededed;
          padding: 0 10px;
        }
      }
    }
  }
  .replay {
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    padding: 0 10px;
    .van-button {
      padding: 15px 30px;
    }
  }
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
}
</style>

