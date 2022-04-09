import React, {useState} from 'react';
import Note from "./Note";
import './notestyle.css'
import { Button } from '@material-ui/core'

const SAMPLE_FLASHCARDS = [
    {
        id: 1,
        title: 'Flashcard 1',
        description: 'Description 1'
    },

    {
        id: 2,
        title: 'Flashcard 2',
        description: 'Description 2'
    },

    {
        id: 3,
        title: 'Flashcard 3',
        description: 'Description 3'
    },

    {
        id: 4,
        title: 'Flashcard 4',
        description: 'Description 4'
    },
    
    {
        id: 5,
        title: 'Flashcard 5',
        description: 'Description 5'
    },

    {
        id: 6,
        title: 'Flashcard 6',
        description: 'Description 6'
    },

    {
        id: 7,
        title: 'Flashcard 7',
        description: 'Description 7'
    }
]





// function checkFunc(item){
//     let index1 = flashcards.indexOf(item)
//     if(index1 >= index && index1 <= (index + 3)){
//         return true
//     }
//     else{
//         return false
//     }
// }



function GridNotes(){    
    const [flashcards, setFlashCards] = useState(SAMPLE_FLASHCARDS)
    const [index, setIndex] = useState(0)
    const [index2, setIndex2] = useState(1)
    // return(  
    //     <div>
    //         <div class="grid grid-rows-2 grid-cols-2 gap-2">
    //             <div><Note flashcard = {flashcards[index]}/></div>
    //             <div><Note flashcard = {flashcards[index + 1]}/></div>
    //         </div>

    //         <Button variant = "outlined" onClick = {e => setIndex(index + 1)}> Next</Button>
    //         <Button variant = "outlined" onClick = {e => setIndex(index - 1)}> Previous</Button>    
    //     </div>        
    // )
    return(
        <div>
            <div class="grid grid-rows-2 grid-cols-2 gap-2">
                {flashcards.map(flashcard => {
                    let index1 = flashcards.indexOf(flashcard) 
                    if(index1 >= index && index1 <= (index + 3)){
                        return <Note flashcard = {flashcard} key = {flashcard.id}/>
                    }
                })}
            </div>
            <Button variant = "outlined" disabled = {(index2*4) >= flashcards.length} onClick = {e => {setIndex(index + 4); setIndex2(index2 + 1)}}> Next</Button>
            <Button variant = "outlined" disabled = {index == 0} onClick = {e => {setIndex(index - 4); setIndex2(index2 - 1)}}> Previous</Button>
        </div>
    )
}


// {flashcards.map(flashcard => {

//     return(<div><Note flashcard={flashcard} key={flashcard.id}/></div>)
// })}

export default GridNotes;