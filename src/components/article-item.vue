<template>
  <div class="article">
    <van-cell-group :border="false" v-if="value.cover.type === 0">
      <van-cell :border="false">
        <div slot="title">{{ value.title }}</div>
        <div slot="label">
          <div class="bottom">
            <div class="top" v-if="value.is_top !== 0">
              {{ value.is_top | isTop }}
            </div>
            <div>{{ value.aut_name }}</div>
            <div>{{ value.comm_count }}条评论</div>
            <div>{{ value.pubdate | formatTime }}</div>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group :border="false" v-if="value.cover.type == 3">
      <van-cell :border="false">
        <div slot="title">{{ value.title }}</div>
        <div slot="label">
          <div class="content">
            <div v-for="item in value.cover.images">
              <van-image fit="cover" :src="item" />
            </div>
          </div>
          <div class="bottom">
            <div class="top" v-if="value.is_top !== 1">
              {{ value.is_top | isTop }}
            </div>
            <div>{{ value.aut_name }}</div>
            <div>{{ value.comm_count }}条评论</div>
            <div>{{ value.pubdate | formatTime }}</div>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group :border="false" v-if="value.cover.type == 1">
      <van-cell :border="false">
        <div slot="title">{{ value.title }}</div>
        <div slot="label">
          <div class="bottom">
            <div class="top" v-if="value.is_top !== 0">
              {{ value.is_top | isTop }}
            </div>
            <div>{{ value.aut_name }}</div>
            <div>{{ value.comm_count }}条评论</div>
            <div>{{ value.pubdate | formatTime }}</div>
          </div>
        </div>
        <div slot="default">
          <div class="content1">
            <div v-for="item in value.cover.images">
              <van-image fit="cover" :src="item" />
            </div>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    value: {
      type: Object,
      require: true,
    },
  },
  methods: {},
  filters: {
    isTop(value) {
      return value === 1 ? "置顶" : "";
    },
  },
};
</script>

<style lang="less" scoped>
.article {
  h3 {
    color: #5e5d5d;
  }
  .bottom {
    display: flex;
    margin-top:15px;
    .top {
      color: #f40;
    }
    div {
      margin-right: 10px;
    }
  }
  .content {
    display: flex;
    div {
      flex: 1;
      &:not(:last-child) {
        margin-right: 5px;
      }
      .van-image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .van-cell__value {
    flex: unset;
    .content1 {
      .van-image {
        width: 122px;
      }
    }
  }
}
</style>

