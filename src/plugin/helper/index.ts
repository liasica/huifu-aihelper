import { App, ref, type Plugin } from 'vue'

import { useApiStore } from '@/store/api'
import { useSettingStore } from '@/store/setting'

import { showApiKeyModal } from './key'
import { showPromptModal } from './prompt'
import { useDeepSeek, useSearchNearestTitle } from '@/composables'
import { showNotification } from './message'
import { showCodeSnippetModal } from './code'

const installed = ref(false)

const HelperPlugin: Plugin = {
  install(app: App) {
    if (installed.value) return
    installed.value = true

    const $api = useApiStore()
    const $setting = useSettingStore()

    app.config.globalProperties.$helper = {
      showPromptModal: async (table: HTMLTableElement) => {
        try {
          let key = $setting.$getApiKey()
          if (!key) {
            key = await showApiKeyModal()
            $setting.$setApiKey(key)
          }
          console.info('DeepSeek Api Key:', key)

          // 获取title
          const title = useSearchNearestTitle(table)
          if (!title) {
            showNotification('未能从table获取到接口title内容', 'error')
            return
          }
          console.info('获取到 title:', title)

          const md = await $api.$getDoc(title)
          console.info(`完成文档内容获取, 共: ${md?.length || 0}个字符`)
          if (!md) {
            showNotification(`未能获取到${title}对应的文档`, 'error')
            return
          }

          let content = $setting.$getCache(md)
          console.info(`缓存获取, ${content ? '命中' : '未命中'}`)

          const { prompt, force, destroy } = await showPromptModal(title, md, !!content)
          console.info(`Prompt: ${prompt}, Force: ${force}`)

          // AI Prompt
          if (!content || force) {
            // 请求AI生成
            content = await useDeepSeek(key, prompt)
            console.info('AI Response:', content)
            if (!content) {
              showNotification('未能获取到AI生成的内容', 'error')
              destroy()
              return
            }
            // 保存接口内容
            $setting.$setCache(title, content)
          }

          destroy()
          showCodeSnippetModal(content)
        } catch (e) {
          console.error('捕获错误:', e)
          showNotification(`捕获到错误: ${e}`, 'error')
        }
      },
    }
  },
}

export const createHelper = () => HelperPlugin
