import React from 'react';
import { Typography, Card, CardContent, CardMedia, Grid, Button, Box, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import yellow_face from '../resources/yellow_face.jpeg'
import red_face from '../resources/red_face.jpeg'
import { useNavigate } from 'react-router-dom';

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

function GroupList({type, groups, setGroup, logout}) {

  const classes = useStyles()
  const navigate = useNavigate()

  const onGroupSelect = async (group) => {
    const [data, err] = await apiInvoker('/api/checkStatus', {group_id: group.group_id})
    if (err === undefined) {
      group.status = type === 'Admin' ? 1 : 0
      setGroup(group)
      navigate('/chat', { replace: true })
    } else {
      if (err === 'Token error') {
        logout()
        navigate('/', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }
  }

  function GroupTab({image, group}) {

    return (
      <Card onClick={() => onGroupSelect(group)}>
        <Box style={{ padding: 10 }}>
          <CardMedia
            component='img'
            className={classes.media}
            image={image}
            alt='User Image'
          />
          <CardContent className={classes.cardContent}>
            <Typography className={classes.textHeading} align='center'>
              {group.name}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    )
  }

  function GroupTabTripplet({groupTripplet, image}) {

    return (
      <ListItem>
        <Grid container direction='row' justifyContent='flex-start' alignContent='center' spacing={2}>
          {groupTripplet.map((obj, index) => <Grid item>
            <GroupTab image={image} group={obj}/>
          </Grid>)}
        </Grid>
      </ListItem>
    )
  }

  function GroupScroller({image}) {
    
    function generateListItems() {
      let remainingGroups = [...groups]
      let currentGroups = []
      let listItems = []
      
      while (remainingGroups.length !== 0) {
        currentGroups = remainingGroups.slice(0, 3)
        remainingGroups = remainingGroups.slice(currentGroups.length)
        listItems.push(
          <GroupTabTripplet groupTripplet={currentGroups} image={image}/>
        )
      }

      return listItems
    }
    
    return (
      <List style={{ maxHeight: 500, overflow: 'auto' }}>
        {
          generateListItems()
        }
      </List>
    )
  }

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center'>
      <Grid item>
        <Button disabled variant='outlined'>
          <Typography className={classes.textHeading}>
            {type} Access
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <GroupScroller image={type === 'Admin' ? red_face : yellow_face}/>
      </Grid>
    </Grid>
  )
}

export default GroupList