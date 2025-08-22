import { ref } from 'vue'
import { defineStore } from 'pinia'
import { until } from '@vueuse/core'

export const useApiStore = defineStore('api', () => {
  const doc = ref<string>('')
  const url = ref<string | URL>('')

  const waitFor = async (want: string): Promise<string> => {
    await until(url).toMatch(v => v === want)
    return doc.value
  }

  const setState = (apiUrl: string | URL, text?: string) => {
    url.value = apiUrl
    if (text !== undefined) {
      doc.value = text
    }
  }

  return { doc, url, waitFor, setState }
})
