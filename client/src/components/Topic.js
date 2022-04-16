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
import Link from './Link'
import './notestyle.css'
import { TrashIcon, PencilIcon, ChevronRightIcon, PlusIcon, PlusCircleIcon } from '@heroicons/react/outline'




const useStyles = makeStyles((theme) => ({
    iconButton:{
        position: "relative",
        //top: 0,
        left: '40%',
        width: '5%',
    },
    arrowDown:{
        position: "relative",
        //top: 0,
        left: '40%',
        width: '5%',
        transform: 'rotate(0deg)',
        transition: 'transform 0.2s linear',
    },
    arrowUp:{
        position: "relative",
        //top: 0,
        left: '40%',
        width: '5%',
        transform: 'rotate(180deg)',
        transition: 'transform 0.2s linear',
    }
  }));
  const style = {
    position: 'relative',
    left: '2px',
    bgcolor: 'background.paper',
    //border: '2px solid #000',
  };

function Topic({topic,groupid,logout, setSnackbarMsg, setRerendertopics, rerendertopics}){
    // console.log(key)
    const classes = useStyles();
    const [opmodal, setOpmodal] = useState(false)
    const handleClose = useCallback(() => setOpmodal(false), [])
    const handleOpen = () => setOpmodal(true)
    const [isDown, setisDown] = useState(true)
    const [links,setLinks] = useState([])
    const [addmodal, setAddmodal] = useState(false)
    const onAddLink = () => setAddmodal(true)
    const onCloseAddModal = useCallback(() => setAddmodal(false), [])
    const [deleted, setDeleted] = useState(false)

    const onDelClick = async e =>{
        const [data, err] = await apiInvoker('/api/deleteTopic', {topic_id:topic.topic_id,group_id: groupid})
        if (data !== undefined) setRerendertopics(rerendertopics+1);
        else if (err === 'Token error') logout()
        else setSnackbarMsg('Error: ' + err)          
    };


    const getLinks = async () =>{
        const [data, err] = await apiInvoker('/api/getLinks', {group_id:groupid, topic_id:topic.topic_id})
        if (data !== undefined) setLinks(data.links)
        else if (err === 'Token error') logout()
        else setSnackbarMsg('Error: ' + err)
    }

    const onArrowClick = async e => {
        if (isDown) {setisDown(false); getLinks()}
        else setisDown(true)
    };


    const toRender = 
        <div className="topic ">
            <EditTopicModal 
            open={opmodal}
            modalClose={handleClose}
            mtitle = {topic.title}
            topic_id = {topic.topic_id} 
            key = {topic.topic_id}
            logout={logout}
            group_id={groupid}
            setSnackbarMsg={setSnackbarMsg}
            setRerendertopics={setRerendertopics}
            rerendertopics={rerendertopics}
            />
            <AddLinkModal 
            open={addmodal}
            modalClose={onCloseAddModal}
            logout={logout}
            groupid={groupid}
            setSnackbarMsg={setSnackbarMsg}
            topicid={topic.topic_id}
            setDeleted={setDeleted}
            />
            {/* <Grid display='flex' flexGrow={1}> */}
                {/* whatever is on the left side */}
            <div className='w-full flex items-center p-4'>
                <div class='w-[85%]'>
                    {topic.title}
                </div>
            {/* </Grid> */}
                {/* whatever is on the right side */}
                <div className='w-[15%] grid grid-cols-4'>
                    <button onClick={onDelClick}><TrashIcon className='w-5 h-5'/></button>
                    <button onClick={handleOpen}><PencilIcon className='w-5 h-5'/></button>
                    <button onClick={onAddLink}><PlusIcon className='w-5 h-5'/></button>
                    <button onClick={onArrowClick}><ChevronRightIcon className='w-5 h-5 rotate-90'/></button>
                </div>
            </div>
        </div>
        ;

    if (deleted){
        getLinks();
        setDeleted(false)
    }

    if (isDown){
        return (<div>{toRender}</div>)
    }
    else{
        return(
            <div>
                {toRender}
                <Paper className='links-wrapper w-full'>
                    {links.map(link => {
                        // console.log(flashcard.id)
                        return (
                            <Link setDeleted={setDeleted} link={link} setSnackbarMsg={setSnackbarMsg} topicid={topic.topic_id} groupid={groupid} logout={logout}/>
                        );
                    })}
                </Paper>
            </div>
        )
    }
}



export default Topic; 