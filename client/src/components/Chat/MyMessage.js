import './chat.css'
import Divider from '@material-ui/core/Divider';

const MyMessage = ({ message }) => {
    if(message?.attachments?.length > 0) {
        return (
            <img 
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{ float: 'right' }}
            />
        )
    }
    return (
        <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#116B0E' }}>
            <div className='sender-name'>{message.sender.username}</div>
            <Divider className={{width: '100%'}}/>
            {message.text.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "")}
        </div>
    );
}

export default MyMessage;