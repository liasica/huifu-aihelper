import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount(
  (() => {
    const app = document.createElement('div')
    const interval = setInterval(() => {
      if (document && document.body) {
        clearInterval(interval)
        document.body.append(app)
      }
    }, 1)
    return app
  })(),
)
