import React, {useState, memo} from 'react';
import { Typography, Modal, Button, Box, TextField, IconButton, ThemeProvider } from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { FiAlignCenter, FiVolumeX } from 'react-icons/fi';
import { apiInvoker } from '../apiInvoker'

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#015719',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#d3d7db',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});


const style = {
  position: 'absolute',
  top: '340px',
  left: '665px',
  bottom: '313px',
  right: '460px',
  width: '520px',
  height: '232px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({

    toptypo:{
        position: 'absolute',
        height: '70px',
        bottom: '361',
        width: '520px',
        top: '0px',
        right:'0px',
        left: '0px',
    },


    bicon:{
        position: 'absolute',
        width: '36px',
        height: '36px',
        top: '17px',
        left: '28px',
        right: '456px',
        bottom: '17px',
        borderRadius: '3px',
    },

    typo1:{
        position: 'absolute',
        fontWeight: '900',
        fontFamily: 'Helvetica Bold, sans-serif',
        fontStyle: 'normal',
        lineHeight: '30px',
        fontSize: '22px',
        height: '36px',
        left: '80px',
        right: '72px',
        top: '17px',
        bottom: '17px',
        display: 'flex',
        alignItems: 'center'
    },

    toptypo2:{
        position: 'absolute',
        width: '520px',
        height: '362px',
        top: '70px',
        left: '0px',
        right: '0px',
        bottom: '313px',
    },

    typo2:{
        position: 'absolute',
        height: '22px',
        width: '463px',
        left: '28px',
        right: '28px',
        top: '11px',
        bottom: '246',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '15px',
        lineHeight: '22px'
    },

    typo3:{
        top: '39px',
        bottom: '204px',
        left: '28px',
        right: '28px',
        width: '464px',
        height: '36px',
    },

    text1:{
        top: '8px',
        bottom: '204px',
        left: '28px',
        right: '28px',
        width: '464px',
        height: '36px',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '15px',
        lineHeight: '22px',
        // boxShadow: 10,
    },

    typo4:{
        position: 'absolute',
        height: '22px',
        width: '463px',
        left: '28px',
        right: '28px',
        top: '99px',
        bottom: '158px',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '15px',
        lineHeight: '22px'
    },

    typo5:{
        top: '127px',
        bottom: '28px',
        right: '28px',
        left: '28px',
        width: '464px',
        height: '124px'
    },

    text2:{
        top: '70px',
        bottom: '28px',
        left: '28px',
        right: '28px',
        width: '464px',
        height: '124px',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '15px',
        lineHeight: '22px',
    },

    submitEButton:{
        top: '70px',
        // bottom: '0px',
        left: '430px',
    },

    submitCButton:{
        top: '70px',
        left: '260px',
        color: '#0A0A0A'
    },

    iconButton:{
        left: '450px',
        top: '8px',
        color: '#a73a38'
    }
  }));
  




function EditTopicModal({open, modalClose, mtitle, topic_id, logout, group_id, setSnackbarMsg}) {  
//   const [open, setOpen] = useState(false);
//   console.log(open, 'in modal')  
//   const handleOpen = () => setOpen(modalop);
//   const handleClose = () => setOpen(false)
  const [title, setTitle] = useState(mtitle)
  const [ititle, setiTitle] = useState(mtitle)

  const handleSubmit = async e =>{
    e.preventDefault()
    setiTitle(title)
    const [data, err] = await apiInvoker('/api/editTopic', {new_title:title, topic_id:topic_id, group_id: group_id})
    if (data !== undefined) ;
    else if (err === 'Token error') logout()
    else setSnackbarMsg('Error: ' + err)
    modalClose()
  };

  function handleButton(){
    setTitle(ititle)
    modalClose()
  }
//   console.log('hereee maybe')
//   handleOpen()
  const classes = useStyles();
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleButton}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>   
            <Typography className = {classes.toptypo}>
                <CheckBoxOutlineBlankIcon className = {classes.bicon}/> 
                <Typography className = {classes.typo1} style = {{display: 'inline-block'}}>
                    Edit Topic
                </Typography>

                <IconButton className = {classes.iconButton} aria-label="close modal" onClick={handleButton}>
                    <CloseIcon />
                </IconButton>   
            </Typography>

            <Typography className = {classes.toptypo2}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField 
                        onChange={(e) => setTitle(e.target.value)}
                        className = {classes.text1} 
                        id="question" 
                        label="Enter new title" 
                        value = {title}
                        multiline = {true} 
                        variant="outlined"
                        color = "secondary"
                    />
                    <ThemeProvider theme={theme}>
                    <Button
                        className  = {classes.submitEButton}
                        type="submit"
                        color="primary"
                        variant="contained"
                    >
                        Edit
                    </Button>
                    
                    
                    <Button
                        onClick={handleButton}
                        className  = {classes.submitCButton}
                        type="submit"
                        color="secondary"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    </ThemeProvider>
                </form>
            </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default memo(EditTopicModal)