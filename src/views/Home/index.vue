<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" size="small" round block>搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 导航栏切换 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name"
        >
        <AriticleList :id="item.id"></AriticleList>
        </van-tab
      >
      <span class="toutiao toutiao-gengduo"></span>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelslApi } from '@/api'
import AriticleList from './components/AriticleList'
export default {
  components: {
    AriticleList
  },
  data() {
    return {
      active: 0,
      channelList: []
    }
  },
  created() {
    this.getPannel()
  },
  // ??  ==> ||  相当于
  // ?. ==> 可选式操作符 ？. 判断前面是undifinded ,则不会往后执行
  methods: {
    async getPannel() {
      try {
        const { data } = await getChannelslApi()
        this.channelList = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          error.response.status = 507 && this.$toast.fail('刷新重试')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
