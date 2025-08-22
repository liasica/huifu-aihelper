import { ref, type App, type Plugin } from 'vue'

import { useApiStore } from '@/store/api'
import { setupXHRInterceptor } from './interceptor'

const installed = ref(false)
const regex = /^https:\/\/paas\.huifu\.com\/partners\/prod\/api\/doc(.*)\.md$/

/**
 * XMLHttpRequest 拦截器
 * @doc https://chatgpt.com/share/68a7cd62-6ba0-8008-afe4-7ad1749590a8
 */
const interceptor: Plugin = {
  install(app: App) {
    if (installed.value) return
    installed.value = true

    // const hash = computed(() => new URL(location.href).hash)

    const $store = useApiStore()

    const isApiUrl = (url: string) => {
      if (url.indexOf('https://paas.huifu.com/partners/prod/api/doc') === -1) return false

      const hash = new URL(location.href).hash
      return url.replace(regex, '#$1') === hash
    }

    const start: XMLHttpRequestInterceptorStart = url => {
      if (!isApiUrl(url.toString())) return
      
      console.info(`开始拦截请求: ${url}`)
      $store.setState(url)
    }

    const loaded: XMLHttpRequestInterceptorLoaded = url => {
      if (!isApiUrl(url.toString())) return
      
      console.info(`拦截请求: ${url}`)
    }

    setupXHRInterceptor(start, loaded)

    app.config.globalProperties.$interceptor = {
      // getInterceptors: () => getXMLRequestInterceptors(),
      getInterceptors: () => [],
    }
  },
}

const createInterceptor = () => interceptor

export { createInterceptor }
