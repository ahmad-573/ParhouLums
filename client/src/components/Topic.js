import React, {useState, useCallback} from 'react';
import FrontSideNote from "./FrontSideNote";
import BackSideNote from "./BackSideNote";
import EditModal from './EditModal';
import { IconButton,Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { apiInvoker } from '../apiInvoker'
import EditTopicModal from './EditTopicModal';
import './notestyle.css'



const useStyles = makeStyles((theme) => ({
    iconButton:{
        position: "relative",
        //top: 0,
        left: '40%',
        width: '5%',
    }
  }));
  const style = {
    position: 'relative',
    left: '2px',
    bgcolor: 'background.paper',
    //border: '2px solid #000',
  };

function Topic({topic,groupid,logout, setSnackbarMsg}){
    // console.log(key)
    const classes = useStyles();
    const [opmodal, setOpmodal] = useState(false)
    const handleClose = useCallback(() => setOpmodal(false), [])
    const handleOpen = () => setOpmodal(true)

    const onDelClick = async e =>{
        const [data, err] = await apiInvoker('/api/deleteTopic', {topic_id:topic.topic_id,group_id: groupid})
        if (data !== undefined) ;
        else if (err === 'Token error') logout()
        else setSnackbarMsg('Error: ' + err)          
    };

    return(
        <div class="topic">
            <EditTopicModal 
            open={opmodal}
            modalClose={handleClose}
            mtitle = {topic.title}
            topic_id = {topic.topic_id} 
            key = {topic.topic_id}
            logout={logout}
            group_id={groupid}
            setSnackbarMsg={setSnackbarMsg}
            />
            <Grid display='flex' flexGrow={1}>
                {/* whatever is on the left side */}
                <div class='topic-content'>
                    {topic.title}
                </div>

            </Grid>
                {/* whatever is on the right side */}
                <IconButton 
                color="secondary" 
                aria-label="edit the card"  
                className={classes.iconButton}
                >
                    <ArrowDropDownCircleIcon />
                </IconButton>

                <IconButton 
                color="secondary" 
                aria-label="edit the card"  
                className={classes.iconButton}
                >
                    <AddCircleIcon />
                </IconButton>

                <IconButton 
                color="secondary" 
                aria-label="edit the card"  
                onClick={handleOpen}
                className={classes.iconButton}
                >
                    <EditIcon />
                </IconButton>

                <IconButton 
                color="secondary" 
                aria-label="delete the card"  
                onClick={onDelClick}
                className={classes.iconButton}
                >
                    <DeleteOutlineIcon />
                </IconButton>


        </div>
    )
}



export default Topic; 