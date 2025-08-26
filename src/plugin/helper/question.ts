import { h, ref } from 'vue'
import { createDiscreteApi, NInput, NCheckbox } from 'naive-ui'
import { useOptions } from './common'

export interface QuestionReactive {
  question: string
  force: boolean
  destroy: () => void
}

// 模态框
export const showQuestionModal = (hasCache: boolean): Promise<QuestionReactive> => new Promise<QuestionReactive>(resolve => {
  // 问题弹窗加载中
  const loading = ref(false)

  // 问题
  const question = ref('请帮我生成golang struct，要求如下：根据参考文件内容生成所有的结构体和字段并添加字段注释（对应markdown表格的中文、说明两列）、所有字段都使用omitempty、所有结构体都不要简化字段、所有结构体都帮我生成所有的字段、不要询问我是否继续、帮我把所有的结构体都生成、所有的ID字段"*_id"结构体字段都生成为*Id。')

  // 是否强制生成
  const force = ref(false)

  const { dialog } = createDiscreteApi(['dialog'])
  const dg = dialog.create({
    ...useOptions(),
    title: '问题',
    class: 'ai-input-modal',
    contentClass: 'ai-input-content',
    closable: false,
    maskClosable: false,
    negativeText: '取消',
    closeOnEsc: true,
    loading: loading.value,
    content: () => h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      },
    }, [
      h(NInput, {
        type: 'textarea',
        autofocus: true,
        autosize: {
          minRows: 3,
          maxRows: 20,
        },
        disabled: loading.value,
        placeholder: '输入AI助手提示词',
        value: question.value,
        onUpdateValue: v => question.value = v,
      }),
      hasCache ? h(NCheckbox, {
        label: '强制更新缓存（会重复请求DeepSeek带来额外的token消耗）',
        disabled: loading.value,
        defaultChecked: force.value,
        onUpdateChecked: v => force.value = v,
      }) : null,
    ]),
    onPositiveClick: () => {
      loading.value = true
      dg.loading = true
      dg.negativeButtonProps = {
        disabled: loading.value,
      }
      resolve({
        question: question.value,
        force: force.value,
        destroy: dg.destroy,
      })
      return false
    },
    onNegativeClick: () => !loading.value,
  })
})
