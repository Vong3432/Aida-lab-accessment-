import { Key } from "react"

export type Language = "Chinese"

export interface Message {
    id: Key
    value: string
    isBot: boolean
    date: Date
    isProcessing: boolean
    error?: string
}