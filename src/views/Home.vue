<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs
      class="channle-tabs"
      slot="nav-left"
      scrollspy
      v-model="active"
      animated
      swipeable
    >
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
        ><article-list :channel="channel"></article-list
      ></van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user';
import ArticleList from '@/views/ArticleList';
export default {
  name: 'Home',
  components: { ArticleList },
  props: {},
  created() {
    this.loadChannels();
  },
  data() {
    return { active: 0, channels: [] };
  },
  methods: {
    loadChannels() {
      getUserChannels()
        .then((data) => {
          this.channels = data.data.data.channels;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 35px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.channle-tabs {
    .van-tabs__wrap {
      height: 82px;
    }
    .van-tab {
      width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
      line-height: normal;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 80px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.9;
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
