<script lang="ts" setup>
import { Ref, VNodeProps } from 'vue'
import { NButton, NButtonGroup } from 'naive-ui'

export type AiButtonGroupProps = VNodeProps & {
  expanded: Ref<boolean>
  showExpand: boolean
  handleExpand: () => void
  handleAIHelper: () => void
}

defineProps<AiButtonGroupProps>()
</script>

<template>
  <NButtonGroup>
    <NButton
      v-if="showExpand"
      size="tiny"
      @click="handleExpand"
      dashed
      :type="expanded.value ? 'warning' : 'default'"
    >
      {{ expanded.value ? '收起' : '展开' }}
    </NButton>
    <NButton
      size="tiny"
      @click="handleAIHelper"
      type="success"
    >
      AI助手
    </NButton>
  </NButtonGroup>
</template>
