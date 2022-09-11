<template>
  <div>
    <AriticleItem v-for="item in resultTimes" :key="item.art_id" :aritical="item"></AriticleItem>
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
      resultTimes: []
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
    }
  }
}
</script>

<style lang="less" scoped></style>
