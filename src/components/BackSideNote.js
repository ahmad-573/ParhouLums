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
        zIndex: 2,
        // justifyContent: "flex-start",
        // alignItems: "flex-start"
    }
  }));

function BackSideNote({description, bflip, bsetFlip}){
    const classes = useStyles();
    return(
        <div class='backside'>
             {/* <IconButton className = {classes.iconButton} color="secondary" aria-label="flip the card" onClick={() => bsetFlip(!bflip)}>
                <FlipCameraAndroidIcon />
            </IconButton> */}
            {description}
        </div>
        
    )
}

// return(
//     <div class={`backside ${bflip ? 'cardflip' : ''}`} onClick={() => bsetFlip(!bflip)}>
//         {description}
//     </div>
// )

export default BackSideNote;