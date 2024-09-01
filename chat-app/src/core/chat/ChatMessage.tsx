import React from 'react'
import { Message } from './interface'

interface Props extends React.HTMLProps<Props> {
  message: Message
}

export default function ChatMessage({ message, className }: Props) {
  return (
    <div className={`${className} flex flex-col space-y-2`}>
      {message.isProcessing
        ? <MessageSkeleton />
        : <MessageContent message={message} />
      }
    </div>
  )
}

const MessageSkeleton: React.FC = () => {
  return (
    <div className='bg-slate-100 animate-pulse h-12 rounded-xl w-3/6 flex justify-start px-4 items-center'>
      <p className='text-slate-400 italic text-sm mr-auto'>Processing</p>
      {[1, 2, 3].map(i => (
        <span key={i} className="relative flex h-[6px] w-[6px] mx-1">
          <span className={`animate-pulse absolute inline-flex h-full w-full rounded-full bg-slate-300 opacity-85`}></span>
        </span>
      ))}

    </div>
  )
}

const MessageContent: React.FC<Props> = ({ message }: { message: Message }) => {
  return (
    <>
      <div className={`${message.isBot ? "bg-slate-100" : "bg-cyan-200 text-cyan-950"} ${!!message.error ? "border-2 border-red-500 text-red-900" : ""} py-2 px-4 rounded-xl`}>
        <p>{!!message.error ? message.error : message.value}</p>
      </div>
      <p className="text-xs text-gray-400">{message.date.toTimeString()}</p>
    </>
  )
}