import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Flame, SendHorizontal, ChevronsLeft } from 'lucide-react'
import { ChatBoxProps, ChatMessage } from '@/interfaces'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Markdown from 'react-markdown'
import { Textarea } from '@/components/ui/textarea'
import './style.css'

const sampleMessages: ChatMessage[] = [
  {
    role: 'assistant',
    message:
      'Hello! I can help you solve this LeetCode problem. What specific aspect would you like help with?',
    type: 'text',
  },
  {
    role: 'user',
    message: 'Can you help me understand the time complexity requirements?',
    type: 'text',
  },
  {
    role: 'assistant',
    message:
      "Let's analyze the time complexity:\n\n```python\n# The optimal solution requires O(n) time complexity\n# We can achieve this using a sliding window approach\n```",
    type: 'markdown',
  },
]

const ChatBox = ({
  context,
  chatboxExpanded,
  setChatboxExpanded,
}: {
  context: ChatBoxProps
  chatboxExpanded: boolean
  setChatboxExpanded: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [value, setValue] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(sampleMessages)
  const chatBoxRef = useRef<HTMLDivElement>(null)

  const handleGenerateAIResponse = async () => {
    // Use gemini key, if required

    // const openAIAPIKey = (await chrome.storage.local.get('apiKey')) as {
    //   apiKey?: string
    // }
    // if (!openAIAPIKey.apiKey) return alert('OpenAI API Key is required')
    // const openai = createOpenAISDK(openAIAPIKey.apiKey)

    const geminiKey = 'AIzaSyAG-bnMAIrfSS9-6xKJG027Ag-tG6XbplQ'
    console.log('geminiKey', geminiKey)

    const userMessage = value
    console.log('userMessage', userMessage)

    const userCurrentCodeContainer = document.querySelector('.view-line')
    console.log('userCurrentCodeContainer', userCurrentCodeContainer)

    const extractedCode = extractCode(userCurrentCodeContainer?.innerHTML ?? '')
    console.log('extractedCode', extractedCode)

    // const systemPromptModified = SYSTEM_PROMPT.replace(
    //   '{{problem_statement}}',
    //   context.problemStatement
    // )
    //   .replace('{{programming_language}}', context.programmingLanguage)
    //   .replace('{{user_code}}', extractedCode)

    // const apiResponse = await openai.chat.completions.create({
    //   model: 'chatgpt-4o-latest',
    //   response_format: { type: 'json_object' },
    //   messages: [
    //     { role: 'system', content: systemPromptModified },
    //     ...chatHistory.map(
    //       (chat) =>
    //         ({
    //           role: chat.role,
    //           content: chat.message,
    //         }) as ChatCompletionMessageParam
    //     ),
    //     { role: 'user', content: userMessage },
    //   ],
    // })

    // if (apiResponse.choices[0].message.content) {
    //   const result = JSON.parse(apiResponse.choices[0].message.content)
    //   if ('output' in result) {
    //     setChatHistory((prev) => [
    //       ...prev,
    //       { message: result.output, role: 'user', type: 'markdown' },
    //     ])
    //     chatBoxRef.current?.scrollIntoView({ behavior: 'smooth' })
    //   }
    // }
  }

  const onSendMessage = () => {
    if (!value.trim()) return

    setChatHistory((prev) => [
      ...prev,
      { role: 'user', message: value, type: 'text' },
    ])
    setValue('')
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: 'smooth',
    })
    handleGenerateAIResponse()
  }

  return (
    <div
      className={`fixed right-0 top-0 h-screen transition-transform duration-300 ease-in-out ${chatboxExpanded ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="relative flex h-full">
        <div className="w-[600px] bg-gray-900 shadow-2xl flex flex-col">
          <div className="p-4 border-b border-gray-800 flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => setChatboxExpanded(!chatboxExpanded)}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg h-12 w-12 shadow-lg z-10"
            >
              <ChevronsLeft
                size={24}
                className={`transition-transform duration-300 rotate-180 z-0`}
              />
            </Button>
          </div>

          <div
            ref={chatBoxRef}
            className="flex-1 overflow-auto p-4 space-y-4 scrollbar-thin"
          >
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      message.role === 'user'
                        ? 'https://github.com/shadcn.png'
                        : 'https://github.com/shadcn.png'
                    }
                  />
                  <AvatarFallback>
                    {message.role === 'user' ? 'U' : 'AI'}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  {message.type === 'markdown' ? (
                    <Markdown className="prose prose-invert prose-sm max-w-none">
                      {message.message}
                    </Markdown>
                  ) : (
                    <p className="text-sm">{message.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <Textarea
                cols={3}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSendMessage()
                }}
                className="flex-1 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                placeholder="Type your message..."
              />
              <Button
                size="icon"
                onClick={onSendMessage}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContentPage: React.FC = () => {
  const [chatboxExpanded, setChatboxExpanded] = useState<boolean>(false)
  const metaDescriptionEl = document.querySelector('meta[name=description]')
  const problemStatement = metaDescriptionEl?.getAttribute('content') as string

  return (
    <div className="__chat-container dark">
      {chatboxExpanded && (
        <ChatBox
          context={{ problemStatement, programmingLanguage: 'C++' }}
          setChatboxExpanded={setChatboxExpanded}
          chatboxExpanded={chatboxExpanded}
        />
      )}
      <div className="flex justify-end">
        <Button onClick={() => setChatboxExpanded(!chatboxExpanded)}>
          <Flame color="orange" fill="orange" />
          Ask AI
        </Button>
      </div>
    </div>
  )
}

export default ContentPage
