import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Grid, TextField, Button, Divider, Box } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup';
import GroupList from './GroupList'

const useStyles = makeStyles((theme) => ({
  textBig: {
    flexGrow: 1,
    fontWeight: 'normal',
    fontSize: 48,
    color: "#737373"
  },
  textHeading: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.tertiary
  },
  textLabel: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.tertiary
  },
  textLabel2: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: "#737373"
  },
  cardRoot: {
    backgroundColor: theme.primary,
    width: 520,
    maxHeight: 500,
  },
  button: {
    backgroundColor: '#015719',
    color: '#ebebeb',
    '&:hover': {
      backgroundColor: '#007821'
    }
  }
}));

function GroupSelectorPage({username}) {

  const classes = useStyles()

  return (
    <Box>
      <Box pt={5}/>
      <Grid container direction='column'>
        <Grid item>
          <Typography className={classes.textBig} align='center'>Hello, {username} &#128075;</Typography>
        </Grid>
        <Grid item>
          <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item>
              <GroupList type={'Admin'}/>
            </Grid>
            <Grid item>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default GroupSelectorPage;