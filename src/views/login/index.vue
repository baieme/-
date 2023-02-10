<template>
  <div class="container">
    <van-nav-bar title="注册/登录" left-arrow />
    <van-form
      validate-first
      @submit="submit"
      :show-error="false"
      :show-error-message="false"
      @failed="fail"
      ref="form"
    >
      <van-field
        v-model="obj.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
        name="mobile"
        type="tel"
        :rules="[
          { required: true, message: '请填写手机号' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请填写正确手机号' },
        ]"
      />
      <van-field
        v-model="obj.code"
        type="digit"
        left-icon="comment-o"
        name="code"
        placeholder="请输入验证码"
        class="icons"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /\d{6}/, message: '请填写正确手机号' },
        ]"
      >
        <template #button>
          <van-count-down
            :time="6 * 1000"
            format="ss 秒"
            v-if="isShow"
            @finish="isShow = false"
          />
          <van-button
            size="small"
            round
            @click.prevent="submitMessage"
            v-else
            :loading="isLoading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="container-footer">
        <van-button type="info" block native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSubmit, getMessage } from "@/api/user.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      obj: {
        mobile: "",
        code: "",
      },
      isShow: false,
      isLoading: false,
    };
  },
  methods: {
    //进行登录验证
    async submit() {
      Toast.loading({
        message: "加载中……",
        forbidClick: true,
        duration: 0,
      });
      console.log("点击了按钮");
      try {
      const {data} =  await getSubmit(this.obj);
      //将登陆的token存储到vuex
      console.log(data.data,'data');
      this.$toast.success("登录成功");
      this.$router.push('/my')
      this.$store.commit('getUser',data.data);
      } catch (err) {
        this.$toast.fail("登录失败");
        console.log(err);
      }
    },
    //验证失败时，进行提示
    fail(e) {
      const error = e.errors[0];
      this.$toast({
        message: error.message,
        position: "top",
      });
      console.log(e, "asd");
    },
    //发送验证码
    async submitMessage() {
      //进行手机号码的验证
      // await this.$refs["form"].validate("phone").then((res) => {
      //   console.log(res, fdsfsdf);
      // });

      try {
        //进行手机号的验证
        const form = await this.$refs["form"].validate("mobile");
        console.log(form, "asdf");
        // 发送验证码
        await getMessage(this.obj.mobile).then((res) => {
          console.log(res);
          //显示loading
           this.isLoading = true;
          //开始进行倒计时
          this.isShow = true;
        });
      } catch (err) {
        console.log(err, "验证失败");
        let message;
        if (err && err.response && err.response.status == 429) {
          message = "一分钟只能发送一次验证码";
        } else if (err.name == "mobile") {
          message = err.message;
        } else {
          message = "错误";
        }
        this.$toast({
          message: message,
          position: "top",
        });
      }
      this.isLoading = false
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .container-footer {
    padding: 25px 16px;
    .van-button--info {
      background: #04a8ff;
      border: none;
    }
  }
  .icons {
    height: 58px;
    display: flex;
    align-items: center;
    .van-button--default {
      background: #ededed !important;
      width: 80px;
      height: 30px;
    }
  }
}
</style>

