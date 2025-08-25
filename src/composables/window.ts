/**
 * 监听 window 对象属性的设置
 * @param key 属性名
 * @returns Promise<void>
 */
export const useOnWindowPropSet = <T>(key: string) => new Promise<T>(resolve => {
  // 已经有了就直接回调
  if (key in unsafeWindow && unsafeWindow[key] !== undefined) {
    resolve(unsafeWindow[key])
    return
  }

  // 拦截后续的赋值
  let captured: T
  Object.defineProperty(unsafeWindow, key, {
    configurable: true,
    enumerable: true,
    get() {
      return captured
    },
    set(v) {
      captured = v
      // 先恢复成普通数据属性，避免 getter/setter 影响后续库行为
      Object.defineProperty(unsafeWindow, key, {
        value: v,
        writable: true,
        enumerable: true,
        configurable: true,
      })
      resolve(captured)
    },
  })
})
