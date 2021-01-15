<template>
  <div class="mycontainer">
    <div v-if="user" class="header userinfo">
      <div class="baseinfo">
        <div class="left">
          <van-image
            class="avatar"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            round
            fit="cover"
          />
          <span class="name">黑马头条号</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="datastats">
        <div class="data-item">
          <div class="conunt">10</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="conunt">10</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="conunt">10</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="conunt">10</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/Login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <van-grid :column-num="2" class="gridnav" clickable>
      <van-grid-item class="griditem">
        <i slot="icon" class="iconfont iconshoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="griditem"
        ><i slot="icon" class="iconfont iconlishi"></i>
        <span slot="text" class="text">历史</span></van-grid-item
      >
    </van-grid>
    <van-cell title="消息通知" is-link></van-cell>
    <van-cell class="mb-9" title="小智同学" is-link></van-cell>
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      clickable
      @click="onLogout"
    ></van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUserInfo } from '@/api/user.js';
export default {
  name: 'Mine',
  components: {},
  props: {},
  created() {
    if (this.user) {
      this.loadUserInfo();
    }
  },
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {};
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: '退出登录',
          message: '确认退出吗',
        })
        .then(() => {
          this.$store.commit('setUser', null);
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    loadUserInfo() {
      getUserInfo()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.mycontainer {
  .header {
    height: 360px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      justify-items: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .userinfo {
    .baseinfo {
      height: 230px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          height: 132px;
          width: 132px;
          margin-right: 23px;
          border: 1px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .datastats {
      height: 130px;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .gridnav {
    .griditem {
      height: 141px;
      i.iconfont {
        font-size: 45px;
      }
      .iconshoucang {
        color: #eb5253;
      }
      .iconlishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .van-cell {
    font-size: 28px;
  }
  .logout-cell {
    color: red;
    text-align: center;
    font-size: 28px;
  }
}</style
>>
