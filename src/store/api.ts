import { ref } from 'vue'
import { defineStore } from 'pinia'
import { until } from '@vueuse/core'
import { useLocationHrefHash, useParseMarkdown } from '@/composables'

export const useApiStore = defineStore('api', () => {
  const doc = ref<string>('')
  const hash = ref<string>('')

  const $waitFor = async (want: string): Promise<string> => {
    await until(hash).toMatch(v => v === want)
    return doc.value
  }

  const $setState = (hashValue: string, docValue: string) => {
    hash.value = hashValue
    doc.value = docValue
  }

  const $waitDoc = async (): Promise<string> => {
    return $waitFor(useLocationHrefHash())
  }

  const $getDoc = async (title: string): Promise<string | undefined> => {
    const md = await $waitDoc()
    const node = useParseMarkdown(md).find(n => n.title === title)
    return node?.content?.replace(/(^\*[\s\S]+?)\|/, '|')
  }

  return { doc, hash, $waitFor, $setState, $waitDoc, $getDoc }
})
