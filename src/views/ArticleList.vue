<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js';
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
    };
  },
  methods: {
    onLoad() {
      getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1,
      })
        .then((data) => {
          const res = data.data.data.results;
          this.list.push(...res);
          this.loading = false;
          if (res.length) {
            this.timestamp = data.data.data.pre_timestamp;
          } else {
            console.log(data.data.data.results.length);
            this.finished = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // onLoad() {
    //   console.log('onload');
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }
    //     // 加载状态结束
    //     this.loading = false;
    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
  },
};
</script>

<style></style>
