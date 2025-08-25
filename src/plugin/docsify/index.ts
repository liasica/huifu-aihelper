import { useOnWindowPropSet } from '@/composables'
import { App, ref, type Plugin } from 'vue'

const installed = ref(false)

const DocsifyPlugin: Plugin = {
  async install (app: App) {
    if (installed.value) return
    installed.value = true

    const doneEachCallbacks: VoidCallback[] = []

    app.config.globalProperties.$docsify = {
      doneEach: (callback: VoidCallback) => {
        doneEachCallbacks.push(callback)
      },
    }

    const $docsify = await useOnWindowPropSet<Docsify>('$docsify')
    $docsify.plugins = ([] as DocsifyPlugin[]).concat(
      $docsify.plugins || [],
      function (hook: DocsifyHook) {
        hook.doneEach(() => {
          doneEachCallbacks.forEach(callback => callback())
        })
      },
    )
  },
}

export const createDocsify = () => DocsifyPlugin
