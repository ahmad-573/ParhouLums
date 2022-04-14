import React from 'react'
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed';
import './chat.css'

function Chat({username, group}) {
  return (
    <ChatEngine 
            height="90vh"
            projectID="984bd544-267a-4407-a75e-a55ecb80c946"
            userName={username}
            userSecret={'genericPassword'}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            renderChatList={(chatAppState) => {}}
            renderChatSettings={(chatAppState) => {}}
        />
  )
}

export default Chat