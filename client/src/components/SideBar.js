import React from 'react';
import { Toolbar, Typography, Grid, Box, IconButton, Divider, Drawer } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { LogoIcon } from './CustomIcons'
import { apiInvoker } from '../apiInvoker'
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/ChatBubble';
import TaskListIcon from '@material-ui/icons/Assignment';
import NotesIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteGroupIcon from '@material-ui/icons/DeleteSweep'
import PromoteMemberIcon from '@material-ui/icons/TrendingUp'
import AddMemberIcon from '@material-ui/icons/PersonAdd'
import RemoveMemberIcon from '@material-ui/icons/PersonAddDisabled'
import LeaveGroupIcon from '@material-ui/icons/ExitToApp'


const sidebarWidth = 300

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
    fontSize: 12,
    color: "#737373"
  },
  cardRoot: {
    backgroundColor: theme.primary,
    width: 520,
    maxHeight: 500,
  },
  button: {
    backgroundColor: '#ebe7ea',
    color: theme.tertiary,
    '&:hover': {
      backgroundColor: '#b8b5ab'
    }
  },
  drawerRoot: {
    width: sidebarWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: sidebarWidth,
      boxSizing: "border-box"
    }
  },
}));

function SideBar({username, setNavTitle, group, unSetGroup, setSnackbarMsg}) {

  const classes = useStyles()
  const navigate = useNavigate()

  function TopBar() {

    return (
      <Grid container direction='row' justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Grid container direction="row" justifyContent='flex-start' alignItems='flex-start' spacing={1}>
            <Grid item>
              <LogoIcon/>
            </Grid>
            <Grid item>
              <Typography className={classes.textHeading} align='left'>Salam {username}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton aria-label="settings" size="small">
            <SettingsIcon fontSize='inherit'/>
          </IconButton>
        </Grid>
      </Grid>
    )
  }

  function IconLinkButton({link, icon, buttonName}) {

    return (
      <Link to={link}>
        <IconButton onClick={() => setNavTitle(buttonName)}>
          <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
            <Grid item> 
              {icon}
            </Grid>
            <Grid item>
              <Typography className={classes.textLabel} align='left'>{buttonName}</Typography>
            </Grid>
          </Grid>
        </IconButton>
      </Link>
    )
  }

  const generateSection = (sectionName, buttonList) => {
    
    return (
      <Grid container direction='column' justifyContent='center' alignItems='flex-start'>
        <Grid item>
          <Box pt={1}/>
          <Typography className={classes.textLabel2} align='left'>{sectionName}</Typography>
        </Grid>
        {buttonList.map((obj) => <Grid item>
          <IconLinkButton link={obj.link} icon={obj.icon} buttonName={obj.buttonName}/>
        </Grid>)}
      </Grid>
    )
  }
  
  const handleDeleteGroup = async () => {
    const values = {group_id: group.group_id}
    const [data, err] = await apiInvoker('/api/deleteGroup', values)
    if (err === undefined) {
      unSetGroup()
      navigate('/', { replace: true })
    } else {
      setSnackbarMsg('Delete Group Error: ' + err)
    }
  }

  const handlePromoteMember = () => {
    // TODO
  }

  const handleAddMember = () => {
    // TODO
  }

  const handleRemoveMember = () => {
    // TODO
  }

  const handleLeaveGroup = async () => {
    const values = {group_id: group.group_id}
    const [data, err] = await apiInvoker('/api/leaveGroup', values)
    if (err === undefined) {
      unSetGroup()
      navigate('/', { replace: true })
    } else {
      setSnackbarMsg('Leave Group Error: ' + err)
    }
  }

  function OptionButton({icon, buttonName, onClickHandler}) {

    return (
      <IconButton onClick={onClickHandler}>
      <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
        <Grid item> 
          {icon}
        </Grid>
        <Grid item>
          <Typography className={classes.textLabel} align='left'>{buttonName}</Typography>
        </Grid>
      </Grid>
    </IconButton>
    )
  }

  const generateAdvSection = (sectionName, buttonList) => {
    
    return (
      <Grid container direction='column' justifyContent='center' alignItems='flex-start'>
        <Grid item>
          <Box pt={1}/>
          <Typography className={classes.textLabel2} align='left'>{sectionName}</Typography>
        </Grid>
        {buttonList.map((obj) => <Grid item>
          <OptionButton icon={obj.icon} buttonName={obj.buttonName} onClickHandler={obj.onClickHandler}/>
        </Grid>)}
      </Grid>
    )
  }

  return (
    <Drawer
      className={classes.drawerRoot}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <TopBar/>
      </Toolbar>
      <Divider />
      <Toolbar>
        {generateSection('Text Channels', [{link: '/chat', icon: <ChatIcon fontSize='small'/>, buttonName: 'chat'}])}
      </Toolbar>
      <Divider />
      <Toolbar>
        {generateSection('Tools', [{link: '/task-list', icon: <TaskListIcon/>, buttonName: 'task-list'}, {link: '/notes', icon: <NotesIcon/>, buttonName: 'notes'}, {link: '/resources', icon: <FolderIcon/>, buttonName: 'resources'}])}
      </Toolbar>
      <Divider />
      <Toolbar>
        {generateAdvSection(group.status === 1 ? 'Options (Admin)' : 'Options', group.status === 1 ? [{icon: <DeleteGroupIcon fontSize='small'/>, buttonName: 'Delete Group', onClickHandler: handleDeleteGroup}, {icon: <PromoteMemberIcon fontSize='small'/>, buttonName: 'Promote to Admin', onClickHandler: handlePromoteMember}, {icon: <RemoveMemberIcon fontSize='small'/>, buttonName: 'Remove Participants', onClickHandler: handleRemoveMember}, {icon: <AddMemberIcon fontSize='small'/>, buttonName: 'Add Participants', onClickHandler: handleAddMember}, {icon: <LeaveGroupIcon fontSize='small'/>, buttonName: 'Leave Group', onClickHandler: handleLeaveGroup}, ] : [{icon: <LeaveGroupIcon fontSize='small'/>, buttonName: 'Leave Group', onClickHandler: handleLeaveGroup}])}
      </Toolbar>
    </Drawer>
  )
}

export default SideBar