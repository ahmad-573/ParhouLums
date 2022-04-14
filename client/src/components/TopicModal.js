import React, {useState, memo} from 'react';
import { Typography, Modal, Button, Box, TextField, IconButton, ThemeProvider } from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, createTheme } from '@material-ui/core/styles';
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
        //light: '#0066ff',
        main: '#FFFFFF',
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
    //border: '2px solid #000',
    boxShadow: "3px 5px black",
    p: 4,
    borderRadius: '16px',
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
          left: '30px',
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
  
      submitCrButton:{
          top: '70px',
          // bottom: '0px',
          left: '405px'
      },
  
      submitCButton:{
          top: '70px',
          left: '210px',
          color: '#0A0A0A'
      },
  
      iconButton:{
          left: '450px',
          top: '8px',
          color: '#a73a38'
      }
    }));
    
  
  
  
  
  function TopicModal({open, modalClose,groupid, logout, setSnackbarMsg}) {  
    const [title, setTitle] = useState('')
  
    const handleSubmit = async e =>{
      e.preventDefault()
      console.log(title)
      if(title == ''){
        setSnackbarMsg('Error: all the required fields were not filled')
      }
      else{
            const [data, err] = await apiInvoker('/api/addTopic', {title:title, group_id:groupid})
            if (data !== undefined) ;
            else if (err === 'Token error') logout()
            else setSnackbarMsg('Error: ' + err)
            modalClose() 
      }

    };
  
    function handleButton(){
      setTitle('')
      modalClose()
    }
  //   console.log('hereee maybe')
  //   handleOpen()
    const classes = useStyles();
    return (
      <div>
        <Modal
          open={open}
          onClose={handleButton}
          aria-labelledby="modal-modal-title"
        >
          <Box sx={style}>   
              <Typography className = {classes.toptypo}>
                  {/* <CheckBoxOutlineBlankIcon className = {classes.bicon}/>  */}
                  <Typography className = {classes.typo1} style = {{display: 'inline-block'}}>
                      Add New Topic
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
                          label="Enter title" 
                        //   value = {title}
                          multiline = {true} 
                          variant="outlined"
                          color = "secondary"
                      />
                      <ThemeProvider theme={theme}>
                      <Button
                          className  = {classes.submitCrButton}
                          type="submit"
                          color="primary"
                          variant="contained"
                      >
                          Create
                      </Button>
                      
                      
                      <Button
                          onClick={handleButton}
                          className  = {classes.submitCButton}
                          // type="reset"
                          color="secondary"
                          //variant="outlined"
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
  
  export default memo(TopicModal)