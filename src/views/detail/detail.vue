<template>
  <div class="detail">
    <van-cell-group :border="false">
      <van-cell class="detail-title" :border="false">
        <template #icon>
          <van-icon name="arrow-left" size=".7rem" @click="$router.back()" />
        </template>
        文章详情
      </van-cell>
    </van-cell-group>
    <van-cell-group class="author-content" :border="false">
      <van-cell :border="false">
        <div slot="title" class="title">{{ list.title }}</div>
      </van-cell>
      <van-cell :border="false">
        <div slot="title" class="author">
          <van-image
            width="50"
            height="50"
            round
            fit="cover"
            :src="list.aut_photo"
          />
          <div>
            <div>{{ list.art_id }}</div>
            <div class="time">{{ list.pubdate | formatTime }}</div>
          </div>
        </div>
        <div slot="right-icon">
          <van-button
            v-if="list.is_followed"
            type="info"
            round
            size="small"
            class="btn"
            @click="follow"
            >+关注</van-button
          >
          <van-button v-else round size="small" class="btn" @click="follow"
            >关注</van-button
          >
        </div>
      </van-cell>
      <!-- 文章的内容 -->
      <div class="markdown-body art" ref="article" v-html="list.content"></div>
      <div class="end" v-if="list.art_id" ref="end">
        ---------以上就是文章内容--------
      </div>

      <Comment :id="id" type="a" :datalist = 'datalist' @over-like='getover'></Comment>
    </van-cell-group>
    <Tabbar
      v-if="list.art_id"
      :attitude="list.attitude"
      :collect="list.is_collected"
      :id="list.art_id"
      :top="top"
      @shw='show = $event'
      :element="element"
      @scroll="scroll"
      :length='length'
    ></Tabbar>
    <!-- 遮罩 -->
    <van-overlay :show="show" z-index="3">
      <Filed @dat='success' :id='id' @showover='show=$event'></Filed>
    </van-overlay>

    <van-overlay :show="isflag"  position='bottom'>
      <div class="replay">
        <van-icon name="cross" size="large" class="btn " @click="closeone" />
        <!-- <div class="block" /> -->
        <reply-comment @show='getshow' :item='current'> </reply-comment>
      </div>
    </van-overlay>
    <!-- <van-overlay :show="show1" z-index='3'>
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
      </div> -->
    <!-- </van-overlay> -->
  </div>
</template>

<script>
import { getDetail, comment, getComment } from "@/api/detail.js";
import "@/style/markdown.css";
import { ImagePreview } from "vant";
import Tabbar from "./components/tabbar.vue";
import Comment from "./components/comment.vue";
import ReplyComment from "./components/reply-comment.vue";
import Filed from './components/field.vue'
import axios from "axios";
export default {
  name: "detail",
  props: {
    id: {
      type: String,
      require: true,
    },
  },
  components: { Tabbar, Comment, ReplyComment,Filed },
  data() {
    return {
      list: {},
      offset: null,
      limit: 10,
      show: false,
      message: "",
      isflag: false,
      top: 0,
      element: "",
      datalist:[],
      isReply:false,
      current:{},
      length:0,
    };
  },
  mounted() {
    // this.$bus.$on("isflag", (data) => {
    //   this.isflag = data;
    // });
  },
  methods: {
    success(res){
      this.show = false;
      this.length++;
      this.datalist.unshift(res)
    },
    getover(res){
      this.isflag = true
      this.current = res[0];
      this.length = res[1]
    },
    async init() {
      const { data } = await getDetail(this.id);
      this.list = data.data;
      //处理图片预览
      this.$nextTick(() => {
        var img = this.$refs.article.querySelectorAll("img");
        var imgList = [];
        img.forEach((item, index) => {
          imgList.push(item.src);
          item.onclick = function () {
            ImagePreview({
              images: imgList,
              startPosition: index,
              closeable: true,
            });
          };
        });
        console.log(this.$refs.end.offsetTop, "top");
        this.top = this.$refs.end.offsetTop;
        this.element = document.querySelector(".end");
      });

      //获得文章的评论

    },
    closeone(){
      this.isflag = false
    },
    getshow(){
      this.show = true;
    },
    scroll() {
      this.$nextTick(() => {
         document.documentElement.scrollTop = this.$refs.end.offsetTop
      });
    },
    follow() {
      if (this.list.is_followed) {
        // 取消关注
        this.list.is_followed = false;
      } else {
        // 点击关注
        this.list.is_followed = true;
      }
    },

  },
  created() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.detail {
  background: #fff;
  padding: 50px 0;
  .detail-title {
    background: #0498ff;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 3;
    .van-cell__value {
      text-align: center;
      color: #fff;
      font-size: 18px;
    }
  }
  .author-content {
    margin-top: 20px;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .author {
      display: flex;
      .van-image {
        margin-right: 5px;
      }
      .time {
        color: #808080;
        margin-top: 5px;
      }
    }
    .btn {
      .van-button__content {
        padding: 0 10px;
      }
    }
  }
  .art {
    padding: 0 16px;
  }
  .end {
    text-align: center;
    margin-top: 10px;
    color: #808080;
  }
  // .wrapper {
  //   position: fixed;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   background: #fff;
  //   display: flex;
  //   justify-content: space-around;
  //   align-items: center;
  //   .van-field {
  //     width: 280px;
  //     /deep/ .van-field__label {
  //       width: 40px;
  //     }
  //   }
  //   .cross {
  //     position: relative;
  //     flex-direction: column;
  //     height: 100%;
  //     .btn {
  //       position: absolute;
  //       right: 0;
  //       top: -50px;
  //     }
  //   }
  // }
  .replay {
    position: fixed;
    background: #fff;
    top: 100px;
    right: 0;
    left: 0;
    bottom: 0;
  }
}
</style>


