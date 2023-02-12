<template>
  <div class="content">
    <van-cell-group :border="false">
      <van-cell title="我的频道" class="video" :border="false">
        <div slot="right-icon">
          <van-button type="default" round size="mini" @click="edit">{{
            this.isShow ? "完成" : "编辑"
          }}</van-button>
        </div>
      </van-cell>
    </van-cell-group>
    <!-- //卡片部分 -->
    <van-grid :gutter="9">
      <van-grid-item
        v-for="(item, index) in commandChannel"
        :key="item.id"
        class="grid-item"
        @click="del(item, index)"
        :class="[index == currentIndex ? 'active' : '']"
      >
        <div slot="text" class="text">
          {{ item.name }}
          <div class="icon" v-if="isShow && item.id !== 0">
            <van-icon name="clear" />
          </div>
        </div>
      </van-grid-item>
    </van-grid>
    <van-cell-group :border="false">
      <van-cell title="推荐频道" class="video" :border="false"> </van-cell>
    </van-cell-group>
    <!-- //卡片部分 -->
    <van-grid :gutter="9">
      <van-grid-item
        v-for="(item, index) in lastChannel"
        :text="item.name"
        :key="item.id"
        @click="add(item, index)"
      />
    </van-grid>
  </div>
</template>

<script>
import { allVideo,add,delChannel } from "@/api/home.js";
import {mapState} from 'vuex';
import {setItem} from '@/utils/storage.js'
export default {
  props: {
    channelList: {
      type: Array,
      require: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      commandChannel: [],
      allChannel: [],
      isShow: false,
      currentIndex:0,
    };
  },
  computed: {
    ...mapState(['user']),
    lastChannel() {
      const result = this.allChannel.filter((item) => {
        var key = true;
        this.commandChannel.forEach((it) => {
          if (it.id === item.id) {
            key = false;
          }
        });
        return key;
      });

      return result;
    },
  },
  created() {
    console.log(this.channelList, this.active, "baimn");
    this.init();
  },
  methods: {
    change() {},
    //初始化数据
    async init() {
      try {
        const { data } = await allVideo();
        this.allChannel = data.data.channels;
        console.log(data.data, "999");
      } catch (err) {
        this.$toast("数据获取失败");
      }
      this.currentIndex = this.active;
      this.commandChannel = JSON.parse(JSON.stringify(this.channelList))
    },
    //添加
   async add(item) {
      this.commandChannel.push(item);
      this.$emit('list',this.commandChannel)
      //如果已登录，上传数据到线上
      if(this.user){
       const {data} = await add([{ id: item.id,seq: this.commandChannel.length}])
       console.log(data,'登录')
      }else {
        setItem('channel',this.commandChannel)
      }
    },
    //编辑
    edit() {
      this.isShow = !this.isShow;
    },
    //删除
   async del(val, i) {
      //判断是删除还是选中
      if (this.isShow) {
        if(i == 0)return;
        this.commandChannel.splice(i, 1);
        if(i == this.currentIndex){
           this.currentIndex = null;
        }
        if(this.currentIndex){
          this.currentIndex = this.currentIndex-1
        }
        this.$emit('current',this.currentIndex);
        this.$emit('list',this.commandChannel)

        //登录了，上传到线上 未登录
        if(this.user){
         const value = await delChannel(val.id)
         console.log(value,'value')
        }else{
          setItem('channel',this.commandChannel);
        }
      } else {
        console.log(i);
        this.currentIndex = i
        this.$emit('current',this.currentIndex)
        this.$emit('list',this.commandChannel)

      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin-top: 35px;
  .video {
    // .
    .van-button {
      padding: 0 10px;
      border: 1px solid rgb(248, 48, 64);
      color: rgb(248, 48, 64);
    }
  }
  /deep/ .van-grid-item__content {
    height: 40px;
    background: #f4f6f8;
    position: relative;
    .van-grid-item__text {
      font-size: 14px;
    }
    .text {
      font-size: 14px;
      color: #646566;
      .icon {
        .van-icon {
          position: absolute;
          color: #9c9999;
          top: -5px;
          right: -5px;
          z-index: 2;
        }
      }
    }
  }
  .active {
    /deep/ .van-grid-item__content {
      background: #f40 !important;
      .text {
        color: #fff;
      }
    }
  }
}
</style>

