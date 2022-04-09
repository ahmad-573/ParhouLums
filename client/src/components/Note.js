import React, {useState} from 'react';
import FrontSideNote from "./FrontSideNote";
import BackSideNote from "./BackSideNote";
import './notestyle.css'


function Note({flashcard}, {key}){
    const [flip, setFlip] = useState(false)
    return(
        <div class={`note ${flip ? 'cardflip' : ''}`}
            onClick={() => setFlip(!flip)}>
                
        <FrontSideNote title={flashcard.title} fkey = {key}/>
        <BackSideNote description={flashcard.description} bkey = {key}/>
        </div>
    )
}


export default Note; 