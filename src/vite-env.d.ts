/// <reference types="vite/client" />
/// <reference types="vite-plugin-monkey/client" />
/// <reference types="vite-plugin-monkey/global" />

import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $interceptor: {
      getApiDoc: () => Promise<string>
    }
    $docsify: {
      doneEach: (callback: () => void) => void
    }
    $helper: {
      showQuestionModal: (table: HTMLTableElement) => void
    }
  }
}
