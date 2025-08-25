export function setupXHRInterceptor(start: XMLHttpRequestInterceptorStart, loaded: XMLHttpRequestInterceptorLoaded) {
  const { open, send } = XMLHttpRequest.prototype

  XMLHttpRequest.prototype.open = function (...args: [string, string, boolean?, string?, string?]) {
    const url = args[1] as string
    (this as XMLHttpRequestWithRequestURL)._url = url
    start(url)
    return open.apply(this, args as Parameters<typeof open>)
  }

  XMLHttpRequest.prototype.send = function (...args: [Document | XMLHttpRequestBodyInit | null]) {
    this.addEventListener('load', function () {
      const url = (this as XMLHttpRequestWithRequestURL)._url

      try {
        loaded(url, this.responseText)
      } catch (e) {
        console.warn('拦截器解析失败:', e)
      }
    })
    return send.apply(this, args)
  }
}
