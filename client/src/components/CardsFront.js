import React, {useState, useCallback} from 'react';
import { Typography, Modal, Button, Box, TextField, IconButton, Card } from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { apiInvoker } from '../apiInvoker'
import Divider from '@material-ui/core/Divider';
import Note from "./Note";
import './notestyle.css'
import GridNotes from './GridNotes';
import CreateModal from './CreateModal';
import NavBar from './NavBar';
import { PlusIcon } from '@heroicons/react/outline'


const useStyles = makeStyles((theme) => ({
  
    mainBox:{
        position: 'absolute',
        right: '0px',
        top: '0px',
        bottom: '0px',
        width: '80%',
        height: '100%',
        backgroundColor: theme.primary,
        textAlign: 'center',
    },
    subBox:{
        position: 'relative',
        // width: '100%',
        // height: '100%',   
        // top: '13%',
        // bottom: '100px',
        // right: '4.5%',
        // left: '3%',
        backgroundColor: theme.primary,
        border: '1px solid #d3d3d3',
        borderRadius: '20px',
        // display: 'flex',
        // justifyContent: 'center'
    },

    topo1:{
        position: 'absolute',
        fontFamily: 'Helvetica Bold, sans-serif',
        fontStyle: 'normal',
        fontWeight: '900',
        fontSize: '22px',
        lineHeight: '30px',
        left: '1%',
        right: '0%',
        top: '4%',
        bottom: '92%',
        // alignItems: 'center',
        width: '100%',
        height: '8%',
        // textAlign: 'center'
        // border: '1px solid #000'
    },

    addicon:{
        width: '1.7%',
        height: '28.5%',
        left: '40%',
        right: '1%',
        bottom: '12.5%',
    },

    line:{
        width: '100%'
    },
  }));

function CardsFront({username, setGroup, setSnackbarMsg, groups, setGroups, group, logout}){
    const classes = useStyles();
    const [opmodal, setOpmodal] = useState(false)
    const handleClose = useCallback(() => setOpmodal(false), [])
    const handleOpen = () => setOpmodal(true)
    return(
        <div className='flex h-full w-full px-8 '>
        {/* <Card className={classes.mainBox}> */}
            {/* <NavBar/> */}
            <div className='bg-white rounded-lg border ring-1 ring-[#1d1c1d] ring-opacity-10 grid grid-cols-1 m-auto w-full'>
            {/* <Card className={classes.subBox}> */}
                <div>
                    <div className='grid grid-cols-10 content-center mt-3 border-b-2'>
                        <div className='col-span-9 ml-8 text-[22px] mb-3 font-medium w-[100%] font-sans text-gray-900'>
                            Flashcards
                        </div>
                        <div className='w-[100%]'>
                            <button onClick={handleOpen}><PlusIcon className='w-5 h-5 mt-1 inline-block align-middle'/></button>
                            
                            <CreateModal
                                open={opmodal}
                                modalClose={handleClose}
                                group={group}
                                logout={logout}
                            />
                        </div>
                    </div>
                    {/* <Divider className={classes.line}/> */}
                {/* </Typography> */}
                
                <GridNotes
                    setSnackbarMsg={setSnackbarMsg}
                    group={group}
                    logout={logout}
                />
            </div>
            </div>
        {/* </Card> */}
        </div>
    )
}

export default CardsFront