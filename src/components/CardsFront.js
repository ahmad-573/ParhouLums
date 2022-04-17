<<<<<<< HEAD
import React, {useState, useCallback, useEffect} from 'react';
=======
import React, {useState, useCallback} from 'react';
>>>>>>> 2fef839a183679f3b5ef31e34a5ee06c084076d3
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
<<<<<<< HEAD
import { PlusIcon } from '@heroicons/react/outline'

=======
>>>>>>> 2fef839a183679f3b5ef31e34a5ee06c084076d3

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
<<<<<<< HEAD
        position: 'relative',
        // width: '100%',
        // height: '100%',   
        // top: '13%',
        // bottom: '100px',
        // right: '4.5%',
        // left: '3%',
=======
        position: 'absolute',
        width: '96%',
        height: '85%',   
        top: '13%',
        bottom: '100px',
        right: '4.5%',
        left: '3%',
>>>>>>> 2fef839a183679f3b5ef31e34a5ee06c084076d3
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
<<<<<<< HEAD

    const [flashcards, setFlashCards] = useState([])
    const [changed, setChanged] = useState(false)
    const [time, setTime ] = useState(0)


    function generateTime() {
        return(
            new Promise((resolve,reject) => {
                setTimeout(resolve,6000);
            }).then(() => {
                if (time%2) setTime(time + 1)
                else setTime(time - 1)
            })
        );
        
    }

    const getCards = () =>{
        apiInvoker('/api/getCards', {group_id:group.group_id}).then(([data, err]) => {
            if (err === undefined) {
                console.log("here")
                setFlashCards(data.cards) 
            } else if (err === 'Token error'){
              logout()
            }
            else{
              setSnackbarMsg('Error: ' + err)
            }
            generateTime();
          })
    }

    useEffect(() => {
        getCards();
    }, [time]);

    if (changed){
        getCards();
        setChanged(false);
    }

=======
>>>>>>> 2fef839a183679f3b5ef31e34a5ee06c084076d3
    const classes = useStyles();
    const [opmodal, setOpmodal] = useState(false)
    const handleClose = useCallback(() => setOpmodal(false), [])
    const handleOpen = () => setOpmodal(true)
    return(
<<<<<<< HEAD
        <div className='flex h-full w-full px-8'>
            <div className='bg-white rounded-lg border ring-1 ring-[#1d1c1d] ring-opacity-10 grid grid-cols-1 m-auto w-full'>
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
                                setChanged={setChanged}
                            />
                        </div>
                    </div>
                
=======
        <Card className={classes.mainBox}>
            {/* <NavBar/> */}
            <CreateModal
                open={opmodal}
                modalClose={handleClose}
                group={group}
                logout={logout}
            />
            <Card className={classes.subBox}>
                <Typography className={classes.topo1}>
                    Flashcards
                    <IconButton 
                        className={classes.addicon}
                        aria-label="create card"
                        onClick={handleOpen}
                    >
                        <AddIcon/>
                    </IconButton>
                    <Divider className={classes.line}/>
                </Typography>

>>>>>>> 2fef839a183679f3b5ef31e34a5ee06c084076d3
                <GridNotes
                    setSnackbarMsg={setSnackbarMsg}
                    group={group}
                    logout={logout}
<<<<<<< HEAD
                    flashcards={flashcards}
                    setChanged={setChanged}
                />
            </div>
            </div>
        </div>
=======
                />
            </Card>
        </Card>
>>>>>>> 2fef839a183679f3b5ef31e34a5ee06c084076d3
    )
}

export default CardsFront