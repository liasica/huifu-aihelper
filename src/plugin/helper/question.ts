import { h, ref } from 'vue'
import { createDiscreteApi, NInput } from 'naive-ui'
import { useOptions } from './common'

export interface QuestionReactive {
  question: string
  destroy: () => void
}

// 模态框
export const showQuestionModal = (): Promise<QuestionReactive> => new Promise<QuestionReactive>(resolve => {
  // 问题弹窗加载中
  const loading = ref(false)

  // 问题
  const question = ref('请帮我生成golang struct，要求如下：根据参考文件内容生成所有的结构体和字段并添加字段注释、所有字段都使用omitempty、所有结构体都不要简化字段、所有结构体都帮我生成所有的字段、不要询问我是否继续、帮我把所有的结构体都生成、所有的ID字段"*_id"结构体字段都生成为*Id。')

  const { dialog } = createDiscreteApi(['dialog'])
  const dg = dialog.create({
    ...useOptions(),
    title: '问题',
    class: 'ai-input-modal',
    contentClass: 'ai-input-content',
    closable: false,
    maskClosable: false,
    negativeText: '取消',
    closeOnEsc: false,
    loading: loading.value,
    content: () => h(NInput, {
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
    onPositiveClick: () => {
      loading.value = true
      dg.loading = true
      dg.negativeButtonProps = {
        disabled: loading.value,
      }
      resolve({
        question: question.value,
        destroy: dg.destroy,
      })
      return false
    },
    onNegativeClick: () => !loading.value,
  })
  // 打开模态框
  // const { update, close } = Modal.open({
  //   content: () => h({
  //     setup() {
  //       return () => h(Textarea, {
  //         modelValue: question.value,
  //         'onUpdate:modelValue': v => question.value = v,
  //         placeholder: '输入AI助手提示词',
  //         autoSize: true,
  //         disabled: loading.value,
  //       })
  //     },
  //   }),
  //   title: '问题',
  //   escToClose: false,
  //   maskClosable: false,
  //   closable: false,
  //   modalClass: 'ai-input-modal',
  //   okLoading: loading.value,
  //   okButtonProps: {
  //     disabled: loading.value,
  //   },
  //   cancelButtonProps: {
  //     disabled: loading.value,
  //   },
  //   onBeforeCancel: () => !loading.value,
  //   onBeforeOk: () => {
  //     loading.value = true
  //     update({
  //       okLoading: true,
  //       okButtonProps: {
  //         disabled: true,
  //       },
  //       cancelButtonProps: {
  //         disabled: true,
  //       },
  //     })
  //     resolve({
  //       question: question.value,
  //       close,
  //     })
  //     return false
  //   },
  // })
})
