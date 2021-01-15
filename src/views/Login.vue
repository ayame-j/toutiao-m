<template>
  <div>
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 10"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            round
            size="small"
            type="primary"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user';

export default {
  name: 'login',
  components: {},
  data() {
    return {
      user: {
        mobile: '',
        code: '',
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /1[3|5|7|8]\d{9}/, message: '手机号格式错误' },
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /\d{6}$/, message: '验证码格式错误' },
        ],
      },
      isCountDownShow: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onSubmit(values) {
      //   1、获取表单数据
      const user = this.user;
      //   2、表单验证
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      //   3、提交表单请求登录
      login(user)
        .then((res) => {
          console.log(res);
          this.$store.commit('setUser', res.data.data);
          this.$toast.success('登录成功');
          // 登录成功，跳转回原来页面
          this.$router.back();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            this.$toast.fail('手机号或验证码错误');
          } else {
            this.$toast.fail('登录失败');
          }
        });
      //   4、根据请求响应处理后续操作
    },
    onSendSms() {
      this.$refs.loginForm
        .validate('mobile')
        .then(() => {
          sendSms(this.user.mobile)
            .then(() => {
              this.$toast('发送成功');
            })
            .catch((err) => {
              if (err.response.status === 429) {
                this.$toast('发送太频繁了');
              } else {
                this.$toast('失败');
              }
            });
          console.log('验证成功');
        })
        .catch(() => {
          return console.log('验证失败');
        });
      this.isCountDownShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 37px;
}
</style>
