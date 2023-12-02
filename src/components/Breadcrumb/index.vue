<template>
  <div>
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      class="tag"
      closable
      size="large"
      :type="tag.type"
      @click="clickTag(tag)"
      @close="tagClose(tag, index)"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from 'vue'
import bus from '@/plugins/mitt'
import router from '@/router'
import { localCache } from '@/utils/cache'
const localTags = localCache.getCache('tags')
const tags = ref(localTags ?? [{ name: '首页', route: '/main' }])
function clickTag(tag: any) {
  router.push(tag.route)
}

function tagClose(tag: any, index: number) {
  if (tag.name === '首页') {
    return
  } else {
    tags.value.splice(index, 1)
    router.push(tags.value[--index].route)
  }
}

watch(tags.value, () => {
  localCache.setCache('tags', tags.value)
})

bus.on('tagsAdd', (item: any) => {
  const isExist = !!tags.value.find((tag: any) => tag.name === item.bankName)

  if (!isExist) {
    tags.value.push({ name: item.bankName, route: item.route })
  }
})
onBeforeUnmount(() => {
  bus.off('tagsAdd')
})
</script>
<style scoped lang="less">
.tag {
  cursor: pointer;
}
</style>
