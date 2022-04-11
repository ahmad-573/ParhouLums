import React, {useEffect, useState, memo} from 'react';
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

const useStyles = makeStyles((theme) => ({
  
    mainBox:{
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: theme.primary,
        textAlign: 'center',
    },
    subBox:{
        position: 'absolute',
        width: '75%',
        height: '90%',   
        top: '7.5%',
        bottom: '100px',
        right: '4.5%',
        left: '20%',
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
        left: '0%',
        right: '0%',
        top: '0%',
        bottom: '92%',
        // alignItems: 'center',
        width: '100%',
        height: '8%',
        // border: '1px solid #000'
    },

    addicon:{
        width: '1.7%',
        height: '28.5%',
        left: '42%',
        right: '1%',
        bottom: '12.5%',
    },

  }));

function CardsFront(){
    const classes = useStyles();
    return(
        <Card className={classes.mainBox}>
            <Card className={classes.subBox}>
                <Typography className={classes.topo1}>
                    Flashcards
                    <IconButton className={classes.addicon}>
                        <AddIcon/>
                    </IconButton>
                    <Divider/>
                </Typography>

                <GridNotes/>
            </Card>
        </Card>
    )
}

export default CardsFront