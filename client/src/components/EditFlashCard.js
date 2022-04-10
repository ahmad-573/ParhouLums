import React, {useState} from 'react';
import { Typography, Modal, Button, Box, TextField } from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { makeStyles } from '@material-ui/core/styles';
import { FiAlignCenter, FiVolumeX } from 'react-icons/fi';

const style = {
  position: 'absolute',
  top: '237px',
  left: '532px',
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
        width: '36px',
        height: '36px',
        top: '70px',
        left: '0px',
        right: '0px',
        bottom: '83px',
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
    }


  }));

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>   
            <Typography className = {classes.toptypo}>
                <CheckBoxOutlineBlankIcon className = {classes.bicon}/> 
                <Typography className = {classes.typo1} style = {{display: 'inline-block'}}>
                    Edit Flashcard
                </Typography>  
            </Typography>

            <Typography className = {classes.toptypo2}>
                <Typography className = {classes.typo2}>
                    Question
                </Typography>
                <TextField className = {classes.typo3} id="question" label="What is Epigenetics?" variant="outlined"/>

                <Typography className = {classes.typo4}>
                    Answer
                </Typography>    

            </Typography>
        </Box>
      </Modal>
    </div>
  );
}
