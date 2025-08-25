import { createDiscreteApi } from 'naive-ui'

export const showNotification = (content: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
  const { notification } = createDiscreteApi(['notification'])
  notification[type]({
    content,
    duration: 3000,
  })
}
