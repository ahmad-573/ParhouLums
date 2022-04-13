import React, {useState} from 'react';
import './notestyle.css'
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';


const useStyles = makeStyles((theme) => ({
    iconButton:{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 2
    }
  }));



function FrontSideNote({title, fflip, fsetFlip}){
    const classes = useStyles();
    return(
        <div class='frontside'>
            {/* <IconButton className = {classes.iconButton} color="secondary" aria-label="flip the card" onClick={() => fsetFlip(!fflip)}>
                <FlipCameraAndroidIcon />
            </IconButton> */}
            {title}
        </div>
    )
}


// return(
//     <div class={`frontside ${fflip ? 'cardflip' : ''}`} onClick={() => fsetFlip(!fflip)}>
//         {title}
//     </div>
// )


export default FrontSideNote; 