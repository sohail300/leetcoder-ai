export interface ChatBoxProps {
  programmingLanguage: string
  problemStatement: string
  title: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  message: string
  type: 'text' | 'markdown'
}
