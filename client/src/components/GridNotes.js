import React, {useState} from 'react';
import Note from "./Note";
import './notestyle.css'


function GridNotes(){
    return(          
        <div class="grid grid-rows-2 grid-cols-2 gap-2">
              <div><Note/></div>
              <div><Note/></div>
              <div><Note/></div>
              <div><Note/></div>
        </div>
    )
}

export default GridNotes;