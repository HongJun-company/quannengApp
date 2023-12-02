<template>
  <div class="right">
    <el-form :model="formData" label-width="100px">
      <el-form-item label="选择模板">
        <el-select
          v-model="templateItem"
          class="m-2"
          style="width: 100%"
          placeholder="选择模板"
          size="default"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <template v-for="item in formData" :key="item.label">
        <el-form-item :label="item.label">
          <el-input v-model="item.value" />
        </el-form-item>
      </template>
    </el-form>
    <div class="templateSave">
      <el-row :gutter="20">
        <el-col class="col" :span="6" v-for="item in options" :key="item.label">
          <el-button type="primary" plain size="small" @click="saveTemplate(item.label)"
            >保存{{ item.label }}</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import type { IProps } from './type'
import { debounce } from '@/utils/debounce'
import optionsData from '@/components/right/data'
import bus from '@/plugins/mitt'
const props = defineProps<IProps>()
const emit = defineEmits(['formChange'])
const formData = reactive(props.form)
const templateItem = ref('')
const templateItemFetch = ref('')
const options = ref(optionsData)
watch(
  () => formData,
  debounce(() => {
    emit('formChange', formData)
  }, 16),
  {
    deep: true
  }
)
function saveTemplate(template: string) {
  templateItemFetch.value = template
}

watch(
  () => templateItemFetch.value,
  () => {
    console.log(templateItemFetch.value)
  }
)
watch(
  () => templateItem.value,
  () => {
    bus.emit('templateChange', {})
  }
)
</script>
<style scoped lang="less">
.right {
  width: 8.2407rem;
  height: 100%;
  overflow: hidden;
  .templateSave {
    width: 97%;
    padding-left: 0.2778rem;

    .col {
      margin-bottom: 0.0926rem;
    }
  }
}
</style>
