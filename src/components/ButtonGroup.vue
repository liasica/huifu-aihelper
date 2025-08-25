<script lang="ts" setup>
import { NButton, NButtonGroup } from 'naive-ui'

defineProps<{
  expand: boolean
  handleExpand: () => void
  handleAIHelper: () => void
}>()
</script>

<template>
  <Space>
    <NButtonGroup>
      <NButton
        v-if="expand"
        size="tiny"
        @click="handleExpand"
        dashed
      >
        展开
      </NButton>
      <NButton
        size="tiny"
        @click="handleAIHelper"
        dashed
        type="success"
      >
        AI助手
      </NButton>
    </NButtonGroup>
  </Space>
</template>
