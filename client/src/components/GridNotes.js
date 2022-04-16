import React, {useEffect, useState} from 'react';
import Note from "./Note";
import './notestyle.css'
import { Button, IconButton } from '@material-ui/core'
import { apiInvoker } from '../apiInvoker'
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


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

const useStyles = makeStyles((theme) => ({
    nextButton:{
        // position: 'absolute',

        // width: '100%',
        // height: '50%',
        // top: '47%',

        // bottom: '5%',
        // left:'96%',

        backgroundColor: 'green',
    },

    prevButton:{
        position: 'absolute',
        top: '55%',
        left: '96%'
    },

  }));


// function checkFunc(item){
//     let index1 = flashcards.indexOf(item)
//     if(index1 >= index && index1 <= (index + 3)){
//         return true
//     }
//     else{
//         return false
//     }
// }






function GridNotes({setSnackbarMsg, group, logout}){ 
    const [flashcards, setFlashCards] = useState([])
    const [index, setIndex] = useState(0)
    const [index2, setIndex2] = useState(1)
    const [time,setTime] = useState(0)


    function generateTime() {
        return(
            new Promise((resolve,reject) => {
                setTimeout(resolve,2000);
            }).then(() => {
                if (time%2) setTime(time + 1)
                else setTime(time - 1)
            })
        );
        
    }

    const getCards = () =>{
        apiInvoker('/api/getCards', {group_id:group.group_id}).then(([data, err]) => {
            if (err === undefined) {
                console.log("here")
                setFlashCards(data.cards) 
            } else if (err === 'Token error'){
              logout()
            }
            else{
              setSnackbarMsg('Error: ' + err)
            }
            generateTime();
          })
    }

    useEffect(() => {
        getCards();
    }, [time]);


    // return(  
    //     <div>
    //         <div class="grid grid-rows-2 grid-cols-2 gap-2">
    //             <div><Note flashcard = {flashcards[index]}/></div>
    //             <div><Note flashcard = {flashcards[index + 1]}/></div>
    //         </div>

    //         
    //     </div>        
    // )
    const classes = useStyles();
    return(
            <div>
                {/* <div className='wrapper'></div> */}
                <div className="grid grid-cols-1 gap-8 pt-5 pl-8 pr-8 pb-4 lg:grid-cols-2">
                    {flashcards.map(flashcard => {
                        // console.log(flashcard.id)
                        let index1 = flashcards.indexOf(flashcard) 
                        if(index1 >= index && index1 <= (index + 3)){
                            // console.log(flashcard.id)
                            return <div className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:duration-300'><Note 
                                        flashcard={flashcard} 
                                        key={flashcard.id}
                                        group={group}
                                        setSnackbarMsg={setSnackbarMsg}
                                    /></div>
                        }
                    })}
                </div>
                <div className='grid grid-cols-2'>
                    <IconButton disabled = {index == 0} onClick = {e => {setIndex(index - 4); setIndex2(index2 - 1)}}><NavigateBeforeIcon/></IconButton> 
                    <IconButton disabled = {(index2*4) >= flashcards.length} onClick = {e => {setIndex(index + 4); setIndex2(index2 + 1)}}><NavigateNextIcon/></IconButton>
                </div>
                {/* <Button>Hello</Button>       */}
                {/* className={classes.prevButton} */}
            </div>
    )
}



// {flashcards.map(flashcard => {

//     return(<div><Note flashcard={flashcard} key={flashcard.id}/></div>)
// })}

export default GridNotes;