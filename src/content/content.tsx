import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Flame, SendHorizontal, ChevronsLeft } from 'lucide-react'
import { ChatBoxProps, ChatMessage } from '@/interfaces'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Markdown from 'react-markdown'
import { Textarea } from '@/components/ui/textarea'
import './style.css'
import { extractCode } from './util'

const sampleMessages: ChatMessage[] = [
  // {
  //   role: 'assistant',
  //   message:
  //     'Hello! I can help you solve this LeetCode problem. What specific aspect would you like help with?',
  //   type: 'text',
  // },
  // {
  //   role: 'user',
  //   message: 'Can you help me understand the time complexity requirements?',
  //   type: 'text',
  // },
  // {
  //   role: 'assistant',
  //   message:
  //     "Let's analyze the time complexity: \n### The optimal solution requires O(n) time complexity\n### We can achieve this using a sliding window approach",
  //   type: 'markdown',
  // },
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
  const [suggestionsArray, setSuggestionsArray] = useState<string[]>([
    'Follow ups',
    'Similar problems',
    'Key concepts',
    'FAQ',
    'Debug my approach and give hints',
    'Give AI generated solution with hints',
  ])

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

    const userCurrentCodeContainer = document.querySelector('.view-lines')
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
          <div className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 p-4 flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setChatboxExpanded(!chatboxExpanded)}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg h-10 w-10 shadow-lg flex-shrink-0 transition-all duration-300"
            >
              <ChevronsLeft
                size={20}
                className={`transition-transform duration-300 ${
                  chatboxExpanded ? 'rotate-180' : ''
                }`}
              />
            </Button>

            <div className="overflow-hidden">
              {context.title && (
                <div className="bg-gradient-to-r from-amber-500/50 to-orange-500/50 px-4 py-2.5 rounded-lg border border-amber-500/50">
                  <h1 className="text-lg font-medium text-amber-100 truncate">
                    {context.title}
                  </h1>
                  <p className="text-xs text-amber-200/70 mt-0.5">
                    Problem Name
                  </p>
                </div>
              )}
            </div>
          </div>

          <div
            ref={chatBoxRef}
            className="flex-1 overflow-auto p-4 space-y-4 scrollbar-thin"
          >
            <div className="flex flex-col gap-6 m-auto mb-8">
              <div className="grid grid-cols-2 gap-4">
                {suggestionsArray.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setValue(suggestion)
                      onSendMessage()
                    }}
                    className="p-4 rounded-xl text-center backdrop-blur-md bg-white/10 hover:bg-white/20 cursor-pointer transition-all border border-white/20 shadow-lg hover:shadow-white/10"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
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
                    <Markdown className="prose prose-invert prose-sm max-w-none markdown">
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
  const title = document
    .querySelector('title')
    ?.innerText.split('-')[0]
    .trim() as string

  return (
    <div className="__chat-container dark">
      {chatboxExpanded && (
        <ChatBox
          context={{ problemStatement, programmingLanguage: 'C++', title }}
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
