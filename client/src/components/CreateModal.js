import React, {useState, memo} from 'react';
import { Typography, Modal, Button, Box, TextField, IconButton } from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { apiInvoker } from '../apiInvoker'

const style = {
    position: 'absolute',
    top: '340px',
    left: '665px',
    bottom: '313px',
    right: '460px',
    width: '520px',
    height: '432px',
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
          fontFamily: 'Lato',
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
  
      submitCrButton:{
          top: '140px',
          // bottom: '0px',
          left: '405px'
      },
  
      submitCButton:{
          top: '140px',
          left: '210px'
      },
  
      iconButton:{
          left: '450px',
          top: '8px',
          color: '#a73a38'
      }
    }));
    
  
  
  
  
  function CreateModal({open, modalClose}) {  
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
  
    const handleSubmit = async e =>{
      e.preventDefault()
      const [data, err] = await apiInvoker('/api/createCard', {title:title, description:description})
      modalClose()
    };
  
    function handleButton(){
      setTitle('')
      setDescription('')
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
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>   
              <Typography className = {classes.toptypo}>
                  <CheckBoxOutlineBlankIcon className = {classes.bicon}/> 
                  <Typography className = {classes.typo1} style = {{display: 'inline-block'}}>
                      Create Flashcard
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
                          label="Question" 
                        //   value = {title}
                          multiline = {true} 
                          variant="outlined"
                          color = "secondary"
                      />
                  
                      <TextField 
                          onChange={(e) => setDescription(e.target.value)}
                          className = {classes.text2} 
                          id="answer"
                        //   value={description}
                          multiline={true} 
                          label = "Answer"
                          rows = {6}
                          variant="outlined"
                          color = "secondary"
                      />
                      <Button
                          className  = {classes.submitCrButton}
                          type="submit"
                          color="secondary"
                          variant="contained"
                      >
                          Create
                      </Button>
                      
                      <Button
                          onClick={handleButton}
                          className  = {classes.submitCButton}
                          // type="reset"
                          color="secondary"
                          variant="outlined"
                      >
                          Cancel
                      </Button>
                  </form>
              </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
  
  export default memo(CreateModal)