// src/types/xhr-extend.d.ts

// type Hook<T = void> = T extends unknown[]
//   ? (callback: (...args: T) => void) => void
//   : (callback: () => void) => void

// interface DocsifyHook {
//   /** 初始化完成后调用，只调用一次，没有参数。 */
//   init: Hook
//   /** 每次开始解析 Markdown 内容时调用。 */
//   beforeEach: Hook<[string]>
//   /** 解析成 html 后调用。 */
//   afterEach: Hook<[string, (html: string) => void]>
//   /** 每次路由切换时数据全部加载完成后调用，没有参数。 */
//   doneEach: Hook
//   /** 初始化并第一次加载完成数据后调用，只触发一次，没有参数。 */
//   mounted: Hook
//   /** 初始化并第一次加载完成数据后调用，没有参数。 */
//   ready: Hook
// }

// interface DocsifyPlugin {
//   (hook: DocsifyHook): void
// }

// interface Docsify {
//   plugins: (hook: DocsifyHook) => DocsifyPlugin[]
// }

type VoidCallback = () => void

interface Docsify {
  plugins?: DocsifyPlugin[]
  [key: string]: T
}

type DocsifyPlugin = (hook: DocsifyHook, vm: DocsifyVm) => void

interface DocsifyVm {
  // 当前路由路径（如 #/README）
  route: {
    path: string
    file: string
    query: Record<string, string>
  }

  /** 配置对象 */
  config: Record<string, T>

  /** 当前渲染的 DOM 容器 */
  render: (el: HTMLElement, content: string) => void

  /** 其他运行时属性 */
  [key: string]: T
}

interface DocsifyHook {
  // 生命周期钩子
  init: (callback: VoidCallback) => void
  beforeEach: (
    callback: (content: string, next: (content: string) => void) => void
  ) => void
  afterEach: (
    callback: (html: string, next: (html: string) => void) => void
  ) => void
  mounted: (callback: VoidCallback) => void
  doneEach: (callback: VoidCallback) => void
  ready: (callback: VoidCallback) => void
}

interface Window {
  [key: string]: T
  $docsify?: Docsify
}

type XMLHttpRequestWithRequestURL = XMLHttpRequest & {
  _url: string
}

type XMLHttpRequestInterceptorStart = (url: string) => void

type XMLHttpRequestInterceptorLoaded = (url: string, response: string) => void

interface MarkdownNode {
  id: number
  parentId: number | null
  title: string
  level: number
  content: string
}
