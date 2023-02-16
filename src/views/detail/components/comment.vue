<template>
  <div>
    <div class='comment'>主要评论:</div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
     <van-cell v-for="item in datalist" >
         <comment-item :item='item' @over-show="$emit('over-like',item,datalist.length)"></comment-item>
     </van-cell>
    </van-list>
  </div>
</template>

<script>
// 8140
import CommentItem from "./comment-item.vue";
import { comment } from "@/api/detail.js";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  components: { CommentItem },
  props: {
    id: {
      type: String,
      require: true,
    },
    type:{
      type:String,
      require:true
    },
    datalist:{
      type:Array,
    }
  },
  data() {
    return {
      offset: null,
      limit: 10,
      list: [],
      loading: false,
      finished: false,
    };
  },
  mounted(){

  },
  beforeDestroy(){
    // this.$bus.$off('data')
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await comment({
        type: this.type,
        source: this.id,
        offset: this.offset,
        limit: this.limit,
      });
      console.log(data, "评论");
      this.offset = data.data.last_id;
      this.datalist.push(...data.data.results);
      // console.log(this.list,'数据发士大夫士大夫')
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (data.data.results.length == 0) {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
 .comment {
    padding-left: 10px;
    color:#808080;
  }
</style>
