<template>
  <div class="aritical">
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageAritical">
      <van-list
        @load="getNextPageAritical"
        v-model="loading"
        offset="100"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了~~"
        :immediate-check="false"
      >
        <AriticleItem
          v-for="item in resultTimes"
          :key="item.art_id"
          :aritical="item"
        ></AriticleItem> </van-list
    ></van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import AriticleItem from './AriticleItem.vue'
export default {
  name: 'AriticleList',
  components: {
    AriticleItem
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      resultTimes: [],
      preTimeStamp: '',
      // 下拉是false才行，true则禁止
      loading: false,
      finished: false,
      error: false,
      // 下拉刷新
      refreshLoading: false
    }
  },
  created() {
    this.firstPagegetArticles()
  },
  methods: {
    async firstPagegetArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.resultTimes = data.data.results
        console.log(this.resultTimes)
        console.log(data.data)
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageAritical() {
      try {
        const { data } = await getArticles(this.id, this.preTimeStamp)
        // 判断是否有pre_timestamp finished 事true的时候下次请求不会触发
        if (!data.data.pre_timestamp) this.finished = true
        // 添加请求回来的数组
        // 如果是下滑加就将数据放在最后
        // 如果是下拉刷新将数据放在最前
        // 2.添加到%rticles
        this.loading
          ? this.resultTimes.push(...data.data.results)
          : this.resultTimes.unshift(...data.data.results)

        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.aritical {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: blue;
    border-radius: 10px;
  }
}
</style>
