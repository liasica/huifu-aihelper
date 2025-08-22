import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import { createPinia } from 'pinia'

import './style/main.scss'
import '@arco-design/web-vue/dist/arco.css'

import App from './App.vue'

import { createInterceptor } from './plugin/interceptor'

const app = createApp(App)

app.use(createPinia())
app.use(ArcoVue)
app.use(createInterceptor())
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
