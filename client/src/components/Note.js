import React, {useState} from 'react';
import FrontSideNote from "./FrontSideNote";
import BackSideNote from "./BackSideNote";
import EditModal from './EditModal';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import EditIcon from '@material-ui/icons/Edit';
import './notestyle.css'



const useStyles = makeStyles((theme) => ({
    iconButton:{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 2
    }
  }));

function Note({flashcard}){
    // console.log(key)
    // const classes = useStyles();
    const [flip, setFlip] = useState(false)
    const [opmodal, setOpmodal] = useState(false)
    return(
        <div class= {`note ${flip ? 'cardflip' : ''}`}>
        
        <IconButton color="secondary" aria-label="flip the card" onClick={() => setFlip(!flip)}>
            <FlipCameraAndroidIcon />
        </IconButton> 

        <IconButton 
            color="secondary" 
            aria-label="edit the card"  
            onClick={() => {console.log(opmodal, 'before'); setOpmodal(true); console.log(opmodal, 'after')}}
        >
            <EditIcon />
        </IconButton>

        <FrontSideNote title={flashcard.title} fflip = {flip} fsetFlip = {setFlip} key = {flashcard.id}/>
        {/* <BackSideNote description={flashcard.description} bflip = {flip} bsetFlip = {setFlip} key = {flashcard.id}/> */}
        <EditModal opmodal={opmodal} setOpmodal = {setOpmodal} key = {flashcard.id}/>
        </div>
    )
}



export default Note; 