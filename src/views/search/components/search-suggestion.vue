<template>
  <div>
    <van-cell
      :title="item?.name"
      icon="search"
      v-for="item in list"
      v-if="list.length !== 0"

    />
  </div>
</template>

<script>
import { suggesstion } from "@/api/search.js";
import { debounce } from "lodash";
export default {
  props: {
    text: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    init: debounce(async function () {
      const { data } = await suggesstion({ q: this.text });
      this.list = data.data.options;
    }, 500),

  },
  watch: {
    text: {
      handler(val) {
        console.log(333);

        this.init();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>





