import React, {useState} from 'react';
import FrontSideNote from "./FrontSideNote";
import BackSideNote from "./BackSideNote";
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

function Note({flashcard}, {key}){
    // const classes = useStyles();
    const [flip, setFlip] = useState(false)
    return(
        <div class= {`note ${flip ? 'cardflip' : ''}`}>
        
        <IconButton color="secondary" aria-label="flip the card" onClick={() => setFlip(!flip)}>
            <FlipCameraAndroidIcon />
        </IconButton> 

        <IconButton color="secondary" aria-label="edit the card"  onClick={() => setFlip(!flip)}>
            <EditIcon />
        </IconButton>

        <FrontSideNote title={flashcard.title} fflip = {flip} fsetFlip = {setFlip} fkey = {key}/>
        <BackSideNote description={flashcard.description} bflip = {flip} bsetFlip = {setFlip} bkey = {key}/>
        </div>
    )
}



export default Note; 