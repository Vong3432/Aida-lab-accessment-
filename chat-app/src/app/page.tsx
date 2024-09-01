"use client"

import { TranslateAPIError, ChatAPI } from "app/core/chat/api";
import ChatMessageList from "app/core/chat/ChatMessageList";
import { Language, Message } from "app/core/chat/interface";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuid } from 'uuid'

interface State {
  text: string
  messages: Message[]
  language: Language;
}

export default function Home() {

  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<State>({
    text: "",
    messages: [],
    language: "Chinese"
  })
  const isProcessing = (state.messages.some(message => message.isProcessing))

  useEffect(() => {
    inputRef.current?.focus();
    const handler = setTimeout(() => {
      setInitialBotGreeting();
    }, 800)
    return () => {
      clearTimeout(handler)
    }
  }, [])

  const setInitialBotGreeting = () => {
    setState((prevState) => ({
      ...prevState,
      messages: [{
        id: "Greeting",
        value: "Hello, how can I help you?",
        isBot: true,
        date: new Date(),
        isProcessing: false,
      }]
    }))
  }

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      text: e.target.value
    }))
  }

  const onSubmitted = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isProcessing) {
      return
    }
    submitTranslationRequest()
  }

  const submitTranslationRequest = async () => {
    const { text, language } = state
    const processingMessage = processTranslation(text)
    try {
      const result = await ChatAPI.translate({ message: text, lng: language })
      completeTranslation({ ...processingMessage, value: result })
    } catch (error: any) {
      const translateError = error as TranslateAPIError | undefined
      if (!!translateError) {
        handleTranslationErr(processingMessage, { errMsg: translateError.message })
        return
      }
      handleTranslationErr(processingMessage, { errMsg: "Unexpected error" })
    }
  }

  const processTranslation = (msg: string): Message => {
    const newUserMessage: Message = {
      id: uuid(),
      value: msg,
      isBot: false,
      isProcessing: false,
      date: new Date(),
    }
    const newBotMessage: Message = {
      ...newUserMessage,
      id: uuid(),
      isBot: true,
      isProcessing: true,
    }
    setState((prevState) => ({
      ...prevState,
      text: "",
      messages: [
        ...prevState.messages,
        newUserMessage,
        newBotMessage,
      ]
    }))
    return newBotMessage
  }

  const completeTranslation = (msg: Message) => {
    setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.map((e) => {
        if (e.id === msg.id) {
          return {
            ...msg,
            isProcessing: false,
          }
        }
        return e
      })
    }))
  }

  const handleTranslationErr = (msg: Message, { errMsg }: { errMsg: string }) => {
    setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.map((e) => {
        if (e.id === msg.id) {
          return {
            ...msg,
            isProcessing: false,
            error: errMsg
          }
        }
        return e
      })
    }))
  }

  return (
    <form onSubmit={onSubmitted}>
      <div className="flex flex-col h-screen bg-white py-4">
        <p className="text-xl font-bold text-center">Chat Translation App</p>
        <div className="overflow-y-auto h-full py-4 px-6">
          <ChatMessageList messages={state.messages} />
        </div>
        <div className="mt-auto px-6 sticky bottom-0 py-2 flex items-center">
          <input
            className={`rounded-md bg-gray-100 p-2 w-full ${isProcessing ? "opacity-50 focus:outline-slate-400" : ""}`}
            type="text"
            name="text"
            ref={inputRef}
            value={state.text}
            placeholder={isProcessing ? "Waiting for translation result ..." : "Enter message here ..."}
            onChange={e => onTextChanged(e)}
          />
        </div>
      </div>
    </form>
  );
}
