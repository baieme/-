<template>
  <div class="comment">
    <van-cell >
      <div slot="title" class="title">
        <van-image
          width="50"
          height="50"
          :src='item.aut_photo'
          round
          fit='cover'
        />
      </div>
      <div slot='default'>
        <div class="author">
             <div>{{item.aut_name}}</div>
             <van-icon name="good-job-o" size='large'/>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="time">
            <div class="update">{{item.pubdate}}</div>
            <van-button type="default" round size='mini' @click='replay'>{{item.reply_count}} 回复</van-button>
          </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
      require: true,
    },

  },
  methods:{
    replay(){
       this.$emit('over-show',true)
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  .van-cell {
   padding: 0;
  .van-cell__title {
    flex:unset;
    width:66px;
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
        margin-right:10px;
      }
      .van-button {
        background: #ededed;
        padding: 0 10px;
      }
    }
  }
  }

}
</style>

