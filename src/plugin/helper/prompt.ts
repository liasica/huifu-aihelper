import { computed, h, ref } from 'vue'
import { createDiscreteApi, NInput, NCheckbox, NButton, NSpace } from 'naive-ui'
import { useOptions } from './common'

export interface QuestionReactive {
  prompt: string
  force: boolean
  destroy: () => void
}

// 模态框
export const showPromptModal = (title: string, md: string, hasCache: boolean): Promise<QuestionReactive> => new Promise<QuestionReactive>(resolve => {
  const question = ref('请帮我生成golang struct，要求如下：根据参考文件内容生成所有的结构体和字段，并添加结构体注释（如果是嵌套结构体则结构体的注释是嵌套字段的中文列，生成格式为[字段名 注释内容]，例如：// XXX 注释内容）、字段注释（对应markdown表格的中文、说明两列）；所有字段都使用omitempty、所有结构体都不要简化字段、所有结构体都帮我生成所有的字段、不要询问我是否继续、帮我把所有的结构体都生成、所有的ID字段"*_id"结构体字段都生成为*Id。')
  const prompt = computed(() => `参考文件内容: \n${md}\n\n问题: ${question.value}\n\n参数表中<span class="extend $1">$2</span>指的是: $2参数结构是以<!-- div:extend-table $1-table -->开头并且以<!-- extend:end -->结尾的表格内容\n\n特别注意，主结构体放到最上面，主结构体的名称用${title}的英文翻译，当字段说明中有jsonArray字符串、或字段名包含List时字段值是数组，不要漏了任何结构体和字段！！所有的注释：中文标点都转换成英文标点，并且修改下格式将格式调整的更加易读、符合规范如果有标点不符合正常规范也调整下；当参数有必填列的时候，注释需要以必填值为开头，例如：[Y] / [N] / [C]`)

  // 问题弹窗加载中
  const loading = ref(false)

  // 是否强制生成
  const force = ref(false)

  const { dialog, message } = createDiscreteApi(['dialog', 'message'])
  const dg = dialog.create({
    ...useOptions(),
    title: '问题',
    class: 'ai-input-modal',
    contentClass: 'ai-input-content',
    closable: false,
    maskClosable: false,
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
    action: () => h(NSpace, {}, [
      h(NButton, {
        size: 'small',
        dashed: true,
        type: 'info',
        onClick: () => {
          navigator.clipboard.writeText(prompt.value)
          message.success('prompt已复制到剪贴板')
        },
      }, '复制prompt'),
      h(NButton, {
        size: 'small',
        disabled: loading.value,
        onClick: () => {
          loading.value = false
          dg.destroy()
        },
      }, '取消'),
      h(NButton, {
        type: 'primary',
        size: 'small',
        loading: loading.value,
        onClick: () => {
          loading.value = true
          dg.loading = true
          dg.negativeButtonProps = {
            disabled: loading.value,
          }
          resolve({
            prompt: prompt.value,
            force: force.value,
            destroy: dg.destroy,
          })
        },
      }, '确定'),
    ]),
  })
})
