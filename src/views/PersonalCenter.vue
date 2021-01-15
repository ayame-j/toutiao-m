<template>
  <div class="container">
    <router-view></router-view>
    <van-tabbar class="container-tabbar" v-model="active" router>
      <van-tabbar-item icon="home-o" replace to="/">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" replace to="/Questions">
        <i slot="icon" class="iconfont iconwenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" replace to="/Video">
        <i slot="icon" class="iconfont iconshipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" replace to="/Mine">
        <i slot="icon" class="iconfont iconwode"></i>
        <span class="text">{{$store.state.user ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'PersonalCenter',
  compoents: {},
  props: {},
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  .container-tabbar {
    i.iconfont {
      font-size: 30px;
    }
    span.text {
      font-size: 20px;
    }
  }
}</style
>>
