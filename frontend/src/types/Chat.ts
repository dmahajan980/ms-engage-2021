export interface ChatMessage {
  sentBy: string;
  value: string;
  time: number;
}

export interface Chat {
  name: string;
  otherUserId: string;
  chatroomId: string;
  lastMessage?: ChatMessage;
}
