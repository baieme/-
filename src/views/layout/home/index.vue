<template>
  <div class="home">
    <van-nav-bar fixed>
      <template #title>
        <van-button icon="search" @click="search" round class="btn" size="large"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable class="tab-content">
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <List :message="item" />
      </van-tab>
      <!-- <van-tab>
        <div slot="title" class="nav1">
        </div>
      </van-tab> -->
      <div slot="nav-right" class="nav1"></div>
      <div slot="nav-right" class="nav">
        <van-icon name="wap-nav" size="30px" @click="go" />
      </div>
    </van-tabs>
    <van-popup
      v-model="show"
      close-icon-position="top-left"
      position="right"
      closeable
      :style="{ height: '100%', width: '100%' }"
      get-container="body"
    >
      <pop-item
        :channel-list="channelList"
        :active="active"
        @current="getcurrent"
        @list='list'
      ></pop-item>
    </van-popup>
  </div>
</template>

<script>
import { channel } from "@/api/home.js";
import List from "./components/list.vue";
import PopItem from "./components/pop-item.vue";
import { getItem } from "@/utils/storage.js";
export default {
  data() {
    return {
      active: 0,
      channelList: [],
      show: false,
    };
  },
  components: { List, PopItem },
  methods: {
    //初始化
    async init() {
      const channels = getItem("channel");
      if (channels) {
        this.channelList = channels;
      } else {
        const { data } = await channel();
        this.channelList = data.data.channels;
      }

      console.log(this.channelList);
    },
    search() {},
    go() {
      this.show = true;
    },
    getcurrent(val) {
      console.log(val);
      if (val) {
        this.active = val;
      } else {
        this.active = 0;
      }
    },
    list(val){
      this.channelList = val
    }
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
@navColor: #0498ff;
.home {
  // padding-top:96px;
  padding-bottom: 50px;
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
  /deep/ .tab-content {
    .van-tabs__wrap {
      position: fixed;
      top: 51px;
      z-index: 1;
      left: 0;
      right: 0;
      bottom: 82px;
      .nav {
        position: fixed;
        top: 50px;
        right: 0;
        width: 40px;
        height: 44px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-left: 1px solid #d3d0d0;
        opacity: 0.7;
        /deep/ .van-icon {
          font-size: 32px !important;
        }
      }
      .nav1 {
        width: 40px;
        flex-shrink: 0;
      }
    }
  }
}
</style>
