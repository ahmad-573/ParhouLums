import './chat.css'
import { Divider } from '@material-ui/core';

const TheirMessage = ({ lastMessage, message }) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;



    if(message?.attachments?.length > 0) {
        return (
            <img 
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{ float: 'left' }}
            />
        )
    }
    return (
        <div className="message-row">
            {isFirstMessageByUser && (
                <div 
                    className="message-avatar"
                    style={{backgroundImage: `url(${message?.sender?.avatar})`}}
                />
            )}
            {message?.attachments?.length > 0 ? (
                        <img 
                            src={message.attachments[0].file}
                            alt="message-attachment"
                            className="message-image"
                            style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
                        />
                    ) : (
                        <div className="message" style={{ float: 'left', backgroundColor: '#32C022', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
                        <div className='sender-name'>{message.sender.username}</div>
                        <Divider className={{width: '100%'}}/>
                        {message.text.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "")}
                        </div>
                    )
                }
        </div>
    );
}

export default TheirMessage;