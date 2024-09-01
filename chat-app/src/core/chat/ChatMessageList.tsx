import React from 'react'
import { Message } from './interface'
import ChatMessage from './ChatMessage'

export default function ChatMessageList({ messages }: { messages: Message[] }) {

  const classNames = {
    bot: "mb-4 items-start",
    user: "mb-4 items-end"
  }

  return (
    <div>
      {!!messages.length && messages.map(message =>
        <ChatMessage
          key={message.id}
          message={message}
          className={message.isBot ? classNames['bot'] : classNames['user']}
        />
      )}
    </div>
  )
}
