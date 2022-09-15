<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch($event)"
    ></component>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'
export default {
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      if (!this.keywords) {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) return 'SearchResult'
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      this.SET_HISTORIES([...new Set([keywords, ...this.histories])])
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style lang="less" scoped>
div[role='button'] {
  color: #fff;
}
</style>
