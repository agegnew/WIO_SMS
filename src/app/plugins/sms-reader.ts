// This file demonstrates how you would implement the native SMS reading functionality
// In a real implementation, this would be a Capacitor plugin

import { registerPlugin } from '@capacitor/core'

export interface SmsInboxReaderPlugin {
  checkPermissions(): Promise<PermissionStatus>
  requestPermissions(): Promise<PermissionStatus>
  getCount(options: { filter?: SMSFilter }): Promise<{ count: number }>
  getSMSList(options: { projection?: Projection; filter?: SMSFilter }): Promise<{ smsList: SMSObject[] }>
}

export interface PermissionStatus {
  sms: PermissionState
}

export interface SMSFilter {
  type?: MessageType
  id?: number
  threadId?: number
  body?: string
  bodyRegex?: string
  address?: string
  addressRegex?: string
  minDate?: number
  maxDate?: number
  indexFrom?: number
  maxCount?: number
}

export interface SMSObject {
  id: number
  threadId: number
  type: MessageType
  address: string
  creator: string
  person: string
  date: number
  dateSent: number
  subject: string
  body: string
}

export interface Projection {
  id?: boolean
  threadId?: boolean
  type?: boolean
  address?: boolean
  creator?: boolean
  person?: boolean
  date?: boolean
  dateSent?: boolean
  subject?: boolean
  body?: boolean
}

export enum MessageType {
  ALL = 0,
  INBOX = 1,
  SENT = 2,
  DRAFT = 3,
  OUTBOX = 4,
  FAILED = 5,
  QUEUED = 6
}

export type PermissionState = 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'

const SmsInboxReader = registerPlugin<SmsInboxReaderPlugin>('SmsInboxReader')

export default SmsInboxReader
