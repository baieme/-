<template>
  <div class="header">
    <van-cell-group v-if="!user" class="no-login">
      <div @click='goLogin'>
        <img src="./mobile.png" alt="" class="logo" />
        <div>登录/注册</div>
      </div>
    </van-cell-group>
    <van-cell-group :border="false" v-else class="login">
      <van-cell center :border="false">
        <div slot="icon">
          <van-image
            round
            slot="title"
            :src="userList.photo"
          />
        </div>

        <!-- <div >123123</div> -->
        <div slot="title">{{userList.name}}</div>
        <van-button type="default" round size="small" @click="$router.push('/user/pro')">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info" center>
        <van-grid-item text="头条">
          <div slot="icon">{{userList.art_count}}</div>
        </van-grid-item>
        <van-grid-item text="关注">
          <div slot="icon">{{userList.follow_count}}</div>
        </van-grid-item>
        <van-grid-item text="粉丝">
          <div slot="icon">{{userList.fans_count}}</div>
        </van-grid-item>
        <van-grid-item text="获赞">
          <div slot="icon">{{userList.like_count}}</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <van-grid :column-num="2" class="nav">
      <van-grid-item icon="star-o" text="收藏" class="nav-item" />
      <van-grid-item icon="like-o" text="历史" class="nav-item" />
    </van-grid>
    <van-cell title="消息通知" is-link class="message" />
    <van-cell title="小爱同学" is-link />
    <van-cell title="退出登录" class="out" @click="out" v-if="user" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import {getImformation} from '@/api/user.js'
export default {
  data() {
    return {
      userList:{}
    };
  },
  methods: {
    out() {
      //第一步显示提示是否退出
      this.$dialog
        .confirm({
          message: "是否确定退出",
        })
        .then(() => {
          //退出登录 清除toke
          this.$store.commit("getUser", null);
        }).catch(() => {});
    },
    //前往登录页面
    goLogin(){
      this.$router.push('/login')
    },
    //初始化页面
   async init(){
     const {data} = await getImformation();
     this.userList = data.data;
     console.log(data,'data')
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  created(){
    this.init();
  }
};
</script>

<style lang="less" scoped>
.header {
  .login {
    background: url("./banner.png");
    .van-cell {
      background: unset;
      height: 116px;
      padding-top: 30px;
      padding-bottom: 15px;
      box-sizing: border-box;
      .van-cell__title {
        color: #fff;
      }
      .van-button {
        height: 16px;
        color: #808080;
      }
      .van-image {
        margin-right: 15px;
        border: 1px solid #fff;
        width: 66px;
        height: 66px;
      }
    }
    .data-info {
      .van-grid-item {
        height: 65px;
        box-sizing: border-box;
        /deep/ .van-grid-item__content {
          background: unset;
          color: #fff;
          .van-grid-item__icon-wrapper {
            font-size: 18px;
          }
          .van-grid-item__text {
            font-size: 11px;
            color: #fff;
          }
        }
      }
    }
  }
  .no-login {
    height: 180px !important;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
    img {
      width: 88px;
    }
  }
  .nav {
    margin-bottom: 10px;
    .nav-item {
      height: 70px;
      /deep/ .van-icon {
        font-size: 22px;
      }
      /deep/ .van-icon-star-o {
        color: #eb5253;
      }
      /deep/ .van-icon-like-o {
        color: #ff9d1d;
      }
    }
  }
  .out {
    margin-top: 10px;
    .van-cell__title {
      text-align: center;
      color: #d86262;
    }
  }
}
</style>
