<template>
  <div class="home">
    <van-nav-bar>
      <template #title>
        <van-button icon="search" @click="search" round class="btn" size="large"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <List :message="item" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { channel } from "@/api/home.js";
import List from "./components/list.vue";
export default {
  data() {
    return {
      active: 0,
      channelList: [],
    };
  },
  components: { List },
  methods: {
    //初始化
    async init() {
      const { data } = await channel();

      this.channelList = data.data.channels;
      console.log(this.channelList);
    },
    search() {},
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
@navColor: #0498ff;
.home {
  .van-nav-bar {
    height: 50px;
    background: @navColor!important;
    /deep/ .van-nav-bar__title {
      max-width: unset !important;
      .btn {
        width: 300px;
        height: 40px;
        background: rgba(255, 255, 255, 0.3);
        border: none;
        color: #fff;
        .van-icon {
          color: #fff;
        }
      }
    }
  }
  /deep/ .van-tabs__content--animated {
    position: fixed !important;
    overflow: auto;
    width: 100%;
    top: 96px;
    bottom: 50px;
  }
}
</style>
