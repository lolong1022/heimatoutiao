<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        @click="isShowEdit = !isShowEdit"
        round
        >{{ isShowEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 单个频道 -->
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :class="{ active: item.name === '推荐' }"
          :key="item.id"
          :icon="isShowEdit && item.name !== '推荐' ? 'cross' : ''"
          :text="item.name"
          @click="handerMyChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"></van-cell>
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendP"
          :key="item.id"
          :text="item.name"
        >
          <template #icon> <van-icon name="plus" v-if="isShowEdit" /> </template
        ></van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  data() {
    return {
      isShowEdit: false,
      recommendpannel: []
    }
  },
  props: {
    myChannels: Array
  },
  created() {
    this.getAllchannel()
  },
  methods: {
    async getAllchannel() {
      const { data } = await getAllChannels()
      console.log(data)
      this.recommendpannel = data.data.channels
    },
    handerMyChannel({ name }, index) {
      if (this.isShowEdit && name !== '推荐') {
        console.log('shanchu' + name)
      } else {
        this.$emit('changeActive', index)
      }
    }
  },
  computed: {
    recommendP() {
      return this.recommendpannel.filter((allChannelItem) => {
        return !this.myChannels.find(
          (myChannelItem) => myChannelItem.id === allChannelItem.id
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channel-edit {
  padding-top: 92px;
}
.btn {
  border-color: red;
  width: 100px;
  color: red;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);

  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
