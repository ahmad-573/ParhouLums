import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Divider, Box } from '@material-ui/core'
import GroupList from './GroupList'
import { apiInvoker } from '../apiInvoker'

const useStyles = makeStyles((theme) => ({
  textBig: {
    flexGrow: 1,
    fontWeight: 'normal',
    fontSize: 48,
    color: "#737373"
  }
}));

function GroupSelectorPage({username, setGroup, setSnackbarMsg}) {
  const [groups, setGroups] = React.useState([{name: 'G1', group_id: 1, status: 0}, {name: 'G2', group_id: 2, status: 0}, {name: 'G3', group_id: 3, status: 0}, {name: 'G4', group_id: 4, status: 1}, {name: 'G5', group_id: 5, status: 1}, {name: 'G6', group_id: 6, status: 1}])

  const classes = useStyles()

  React.useEffect(() => {
    apiInvoker('/api/getAllGroups').then(([data, err]) => {
      console.log('err:', err)
      console.log('data:', data)
      if (err === undefined) {
        setGroups(data.groups)
      } else {
        setSnackbarMsg('Group Selector Error: ' + err)
      }
    })
  }, [])

  return (
    <Box>
      <Box pt={5}/>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Typography className={classes.textBig} align='center'>Hello, {username} &#128075;</Typography>
        </Grid>
        <Grid item>
          <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item>
              <GroupList type={'Admin'} setGroup={setGroup} groups={groups.filter((obj) => obj.status ? true : false)}/>
            </Grid>
            <Divider
              orientation='vertical'
              style={{ minHeight: "inherit", background: '#1d1c1d', width: "3px" }}
              flexItem
            />
            <Grid item>
            <GroupList type={'Member'} setGroup={setGroup} groups={groups.filter((obj) => obj.status ? false : true)}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default GroupSelectorPage;