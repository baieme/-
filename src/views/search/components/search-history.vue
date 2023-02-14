<template>
  <div class="history">
    <van-cell title="历史记录" class="history-title" v-if='history.length!==0'>
      <div @click="del" v-if="isShow">删除</div>
      <div v-else>
        <span class="del" @click='allDel'>全部删除</span>
        <span @click="del">完成</span>
      </div>
    </van-cell>
    <van-cell
      :title="item"
      icon="search"
      v-for="(item,index) in history"
      @click="toSearch(item,index)"
    >
      <template #right-icon>
        <van-icon name="close" class="search-icon" v-show="!isShow" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { setItem } from "@/utils/storage.js";
export default {
  props: {
    history: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isShow: true,
      list:[]
    };
  },
  created(){
  },
  methods: {
    toSearch(item,index) {
      if (this.isShow) {
        this.$emit("one", item);
      }else{
        this.history.splice(index,1);
      }
    },
    del() {
      this.isShow = !this.isShow;
    },
    allDel(){
      this.$emit('all',[]);
    }
  },
};
</script>

<style lang="less" scoped>
.history {
  padding-top: 45px;
  .history-title {
    position: fixed;
    top: 50px;
    right: 0;
    left: 0;
    .del {
      margin-right: 10px;
    }
  }
}
</style>

