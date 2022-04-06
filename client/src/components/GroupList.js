import React from 'react';
import { Typography, Card, CardContent, CardMedia, Grid, TextField, Button, Divider, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import yellow_face from '../resources/yellow_face.jpeg'

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
  },
  media: {
    height: 150,
    width: '100%'
  },
  cardContent: {
    padding: 5,
    "&:last-child": {
      paddingBottom: 0
    }
  }
}));

function GroupList({type}) {

  const classes = useStyles()

  function GroupTab({imagePath, groupName}) {

    return (
      <Card>
        <Box style={{ padding: 10 }}>
          <CardMedia
            component='img'
            className={classes.media}
            image={imagePath}
            alt='User Image'
          />
          <CardContent className={classes.cardContent}>
            <Typography className={classes.textHeading} align='center'>
              {groupName}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    )
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        
      </Grid>
      <Grid item>
        
      </Grid>
    </Grid>
  )
}

export default GroupList