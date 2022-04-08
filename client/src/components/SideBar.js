import React from 'react';
import { Toolbar, Typography, Grid, Box, IconButton, Divider, Drawer, List, ListItem } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { LogoIcon } from './CustomIcons'
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/ChatBubble';
import TaskListIcon from '@material-ui/icons/Assignment';
import NotesIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';

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

function SideBar({username, setNavTitle}) {

  const classes = useStyles()

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
        {generateSection('Text Channels', [{link: '/task-list', icon: <TaskListIcon/>, buttonName: 'task-list'}, {link: '/notes', icon: <NotesIcon/>, buttonName: 'notes'}, {link: '/resources', icon: <FolderIcon/>, buttonName: 'resources'}])}
      </Toolbar>
    </Drawer>
  )
}

export default SideBar