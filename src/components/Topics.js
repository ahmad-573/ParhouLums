import React, {useEffect, useState} from 'react';
import Topic from "./Topic";
import './notestyle.css'
import { Button, IconButton } from '@material-ui/core'
import { apiInvoker } from '../apiInvoker'
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
 

const SAMPLE_TOPICS = [
    {
        topic_id: 1,
        title: 'Topic 1',
    },

    {
        topic_id: 2,
        title: 'Topic 2',
    },

    {
        topic_id: 3,
        title: 'Topic 3',
    },

]

const useStyles = makeStyles((theme) => ({
    nextButton:{
        position: 'absolute',
        // width: '100%',
        // height: '50%',
        top: '47%',
        // bottom: '5%',
        left:'96%',
    },

    prevButton:{
        position: 'absolute',
        top: '55%',
        left: '96%'
    },

  }));


function Topics({ setChanged,groupid, logout, setSnackbarMsg,topics,setRerendertopics, rerendertopics}){    
    //const [topics, setTopics] = useState([])
    const [index, setIndex] = useState(0)
    const [index2, setIndex2] = useState(1)

    const classes = useStyles();
    return(
            <div>
                <div className="min-h-[540px] px-10">
                    {topics.map(topic => {
                        // console.log(flashcard.id)
                        return <Topic setChanged={setChanged} rerendertopics={rerendertopics} setRerendertopics={setRerendertopics} topic = {topic} key = {topic.topic_id} logout={logout} groupid={groupid} setSnackbarMsg={setSnackbarMsg}/>
                    })}
                </div> 
                {/* <Button>Hello</Button>       */}
            </div>
    )
}



// {flashcards.map(flashcard => {

//     return(<div><Note flashcard={flashcard} key={flashcard.id}/></div>)
// })}

export default Topics;