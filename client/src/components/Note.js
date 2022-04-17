import React, {useState, useCallback} from 'react';
import FrontSideNote from "./FrontSideNote";
import BackSideNote from "./BackSideNote";
import EditModal from './EditModal';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { apiInvoker } from '../apiInvoker'
import './notestyle.css'



const useStyles = makeStyles((theme) => ({
    iconButton:{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 2
    },

    initialStyle: {

    }
  }));

function Note({flashcard, group, setSnackbarMsg, logout}){
    // console.log(key)
    // const classes = useStyles();
    const [flip, setFlip] = useState(false)
    const [opmodal, setOpmodal] = useState(false)
    const handleClose = useCallback(() => setOpmodal(false), [])
    const handleOpen = () => setOpmodal(true)
    const [click, setClick] = useState(true)
    const [shtyle, setShtyle] = useState('frontside w-full h-full grid place-items-center pb-20')

    const changeStyle = (x) => {
        setFlip(x)
        if (click) {setClick(false); setShtyle('hidden')}
        else {setClick(true); setShtyle('frontside w-full h-full grid place-items-center pb-20')}
    }

    const onDelClick = () => {
        apiInvoker('/api/deleteCard', {card_id:flashcard.id, group_id:group.group_id}).then(([data, err]) => {
            if (err === undefined) {
                // 
            } else if (err === 'Token error'){
              logout()
            }
            else{
              setSnackbarMsg('Error: ' + err)
            }
          })            
    };

    return(
        <>
        <div className= {`note`}>
            <EditModal 
                open={opmodal}
                modalClose={handleClose}
                mtitle = {flashcard.title}
                mdescription = {flashcard.description}
                card_id = {flashcard.id}
                group={group}
                key = {flashcard.id}
                setSnackbarMsg={setSnackbarMsg}
                logout={logout}
            />
            <IconButton 
                color="secondary" 
                aria-label="flip the card" 
                onClick={() => changeStyle(!flip)}
                // setFlip(!flip)
            >
                <FlipCameraAndroidIcon />
            </IconButton> 

            <IconButton 
                color="secondary" 
                aria-label="edit the card"  
                onClick={handleOpen}
            >
                <EditIcon />
            </IconButton>

            <IconButton 
                color="secondary" 
                aria-label="delete the card"  
                onClick={onDelClick}
            >
                <DeleteOutlineIcon />
            </IconButton>
            <div className= {`innernote h-full  ${flip ? 'cardflip' : ''}`} >
                <div className={shtyle}>{flashcard.title}</div>
                <div className='backside w-full h-full grid place-items-center pb-20'>{flashcard.description}</div>
            </div>
            
            {/* <FrontSideNote title={flashcard.title} fflip = {flip} fsetFlip = {setFlip} key = {flashcard.id}/>
            <BackSideNote description={flashcard.description} bflip = {flip} bsetFlip = {setFlip} key = {flashcard.id}/> */}
        </div>
        </>
    )
}



export default Note; 