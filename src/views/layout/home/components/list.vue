<template>
  <div class="list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"   success-text="刷新成功">
      <!-- <p>刷新次数: {{ count }}</p> -->

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.art_id" class="van">
          <article-item :value="item"></article-item>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { recommand } from "@/api/home.js";
import ArticleItem from "@/components/article-item.vue";
export default {
  name: "list",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  components: { ArticleItem },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      count: 0,
      timer: null,
      isLoading: false,
    };
  },
  created() {
    console.log(this.message, "ddd");
    this.init();
  },
  methods: {
    async onRefresh() {
      const { data } = await recommand({
        channel_id: this.message.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      this.timer = data.data.pre_timestamp;
      console.log(data.data);
      this.list.unshift(...data.data.results);
      //关闭下拉状态
      this.isLoading =false;
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      const { data } = await recommand({
        channel_id: this.message.id,
        timestamp: this.timer ? this.timer : Date.now(),
        with_top: 1,
      });
      this.timer = data.data.pre_timestamp;
      console.log(data.data);
      this.list.push(...data.data.results);
      console.log(data, "数据");
      //   // 加载状态结束
      this.loading = false;

      //   // 数据全部加载完成
      if ((data.data.length = 0)) {
        this.finished = true;
      }
      // }, 1000);
    },
    //页面的初始化
    init() {
      // const { data } = await recommand({
      //   channel_id: this.message.id,
      //   timestamp: this.timer ? this.timer : Date.now(),
      //   with_top: 1,
      // });
      // this.timer = data.data.pre_timestamp;
      // this.list = data.data.result;
      // console.log(data, "数据");
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  //   position: fixed;
  // top: 180px;
  // bottom: 100px;
  // right: 0;
  // left: 0;
  // overflow-y: auto;
  // margin-top:51px;
  // height: 79vh;
  // overflow-y: auto;
  margin-top: 96px;
  .van {
    padding: 0;
  }
}
</style>

