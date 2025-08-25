export const useTableExtendSpan = (dom: HTMLElement) => {
  return dom.querySelector('tr:not(.tr-collapse-open) > td > .extend')
}

/**
 * 展开表格参数
 * @param table 要展开的表格
 * @param expand 是否展开
 * @returns 
 */
export const useExpandTable = async (table: HTMLTableElement, expand: boolean): Promise<void> => {
  if (!table) return
  if (!expand) {
    return waitTableCollapse(table)
  }

  let dom = useTableExtendSpan(table)?.closest('tr')

  while (dom) {
    // 查找第一个未展开的 .extend 元素
    await waitDomExtend(useTableExtendSpan(dom) as HTMLSpanElement | undefined)

    // 移动到下一个节点
    dom = useTableExtendSpan(table)?.closest('tr')
  }
}

const waitTableCollapse = (table: HTMLTableElement) => new Promise<void>(resolve => {
  const openRows = table.querySelectorAll('tr.tr-collapse-open')
  if (openRows.length === 0) {
    resolve()
    return
  }

  openRows.forEach(tr => {
    const span = tr.querySelector('td > .extend') as HTMLSpanElement | null
    if (span) {
      span.click()
    }
  })

  // 等待所有行都折叠完成
  const observer = new MutationObserver((_: MutationRecord[], observer: MutationObserver) => {
    const stillOpen = table.querySelectorAll('tr.tr-collapse-open')
    if (stillOpen.length === 0) {
      resolve()
      observer.disconnect()
    }
  })
  observer.observe(table, { attributes: true, subtree: true, attributeFilter: ['class'] })
})

const waitDomExtend = (span: HTMLSpanElement | undefined) => new Promise<void>(resolve => {
  const tr = span?.closest('tr')
  if (!tr || tr.classList.contains('tr-collapse-open')) {
    resolve()
    return
  }

  const observer = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if ((mutation.target as HTMLTableRowElement).classList.contains('tr-collapse-open')) {
          resolve()
          observer.disconnect()
        }
      }
    })
  })
  observer.observe(tr, { attributes: true, attributeFilter: ['class'] })

  span?.click()
})

/**
 * 向上查找最近的兄弟级 title 节点
 * @param el 起始元素
 * @returns 最近的 title 元素 id，找不到则返回 null
 */
export const useSearchNearestTitle = (el: Element | null): string | null => {
  let node: Element | null = el

  while (node) {
    // 向上查找前面的兄弟节点
    let sibling: Element | null = node.previousElementSibling

    while (sibling) {
      if (sibling.tagName.toLowerCase().startsWith('h') && sibling.textContent.trim() === sibling.id) {
        return sibling.id
      }
      sibling = sibling.previousElementSibling
    }

    // 没找到就往父级继续查
    node = node.parentElement
  }

  return null
}
