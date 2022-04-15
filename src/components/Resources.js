import React, {useState, useCallback} from 'react';
import { Typography, Modal, Button, Box, TextField, IconButton, Card,createTheme , ThemeProvider, Grid} from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { apiInvoker } from '../apiInvoker'
import Divider from '@material-ui/core/Divider';
import Note from "./Note";
import './notestyle.css'
import Topics from './Topics';
import TopicModal from './TopicModal';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  
    mainBox:{
        position: 'relative',
        //right: '0px',
        // top: '0px',
        // bottom: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: theme.primary,
        textAlign: 'center',
    },
    subBox:{
        position: 'relative',
        width: '96%',
        height: '90%',   
        top: '5%',
        //bottom: '100px',
        right: '4.5%',
        left: '3%',
        backgroundColor: theme.primary,
        border: '1px solid #d3d3d3',
        borderRadius: '20px',
        //overflow: 'auto'
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
        'Helvetica Bold',
        "sans-serif"
      ].join(','),
      fontSize: 15,
    },
  });

function Resources({username, setGroup, setSnackbarMsg, groups, setGroups, group, logout}){
    //console.log("rendering resources")
    const classes = useStyles();
    const [opmodal, setOpmodal] = useState(false)
    const handleClose = useCallback(() => setOpmodal(false), [])
    const handleOpen = () => setOpmodal(true)
    const [topics, setTopics] = useState([])
    const [rerendertopics, setRerendertopics] = useState(0);
    const [time, setTime] = useState(0);

    function generateTime() {
        return(
            new Promise((resolve,reject) => {
                setTimeout(resolve,2000);
            }).then(() => {
                if (time%2) setTime(time + 1)
                else setTime(time - 1)
            })
        );
        
    }

    React.useEffect(() => {
        apiInvoker('/api/getTopics', {group_id:group.group_id}).then(([data, err]) => {
          if (err === undefined) {
            {setTopics(data.topics)}
          } else if (err === 'Token error'){
            logout()
          }
          else{
            setSnackbarMsg('Error: ' + err)
          }
          generateTime();
        })
      }, [time])

    return(
        <Grid item xs="auto" className={classes.mainBox} flexGrow={1}>
            <TopicModal
                open={opmodal}
                modalClose={handleClose}
                groupid={group.group_id}
                logout={logout}
                setSnackbarMsg={setSnackbarMsg}
                setRerendertopics={setRerendertopics}
                rerendertopics={rerendertopics}
            />
            <Grid className={classes.subBox} >
                <ThemeProvider theme={theme}>
                    <Typography>
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
                <Topics topics={topics} groupid={group.group_id} logout={logout} setSnackbarMsg={setSnackbarMsg} setRerendertopics={setRerendertopics} rerendertopics={rerendertopics}/>
            </Grid>
        </Grid>
    )
}

export default Resources