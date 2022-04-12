import React, {useState, useCallback} from 'react';
import { Typography, Modal, Button, Box, TextField, IconButton, Card,createTheme , ThemeProvider} from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { apiInvoker } from '../apiInvoker'
import Divider from '@material-ui/core/Divider';
import Note from "./Note";
import './notestyle.css'
import GridNotes from './GridNotes';
import TopicModal from './TopicModal';
import NavBar from './NavBar';

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
        position: 'absolute',
        width: '96%',
        height: '85%',   
        top: '13%',
        bottom: '100px',
        right: '4.5%',
        left: '3%',
        backgroundColor: theme.primary,
        border: '1px solid #d3d3d3',
        borderRadius: '20px',
        // display: 'flex',
        // justifyContent: 'center'
    },

    topo1:{
        position: 'absolute',
        fontFamily: 'Lato',
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

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Helvetica World Bold',
        "sans-serif"
      ].join(','),
      fontSize: 20,
    },
  });

function Resources(){
    const classes = useStyles();
    const [opmodal, setOpmodal] = useState(false)
    const handleClose = useCallback(() => setOpmodal(false), [])
    const handleOpen = () => setOpmodal(true)
    return(
        <Card className={classes.mainBox}>
            <TopicModal
                open={opmodal}
                modalClose={handleClose}
            />
            <Card className={classes.subBox}>
                <ThemeProvider theme={theme}>
                    <Typography className={classes.textHeading}>
                        Resources
                        <IconButton 
                        className={classes.addicon}
                        aria-label="create card"
                        onClick={handleOpen}
                        >
                            <AddIcon/>
                        </IconButton>
                        <Divider className={classes.line}/>
                    </Typography>
                </ThemeProvider>

            </Card>
        </Card>
    )
}

export default Resources