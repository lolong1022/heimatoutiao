<template>
  <div>
    <van-cell
      v-for="(item, index) in highLightSuggerstions"
      :key="index"
      icon="search"
      @click="$emit('change-keywords',getSuggestionList[index])"
    >
      <template #title> <span v-html="item"></span> </template
    ></van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggestionsAPI } from '@/api'
export default {
  data() {
    return {
      getSuggestionList: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },

  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        this.getSuggestionList = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.success('获取建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  },
  computed: {
    highLightSuggerstions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.getSuggestionList.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
