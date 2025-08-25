import { marked } from 'marked'

/**
 * 在栈里找到最近的父节点（比当前 heading.level 小的那个）
 */
function findParent(stack: { id: number; level: number }[], level: number) {
  while (stack.length && stack[stack.length - 1].level >= level) {
    stack.pop()
  }
  return stack[stack.length - 1]
}

/**
 * 解析 markdown 字符串
 * @param md markdown 字符串
 * @returns 解析后的节点数组
 */
export const useParseMarkdown = (md: string): MarkdownNode[] => {
  const tokens = marked.lexer(md)
  // console.info(tokens)

  const result: MarkdownNode[] = []
  const stack: { id: number; level: number }[] = [{ id: 0, level: 0 }] // 根节点
  let currentId = 0
  let current: MarkdownNode | null = null

  for (const token of tokens) {
    if (token.type === 'heading') {
      currentId++
      const parent = findParent(stack, token.depth)

      const newNode: MarkdownNode = {
        id: currentId,
        parentId: parent?.id || null,
        title: (token.text as string).replace(/<[^>]+>|\*/g, ''), // 去除 HTML 标签和 *
        level: token.depth,
        content: '',
      }

      result.push(newNode)

      // 更新栈
      stack.push({ id: currentId, level: token.depth })
      current = newNode
    } else {
      if (current) {
        const raw = token.raw?.trim()
        if (raw) {
          current.content += (current.content ? '\n\n' : '') + raw
        }
      }
    }
  }

  // console.info(result)
  return result
}
