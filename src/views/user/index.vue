<template>
  <div class="user">
    <van-nav-bar title="用户信息" left-arrow @click-left="$router.back()" />
    <van-cell is-link title="头像" center>
      <div>
        <van-image
          width="50"
          height="50"
          round
          fit="cover"
          :src="value.photo"
        />
      </div>
    </van-cell>
    <van-cell title="呢称" is-link :value="value.name" @click='change'/>
    <!-- <van-cell title="介绍" is-link :value="内容" /> -->
    <van-cell title="性别" is-link :value="value.gender?'男':'女'" @click='showgender = true'/>
    <van-cell title="生日" is-link :value='value.birthday'  @click='showbirthday = true'/>
    <van-popup v-model="show" position="bottom" class="pop">
      <Name v-if="show" :mess='value.name' @show='show = $event' @message = 'value.name = $event'></Name>
    </van-popup>
     <van-popup v-model="showgender" position="bottom">
      <Gender v-if='showgender' :index ='value.gender' @show='showgender = $event' @message = 'value.gender = $event'></Gender>
    </van-popup>
    <!-- 生日 -->
    <van-popup v-model="showbirthday" position="bottom">
      <Birthday v-if='showbirthday' :index ='value.birthday' @show='showbirthday = $event' @message = 'value.birthday = $event'></Birthday>
    </van-popup>
  </div>
</template>

<script>
import { message } from "@/api/profile.js";
import Name from './components/name.vue';
import Gender from './components/gender.vue';
import Birthday from './components/birthday.vue'
export default {
  name: "user",
  data() {
    return {
      value: "",
      show:false,
      showgender:false,
      showbirthday:false
    };
  },
  created() {
    this.init();
  },
  components:{Name,Gender,Birthday},
  filters:{
    format(){}
  },
  methods: {
    async init() {
      const { data } = await message();
      this.value = data.data;
      console.log(data, "用户的具体信息");
    },
    change(){
      this.show = true
    }
  },
};
</script>

<style lang="less" scoped>
.user {
  /deep/ .van-nav-bar__content {
    background: #0498ff;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  .title {
    align-items: center;
  }
  .pop {
     width:100%;
     height:100%
  }
}
</style>


