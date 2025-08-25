import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import monkey, { cdn, util } from 'vite-plugin-monkey'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      UnoCSS(),
      monkey({
        entry: 'src/main.ts',
        userscript: {
          icon: 'https://www.google.com/s2/favicons?sz=64&domain=huifu.com',
          namespace: 'https://github.com/liasica/huifu-aihelper',
          match: ['https://paas.huifu.com/open/doc/api/*'],
          version: env.VERSION || '1.0.0',
          description: '汇付天下斗拱平台文档AI助手',
          author: 'liasica',
          name: '汇付天下斗拱平台文档AI助手',
          'run-at': 'document-start',
        },
        build: {
          externalGlobals: {
            vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          },
        },
      }),
      AutoImport({
        imports: [
          util.unimportPreset,
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
