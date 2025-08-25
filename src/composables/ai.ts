import { createDeepSeek } from '@ai-sdk/deepseek'

import { generateText } from 'ai'

export const useDeepSeek = async (key: string, question: string, content: string): Promise<string> => {
  const deepseek = createDeepSeek({ apiKey: key, baseURL: 'https://api.deepseek.com' })
  const { text } = await generateText({
    model: deepseek('deepseek-chat'),
    prompt: `参考文件内容: \n${content}\n\n问题: ${question}\n\n参数表中<span class="extend $1">$2</span>指的是: $2参数结构是以<!-- div:extend-table $1-table -->开头并且以<!-- extend:end -->结尾的表格内容`,
  })
  console.info(question, content)
  return text
}
