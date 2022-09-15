<template>
  <div>
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />
        <div v-else>
          <span @click="$store.commit('SET_HISTORIES', [])">全部删除</span>
          &nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in $store.state.histories"
      :key="index"
      @click="!isEdit && $emit('change-keywords', item)"
    >
      <template #extra>
        <!-- x号icon -->
        <van-icon
          v-if="isEdit"
          name="close"
          @click="
            $store.commit(
              'SET_HISTORIES',
              $store.state.histories.filter((i) => item !== i)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false
    }
  }
}
</script>

<style lang="stylus" scoped></style>
