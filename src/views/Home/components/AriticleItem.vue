<template>
  <div>
    <van-cell
      v-if="aritical.cover.type == 0"
      :title="aritical.title"
      :label="label"
    />
    <van-cell
      v-if="aritical.cover.type == 1"
      :title="aritical.title"
      :label="label"
    >
      <van-image
        width="100"
        height="100"
        :src="aritical.cover.images"
      ></van-image>
    </van-cell>
    <van-cell v-if="aritical.cover.type == 3" :title="aritical.title">
      <template #label>
        <van-image
          width="100"
          height="100"
          v-for="(item, index) in aritical.cover.images"
          :key="index"
          :src="item"
        ></van-image>
        <p>{{ label }}</p>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    aritical: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /*eslint-disable*/
      const { aut_name, comm_count, pubdate } = this.aritical
      return `${aut_name} ${comm_count} ${pubdate}`
    }
  }
}
</script>

<style lang="less" scoped></style>
