import { h, ref } from 'vue'
import { createDiscreteApi, NInput } from 'naive-ui'
import { useOptions } from './common'

// 模态框
export const showApiKeyModal = (): Promise<string> => new Promise<string>(resolve => {
  const apiKey = ref('')
  const { dialog } = createDiscreteApi(['dialog'])

  dialog.info({
    ...useOptions(),
    title: 'DeepSeek Api Key',
    class: 'ai-input-modal',
    contentClass: 'ai-input-content',
    content: () => h(NInput, {
      modelValue: apiKey.value,
      onUpdateValue: v => apiKey.value = v,
      placeholder: '请输入 DeepSeek Api Key',
    }),
    onPositiveClick: () => {
      resolve(apiKey.value)
    },
  })
})
