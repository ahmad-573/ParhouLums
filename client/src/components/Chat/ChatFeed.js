import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import './chat.css'
import axios from 'axios'
import { useEffect, useState } from "react";


const ChatFeed = (props) => {
    const [isset, setIsset] = useState(false);
    console.log(isset);
    const { chats, activeChat, userName, setActiveChat, messages, setMessages } = props;
    let chat = null
    if (chats) {
        for (let [key,value] of Object.entries(chats)){
            if (value.title.toString().slice(0,-5) == props.group_name){
                setActiveChat(key)
                break;
            }
        }
    }
    chat = chats && chats[activeChat]
    if (chat && !isset) {
        axios.get(`https://api.chatengine.io/chats/${activeChat}/messages/`, { 'headers': {'Project-ID': '984bd544-267a-4407-a75e-a55ecb80c946', 'User-Name': props.userName, 'User-secret': 'genericPassword'} }).then((messages) => {setMessages(messages.data); setIsset(true)}).catch((error) => console.log(error))
    }
    else{
       // setTimeout(() => setMessages({}), 5000);
    }

    //const chat = chats && chats[activeChat];

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && ( 
           <div 
                key = {`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`,
                }}
                
           ></div> 
        ))
    }

    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const isMyMessage = userName === message.sender.username;

            return (
                <div key = {`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {
                            isMyMessage ? <MyMessage message={message}/> : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '120px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            );
        })
        
    }
    //renderMessages();
    if(!chat || !isset) return 'Loading...';

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat ?.title}</div>
                <div className="chat-subtitle">{chat.people.map((person) => `${person.person.username} `)}</div>

            </div>
            {renderMessages()}
            <div style={{ height: '100px' }} />
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat}/>
            </div>
        </div>
    );
}

export default ChatFeed;