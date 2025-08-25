import { ref, type App, type Plugin } from 'vue'

import { useApiStore } from '@/store/api'
import { setupXHRInterceptor } from './interceptor'
import { useLocationHrefHash } from '@/composables'

const installed = ref(false)
const regex = /^https:\/\/paas\.huifu\.com\/partners\/prod\/api\/doc(.*)\.md$/

const getHash = (url: string) => {
  return url.replace(regex, '#$1')
}

/**
 * XMLHttpRequest 拦截器
 * @doc https://chatgpt.com/share/68a7cd62-6ba0-8008-afe4-7ad1749590a8
 */
const InterceptorPlugin: Plugin = {
  install(app: App) {
    if (installed.value) return
    installed.value = true

    const $store = useApiStore()

    const isApiUrl = (url: string) => {
      if (url.indexOf('https://paas.huifu.com/partners/prod/api/doc') === -1) return false
      return getHash(url) === useLocationHrefHash()
    }

    const start: XMLHttpRequestInterceptorStart = url => {
      if (!isApiUrl(url.toString())) return
      console.info(`开始拦截请求: ${url}`)
    }

    const loaded: XMLHttpRequestInterceptorLoaded = (url, response) => {
      if (!isApiUrl(url.toString())) return

      console.info(`成功拦截请求: ${url}`)
      $store.$setState(getHash(url), response)
    }

    // 设置 XMLHttpRequest 拦截器
    setupXHRInterceptor(start, loaded)

    app.config.globalProperties.$interceptor = {
      getApiDoc: async () => await $store.$waitDoc(),
    }
  },
}

export const createInterceptor = () => InterceptorPlugin
