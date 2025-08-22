// src/types/xhr-extend.d.ts

declare global {
  interface XMLHttpRequest {
    callbacks?: Record<string, (() => void)[]>;
  }
}

type XMLHttpRequestWithRequestURL = XMLHttpRequest & {
  _url: string | URL
}

type XMLHttpRequestInterceptorStart = (url: string | URL) => void

type XMLHttpRequestInterceptorLoaded = (url: string | URL, response: string) => void
