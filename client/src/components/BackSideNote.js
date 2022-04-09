import React, {useState} from 'react';
import './notestyle.css'

function BackSideNote({description}){
    return(
        <div class="backside">
            {description}
        </div>
    )
}

export default BackSideNote;