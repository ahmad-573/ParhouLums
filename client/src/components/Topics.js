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

    // {
    //     id: 4,
    //     title: 'Topic 4',
    // },
    
    // {
    //     id: 5,
    //     title: 'Topic 5',
    // },

    // {
    //     id: 6,
    //     title: 'Topic 6',
    // },

    // {
    //     id: 7,
    //     title: 'Topic 7'
    // }
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


// function checkFunc(item){
//     let index1 = flashcards.indexOf(item)
//     if(index1 >= index && index1 <= (index + 3)){
//         return true
//     }
//     else{
//         return false
//     }
// }






function Topics({groupid}){    
    const [topics, setTopics] = useState(SAMPLE_TOPICS)
    const [index, setIndex] = useState(0)
    const [index2, setIndex2] = useState(1)


    const getTopics = async () =>{
        const [data, err] = await apiInvoker('/api/getTopics', {group_id:groupid})
        if (data !== undefined) setTopics(data.topics)
        //else alert(err)
    }

    useEffect(() => {
        getTopics();
    });


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
                <div class="wrapper3">
                    {topics.map(topic => {
                        // console.log(flashcard.id)
                        return <Topic topic = {topic} key = {topic.topic_id}/>
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