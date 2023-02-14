<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel='$router.back()'
      clearable
      @blur='onBlur'
      @focus='onFocus'
    />
    <!-- 历史记录 -->
      <search-result  v-if='isShow' :text='value'></search-result>
     <!-- 结果 -->
      <search-suggestion v-else-if='value' :text='value'></search-suggestion>
      <!-- 搜索建议 -->
      <search-history v-else :history='history' @one='onSearch($event)' @all='del'></search-history>
  </div>
</template>

<script>
import {result,history} from '@/api/search.js'
import SearchSuggestion from './components/search-suggestion.vue';
import SearchHistory from './components/search-history.vue';
import SearchResult from './components/search-result.vue';
import {getItem,setItem} from '@/utils/storage.js';
import {mapState} from 'vuex'
export default {
  name: "search",
  data() {
    return {
      value: "",
      isShow:false,
      isFlag:false,
      resultText:'',
      pageSize:10,
      page:1,
      history: getItem('history')||[],
    };
  },
  components:{SearchSuggestion,SearchHistory,SearchResult},
  methods: {
   async onSearch(val) {
      this.value = val;
      var index = this.history.indexOf(val);
      if(index == -1){
        this.history.unshift(val);
      }else{
        this.history.splice(index,1);
        this.history.unshift(val)
      }


      console.log(this.resultText,'dddd');
      if(this.value.trim() == '')return;
      this.isShow = true
    },
    onCancel() {
      this.$toast('取消');
      console.log('444')
    },
    onFocus(){
      this.isShow = false;
    },
    onBlur(){
      if(this.value.trim() == '')return;
      this.isShow=true
    },
    del(val){
      this.history = val
    },
  },
  created(){
    // this.getHistory()
  },
  watch:{
    history(val){
       setItem('history',val);
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  padding-top:50px;
  .van-search {
    background: #0498ff;
    position:fixed;
    top:0px;
    right:0px;
    left:0px;
    .van-search__content {
      margin-right:10px;
    }
    .van-search__action {
      color:#fff
    }
  }
}
</style>
