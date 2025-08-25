<script setup lang="ts">
import { createVNode, getCurrentInstance, render } from 'vue'

import { useTableExtendSpan, useExpandTable } from '@/composables'
import ButtonGroup from '@/components/ButtonGroup.vue'
// import { useSettingStore } from '@/store/setting'

// const $settingStore = useSettingStore()

const { proxy } = getCurrentInstance()!
proxy?.$docsify.doneEach(() => {
  const tables = document.querySelectorAll('#main > table') as NodeListOf<HTMLTableElement>
  tables.forEach(table => {
    const div = document.createElement('div')
    div.className = 'ai-btn-wrapper'

    // 创建 Vue 组件的虚拟节点
    const vnode = createVNode(ButtonGroup, {
      expand: useTableExtendSpan(table) !== null,
      handleExpand: () => {
        useExpandTable(table)
      },
      handleAIHelper: async () => {
        proxy.$helper?.showQuestionModal(table)
      },
    })

    // 将组件渲染到 div 中
    render(vnode, div)

    // 将 div 插入到表格前面
    table.parentNode?.insertBefore(div, table)
  })
})
</script>
