<script lang="ts" setup>
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import { computed, ref } from 'vue'
import { createDiscreteApi, NIcon } from 'naive-ui'

const props = defineProps<{
  content: string
}>()

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }),
)

const renderedMarkdown = computed(() => {
  const content = props.content.replace(/^[\s]+```/gm, '```')
  return marked.parse(content)
})

const copied = ref(false)

const handleCopy = async () => {
  const content = props.content.replace(/[\s\S]+?```go\n([\s\S]+)?```/, '$1')
  await navigator.clipboard.writeText(content)
  const { message } = createDiscreteApi(['message'])
  message.success('复制成功')
  copied.value = true
}
</script>

<template>
  <div class="highlight-wrapper">
    <NIcon
      size="24"
      class="copy"
      @click="handleCopy"
      :color="copied ? 'green': 'black'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M4 4.085V10.5a2.5 2.5 0 0 0 2.336 2.495L6.5 13h4.414A1.5 1.5 0 0 1 9.5 14H6a3 3 0 0 1-3-3V5.5a1.5 1.5 0 0 1 1-1.415zM11.5 2A1.5 1.5 0 0 1 13 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 5 10.5v-7A1.5 1.5 0 0 1 6.5 2h5zm0 1h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5z" fill="currentColor"></path></g></svg>
    </NIcon>
    <div v-html="renderedMarkdown" />
  </div>
</template>

<style lang="scss" scoped>
.copy {
  @apply transition-colors duration-200;

  display: none;
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
}

.highlight-wrapper {
  width: 100%;
  height: 100%;
  overflow: scroll;
  scroll-behavior: smooth;
  background-color: rgb(246 248 250);
  max-height: 60vh;
  padding: 12px;

  &:hover {
    .copy {
      display: block;
    }
  }
}
</style>
