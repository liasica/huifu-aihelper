import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'vfonts/FiraCode.css'
import 'highlight.js/styles/github.css'
import './style/main.scss'

import App from './App.vue'

import { createInterceptor } from './plugin/interceptor'
import { createDocsify } from './plugin/docsify'
import { createHelper } from './plugin/helper'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(createInterceptor())
app.use(createDocsify())
app.use(createHelper())

app.mount(
  (() => {
    const app = document.createElement('div')
    app.id = 'huifu-aihelper'
    const interval = setInterval(() => {
      if (document && document.body) {
        clearInterval(interval)
        document.body.append(app)
      }
    }, 1)
    return app
  })(),
)
