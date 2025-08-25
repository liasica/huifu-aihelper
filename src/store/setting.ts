import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Md5 } from 'ts-md5'

export const useSettingStore = defineStore('setting', () => {
  // DeepSeek ApiKey 设置
  const apiKey = ref<string>()
  const $setApiKey = (key: string) => {
    apiKey.value = key
  }
  const $getApiKey = () => apiKey.value

  // 请求结果缓存
  const cache = ref<Map<string, string>>(new Map())
  const $setCache = (md: string, content: string) => {
    cache.value.set(Md5.hashStr(md), content)
  }
  const $getCache = (md: string) => {
    return cache.value.get(Md5.hashStr(md))
  }

  return { apiKey, cache, $setApiKey, $getApiKey, $setCache, $getCache }
}, {
  persist: {
    storage: localStorage,
    debug: true,
    key: '__API_HELPER__',
    serializer: {
      serialize: (state: Record<string, unknown>) => {
        // 将 Map 转换为普通对象进行序列化
        const serializedState = {
          ...state,
          cache: state.cache instanceof Map ? Object.fromEntries(state.cache) : state.cache,
        }
        return JSON.stringify(serializedState)
      },
      deserialize: (value: string) => {
        const parsed = JSON.parse(value)
        // 将普通对象转换回 Map
        if (parsed.cache && typeof parsed.cache === 'object') {
          parsed.cache = new Map(Object.entries(parsed.cache))
        }
        return parsed
      },
    },
  },
})
