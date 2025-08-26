import { createDeepSeek } from '@ai-sdk/deepseek'

import { generateText } from 'ai'

export const useDeepSeek = async (key: string, prompt: string): Promise<string> => {
  const deepseek = createDeepSeek({ apiKey: key, baseURL: 'https://api.deepseek.com' })
  const { text } = await generateText({
    model: deepseek('deepseek-chat'),
    prompt,
  })
  return text
}
