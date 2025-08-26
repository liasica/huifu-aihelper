<script setup lang="ts">
import { getCurrentInstance, h, ref, render } from 'vue'

import { useTableExtendSpan, useExpandTable } from '@/composables'
import ButtonGroup from '@/components/AiButtonGroup.vue'

const { proxy } = getCurrentInstance()!
proxy?.$docsify.doneEach(() => {
  const tables = document.querySelectorAll('#main > table') as NodeListOf<HTMLTableElement>
  tables.forEach(table => {
    const div = document.createElement('div')
    div.className = 'ai-btn-wrapper'

    const expanded = ref(false)
    // 创建 Vue 组件的虚拟节点
    const vnode = h(ButtonGroup, {
      expanded,
      showExpand: useTableExtendSpan(table) !== null,
      handleExpand: async () => {
        expanded.value = !expanded.value
        await useExpandTable(table, expanded.value)
      },
      handleAIHelper: async () => {
        proxy.$helper?.showPromptModal(table)
      },
    })

    // 将组件渲染到 div 中
    render(vnode, div)

    // 将 div 插入到表格前面
    table.parentNode?.insertBefore(div, table)
  })
})
</script>
