<template>
  <div class="results">
    <van-list
      v-model="loading"
      @load="getResult"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重试"
    >
      <van-cell
        v-for="item in resultsList"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({ path: '/detail', query: { articleId: item.art_id } })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api'
export default {
  data() {
    return {
      loading: false,
      page: 1,
      pre_page: 15,
      resultsList: [],
      finished: false,
      error: false
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    async getResult() {
      try {
        const { data } = await getSearchResultAPI(
          this.page++,
          this.pre_page,
          this.keywords
        )
        const results = data.data.results
        // 判断数组里又没有数据，没有就变成true，不发送请求
        if (results.length === 0) this.finished = true

        this.resultsList.push(...results)
      } catch (error) {
        this.error = false
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.results {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
