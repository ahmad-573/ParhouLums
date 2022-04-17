import React, {useState, useCallback, useEffect} from 'react';
import FrontSideNote from "./FrontSideNote";
import BackSideNote from "./BackSideNote";
import EditModal from './EditModal';
import { IconButton,Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { apiInvoker } from '../apiInvoker'
import EditTopicModal from './EditTopicModal';
import AddLinkModal from './AddLinkModal';
import './notestyle.css'
import { TrashIcon, MinusIcon, XIcon } from '@heroicons/react/outline'

 
const useStyles = makeStyles((theme) => ({
    iconButton:{
        position: "absolute",
        //top: 0,
        left: '894px',
        width: '50px',
        bottom: '-15px',
        color: 'red',
    },
    arrowDown:{
        position: "relative",
        //top: 0,
        left: '40%',
        width: '5%',
        transform: 'rotate(0deg)',
        transition: 'transform 0.5s linear',
    },
    arrowUp:{
        position: "relative",
        //top: 0,
        left: '40%',
        width: '5%',
        transform: 'rotate(180deg)',
        transition: 'transform 0.5s linear',
    }
  }));
  const style = {
    position: 'relative',
    left: '2px',
    bgcolor: 'background.paper',
    //border: '2px solid #000',
  };

function Link({setDeleted, link, setSnackbarMsg, logout, groupid, topicid}){
    
    const classes = useStyles();

    const onDelClick = async e =>{
        const [data, err] = await apiInvoker('/api/deleteLink', {link_id: link.link_id, topic_id:topicid,group_id: groupid})
        if (data !== undefined) ;
        else if (err === 'Token error') logout()
        else setSnackbarMsg('Error: ' + err)  
        setDeleted(true)        
    };

    return(
        <div className='flex items-center px-8 py-3'>
            <div className='w-[97.5%]'>
                <a href={link.link} className='underline decoration-sky-500 text-sky-500'>{link.title}</a>
            </div>
            <div>
                <button><XIcon onClick={onDelClick} className='w-5 h-5 text-red-400'/></button>
            </div>
            {/* <IconButton 
            color="secondary" 
            aria-label="delete the link"  
            onClick={onDelClick}
            className={classes.iconButton}
            sx={{ fontSize: 20 }} 
            >
                <DeleteOutlineIcon />
            </IconButton> */}
        </div>
    );

}

export default Link; 