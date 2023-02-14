<template>
  <div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
         <van-cell v-for="item in list" :key="item.art_id">
          <div slot='title'>
             <van-icon name="search" />
             <span v-html="highlight(item.title)"></span>
          </div>
         </van-cell>
        </van-list>
  </div>
</template>

<script>
import { result } from "@/api/search.js";
export default {
  props: {
    text: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      pageSize: 10,
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created(){
    console.log('created')
  },
  methods: {
    highlight(item){
      var reg = new RegExp(this.text,'ig');
      return item.replace(reg,`<span style='color:red'>${this.text}</span>`)
    },
   async onLoad() {
      // if(this.text.trim() =='')return;
       const { data } = await result({
          page: this.page,
          per_page: this.pageSize,
          q: this.text,
        });

        const arr = JSON.parse(JSON.stringify(data.data.results));
        console.log(arr,'dddd');
        //第一种方法
        var reg = new RegExp(this.text, 'gi')
        // const arr1 = arr.map(item=>{
        //  return {
        //   ...item,
        //   title:item.title.replace(reg,`<span style='color:red'>${this.text}</span>`)
        //  }
        // })
        this.list.push(...data.data.results);
        this.loading = false;

        if (data.data.results.length == 0) {
          this.finished = true;
        }else{
          this.page++;
        }
    },
  },
  watch: {
    text: {
      handler(val) {
        // const { data } = await result({
        //   page: this.page,
        //   per_page: this.pageSize,
        //   q: this.text,
        // });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
