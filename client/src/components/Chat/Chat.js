import React from 'react'
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed';
import './chat.css'

function Chat({username, group, setSnackbarMsg, setCurrchat, setMychats, mychats}) {
  return (
    <ChatEngine 
            height="90vh"
            projectID= '984bd544-267a-4407-a75e-a55ecb80c946'//{process.env.CHAT_PROJECT_ID}
            userName={username}
            userSecret='genericPassword'//{process.env.CHAT_USER_PASSWORD}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} mychats={mychats} setMychats={setMychats} setCurrchat={setCurrchat} group_name={group.name} setSnackbarMsg={setSnackbarMsg} username={username} />}
            renderChatList={(chatAppState) => {}}
            renderChatSettings={(chatAppState) => {}}
        />
  )
}

export default Chat