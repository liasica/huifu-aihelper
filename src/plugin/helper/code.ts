import { createDiscreteApi } from 'naive-ui'
import Highlight from '@/components/Highlight.vue'
import { useOptions } from './common'
import { h } from 'vue'

/**
 * 显示代码片段
 * @param content 代码内容
 */
export const showCodeSnippetModal = (content: string) => {
  const { dialog } = createDiscreteApi(['dialog'])

  dialog.info({
    ...useOptions(),
    title: '代码片段',
    class: 'ai-helper-modal',
    maskClosable: false,
    positiveText: '关闭',
    content: () => h(Highlight, {
      content,
    }),
  })
}
