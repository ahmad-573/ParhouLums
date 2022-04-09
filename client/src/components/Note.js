import React, {useState} from 'react';
import FrontSideNote from "./FrontSideNote";
import BackSideNote from "./BackSideNote";
import './notestyle.css'


function Note(){
    const [flip, setFlip] = useState(false)
    return(
        <div class={`note ${flip ? 'cardflip' : ''}`}
            onClick={() => setFlip(!flip)}>
        <FrontSideNote/>
        <BackSideNote/>
        </div>
    )
}


export default Note; 