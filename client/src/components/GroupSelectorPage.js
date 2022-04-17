import React from 'react';
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Divider, Box } from '@material-ui/core'
import GroupList from './GroupList'
import { apiInvoker } from '../apiInvoker'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  textBig: {
    flexGrow: 1,
    fontWeight: 'normal',
    fontSize: 48,
    color: "#737373"
  }
}));

function GroupSelectorPage({setNavTitle,setMychats,mychats,setCurrchat,username, setGroup, setSnackbarMsg, groups, setGroups, logout}) {

  const classes = useStyles()
  const navigate = useNavigate()

  React.useEffect(() => {
    apiInvoker('/api/getAllGroups').then(([data, err]) => {
      if (err === undefined) {
        setGroups(data.groups)
      } else {
        if (err === 'Token error') {
          logout()
          navigate('/', { replace: true })
        } else {
          setSnackbarMsg('Group Selector Error: ' + err)
        }
      }
    })
  }, [])

  React.useEffect(() => {
    // get All chats
    axios.get(`https://api.chatengine.io/chats/`, { 'headers': {'Project-ID': '984bd544-267a-4407-a75e-a55ecb80c946', 'User-Name': username, 'User-secret': 'genericPassword'} }).then((chats) => setMychats(chats)).catch((error) => setSnackbarMsg(error))
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
              <GroupList setNavTitle={setNavTitle} mychats={mychats} setCurrchat={setCurrchat} logout={logout} type={'Admin'} setGroup={setGroup} groups={groups.filter((obj) => obj.status ? true : false)}/>
            </Grid>
            <Divider
              orientation='vertical'
              style={{ minHeight: "inherit", background: '#1d1c1d', width: "3px" }}
              flexItem
            />
            <Grid item>
            <GroupList setNavTitle={setNavTitle} mychats={mychats} setCurrchat={setCurrchat} logout={logout} type={'Member'} setGroup={setGroup} groups={groups.filter((obj) => obj.status ? false : true)}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default GroupSelectorPage;