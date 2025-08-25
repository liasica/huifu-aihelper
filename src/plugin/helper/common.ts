import { DialogOptions } from 'naive-ui'

export const onAfterEnter: () => void = () => {
  document.body.classList.add('hidden')
}

export const onAfterLeave: () => void = () => {
  document.body.classList.remove('hidden')
}

export const useOptions = (): DialogOptions => ({
  onAfterEnter,
  onAfterLeave,
  transformOrigin: 'center',
  autoFocus: false,
  showIcon: false,
  blockScroll: false,
  positiveText: '确定',
  style: {
    width: '60%',
  },
})
