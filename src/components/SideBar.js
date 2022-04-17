import React from 'react';
import { Toolbar, Typography, Grid, Box, IconButton, Divider, Drawer, Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { Autocomplete } from '@material-ui/lab'
import { LogoIcon } from './CustomIcons'
import { apiInvoker } from '../apiInvoker'
import { FieldArray, Form, Formik, useFormik } from 'formik'
import * as yup from 'yup';
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
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
  button2: {
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#cfc8c8'
    }
  },
  buttonCreate: {
    backgroundColor: '#015719',
    color: '#ebebeb',
    '&:hover': {
      backgroundColor: '#007821'
    }
  },
  redCButton: {
    backgroundColor: "white",
    color: '#cc0e0e',
    '&:hover': {
      backgroundColor: "white",
      color: '#a30b0b',
    },
  },
}));

const validationSchemaGroupDialog = yup.object({
  members: yup
  .array('Select members')
  .of(yup.string('Member name should be a string').min(3, 'Member should be of minimum 3 characters length'))
  .min(1, 'Please select atleast 1 member')
  .required('Member(s) required')
});

const validationSchemaSettingsUsername = yup.object({
  username: yup
  .string('Enter your username')
  .min(3, 'Username should be of minimum 3 characters length')
  .max(30, 'Username should be of maximum 30 characters length')
  .required('Username is required')
});

const validationSchemaSettingsPassword = yup.object({
  new_password: yup
  .string("Enter your new password")
  .min(8, 'New Password should be of minimum 8 characters length')
  .max(30, 'New Password should be of maximum 30 characters length')
  .required('New Password is required'),
});

function SideBar({username, setNavTitle, group, unSetGroup, setSnackbarMsg, setGroup, logout, currchat}) {
  const [openPromoteMember, setOpenPromoteMember] = React.useState(false)
  const [openRemoveMember, setOpenRemoveMember] = React.useState(false)
  const [openAddMember, setOpenAddMember] = React.useState(false)
  const [openSettings, setOpenSettings] = React.useState(false)
  const [mList, setMList] = React.useState([]) // [{username, fullname, user_id}]
  const [mMap, setMMap] = React.useState({}) // {`${fullname} ${username}`: {username, fullname, user_id}}
  const [sMember, setSMember] = React.useState('')

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
          <IconButton onClick={() => setOpenSettings(true)} aria-label="settings" size="small">
            <SettingsIcon fontSize='inherit'/>
          </IconButton>
        </Grid>
      </Grid>
    )
  }

  function IconLinkButton({link, icon, buttonName}) {

    const onClickIconLinkButton = async () => {
      const [data, err] = await apiInvoker('/api/checkStatus', {group_id: group.group_id})
      if (err === undefined) {
        let newGroup = {...group}
        newGroup.status = data.status
        setGroup(newGroup)
        setNavTitle(buttonName)
        navigate(link, { replace: true })
      } else {
        if (err === 'Token error') {
          logout()
          navigate('/', { replace: true })
        } else {
          navigate('/', { replace: true })
        }
      }
    }

    return (
      <IconButton onClick={onClickIconLinkButton}>
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
  
  const userFetcher = async (type, errorText, users='users1') => {
    // setMList(['Saad @saad', 'Taha @taha'])
    // setMMap({'Saad @saad': {username: '@saad', fullname: 'Saad', user_id: 1}, 'Taha @taha': {username: '@taha', fullname: 'Taha', user_id: 2}})
    const [data, err] = await apiInvoker('/api/getUsers', {type: type, group_id: group.group_id})
    
    if (err === undefined) {
      let newMemberMap = {}
      let newMemberList = []
<<<<<<<< HEAD:src/components/SideBar_2.js
      for (let m of data[users]) {
========
      for (let m of data.users1) {
>>>>>>>> 2fef839a183679f3b5ef31e34a5ee06c084076d3:src/components/SideBar.js
        const key = m.fullname + ' ' + m.username
        newMemberList.push(key)
        newMemberMap[key] = m
      }
      setMMap(newMemberMap)
      setMList(newMemberList)
    } else {
      if (err === 'Token error') {
        logout()
        navigate('/', { replace: true })
      } else {
        setSnackbarMsg(errorText + ' Error: ' + err)
      }
    }
  }

  const handleDeleteGroup = async () => {
    const values = {group_id: group.group_id}
    const [data, err] = await apiInvoker('/api/deleteGroup', values)
    if (err === undefined) {
      unSetGroup()
      navigate('/', { replace: true })
    } else {
      if (err === 'Token error') {
        logout()
        navigate('/', { replace: true })
      } else {
        setSnackbarMsg('Delete Group Error: ' + err)
      }
    }
  }

  const handlePromoteMember = () => {
    userFetcher('promote', 'Add Group', 'users2').then(() => console.log('Users Fetched'))

    setSMember('')
    setOpenPromoteMember(true)
  }

  const handleAddMember = () => {
    userFetcher('add', 'Add Member', 'users2').then(() => console.log('Users Fetched'))

    setSMember('')
    setOpenAddMember(true)
  }

  const handleRemoveMember = () => {
    userFetcher('remove', 'Remove Member').then(() => console.log('Users Fetched'))

    setSMember('')
    setOpenRemoveMember(true)
  }

  const handleLeaveGroup = async () => {
    const values = {group_id: group.group_id}
    const [data, err] = await apiInvoker('/api/leaveGroup', values)
    if (err === undefined) {
      unSetGroup()
      navigate('/', { replace: true })
    } else {
      if (err === 'Token error') {
        logout()
        navigate('/', { replace: true })
      } else {
        setSnackbarMsg('Leave Group Error: ' + err)
      }
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

  function GroupDialog({title, openDialog, setOpenDialog, apiLink, mList, mMap, sMember}) {
    const [memberList, setMemberList] = React.useState([...mList]) // [{username, fullname, user_id}]
    const [memberMap, setMemberMap] = React.useState({...mMap}) // {`${fullname} ${username}`: {username, fullname, user_id}}
    const [selectedMember, setSelectedMember] = React.useState(sMember)

    return (
      <Dialog classes={{ paper: classes.dialogPaper }} open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Formik
          initialValues={{
            members: []
          }}
          validationSchema={validationSchemaGroupDialog}
          onSubmit={async (values) => {
            const [data, err] = await apiInvoker(apiLink, {chatid: currchat, group_id: group.group_id, members: values.members.map((val) => memberMap[val].user_id)})
            if (err === undefined) {
              setOpenDialog(false)
            } else {
              if (err === 'Token error') {
                logout()
                navigate('/', { replace: true })
              } else {
                setSnackbarMsg(title + ' Error: ' + err)
              }
            }
          }}
          >
            {({values, touched, errors, handleChange, handleBlur, isValid, handleSubmit}) => {

              return (<Form noValidate autoComplete="off">
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Typography className={classes.textLabel} align='left'>Add People</Typography>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={memberList}
                    value={selectedMember}
                    onChange={(event, newValue) => {
                      setSelectedMember(newValue)
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Add People" />}
                    />
                  </Grid>
                  <Grid item>
                    <FieldArray name="members">
                      {({push, remove}) => {
                        return (<Box>
                          <IconButton edge="end" color="secondary" aria-label="add" size='small' align='center' onClick={() => {
                            if (selectedMember !== '') {
                              const curMemberList = [...memberList]
                              const updatedMemberList = curMemberList.filter((value, index, arr) => {
                                return value !== selectedMember
                              })
                              const sMember = selectedMember
                              push(sMember)
                              setMemberList(updatedMemberList)
                              setSelectedMember('')
                            }
                          }}>
                              <AddCircleIcon/>
                          </IconButton>
                          <Typography className={classes.textHeading} align='center'>People Selected:</Typography>
                          {
                            values.members.map((val, index) => {
                              return (
                                <Grid container direction='row' justifyContent='space-between' alignItems='center' spacing={1}>
                                  <Grid item>
                                  <Typography className={classes.textLabel} align='left'>{val}</Typography>
                                  </Grid>
                                  <Grid item>
                                    <IconButton edge='end' className={classes.redCButton} aria-label="remove" size="small" onClick={() => {
                                      setMemberList([...memberList, val])
                                      remove(index)
                                    }}>
                                      <RemoveCircleIcon/>
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              )
                            })
                          }
                        </Box>)
                      }}
                    </FieldArray>
                  </Grid>
                </Grid>
                <Box pt={1}/>
                <Divider/>
                <Box pt={1}/>
                <DialogActions>
                <Grid container direction="row" justifyContent="flex-end" alignItems="right" spacing={2}>
                  <Grid item>
                    <Button onClick={() => setOpenDialog(false)} variant='outlined' className={classes.button2}>
                        Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleSubmit} className={classes.buttonCreate}>
                        Update
                    </Button>
                  </Grid>
                </Grid>
                </DialogActions>
              </Form>)
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    )
  }

  function SettingsDialog({openSettings, setOpenSettings}) {

    const formikSettingsUsername = useFormik({
      initialValues: {
        username: ''
      },
      validationSchema: validationSchemaSettingsUsername,
      onSubmit: async (values) => {
        const [data, err] = await apiInvoker('/api/updateUsername', {username: values.username})
        if (err === undefined) {
          setOpenSettings(false)
        } else {
          if (err === 'Token error') {
            logout()
            navigate('/', { replace: true })
          } else {
            setSnackbarMsg('Update Username Error: ' + err)
          }
        }
      }
    });

    const formikSettingsPassword = useFormik({
      initialValues: {
        new_password: ''
      },
      validationSchema: validationSchemaSettingsPassword,
      onSubmit: async (values) => {
        const [data, err] = await apiInvoker('/api/updatePassword', {new_password: values.new_password})
        if (err === undefined) {
          setOpenSettings(false)
        } else {
          if (err === 'Token error') {
            logout()
            navigate('/', { replace: true })
          } else {
            setSnackbarMsg('Update Password Error: ' + err)
          }
        }
      }
    });

    return (
      <Dialog classes={{ paper: classes.dialogPaper }} open={openSettings} onClose={() => setOpenSettings(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Information</DialogTitle>
        <DialogContent>
          <Typography className={classes.textLabel} align='left'>Username</Typography>
          <TextField
          fullWidth
          margin="dense"
          id="username"
          name="username"
          label="Username"
          value={formikSettingsUsername.values.username}
          placeholder="SaadSultanSheikh00"
          onChange={formikSettingsUsername.handleChange}
          error={formikSettingsUsername.touched.username && Boolean(formikSettingsUsername.errors.username)}
          helperText={formikSettingsUsername.touched.username && formikSettingsUsername.errors.username}
          color="background"
          variant="outlined"
          InputProps={{style: {fontSize: 12}}}
          InputLabelProps={{style: {fontSize: 12}}}
          />
          <Box pt={1}/>
          <Divider/>
          <Box pt={1}/>
          <DialogActions>
            <Grid container direction="row" justifyContent="flex-end" alignItems="right" spacing={2}>
              <Grid item>
                <Button onClick={formikSettingsUsername.handleSubmit} className={classes.buttonCreate}>
                    Update
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
          <Typography className={classes.textLabel} align='left'>New Password</Typography>
          <TextField
          fullWidth
          margin="dense"
          id="new_password"
          name="new_password"
          label="New Password"
          value={formikSettingsPassword.values.new_password}
          placeholder="Qwerty12345"
          type="password"
          onChange={formikSettingsPassword.handleChange}
          error={formikSettingsPassword.touched.new_password && Boolean(formikSettingsPassword.errors.new_password)}
          helperText={formikSettingsPassword.touched.new_password && formikSettingsPassword.errors.new_password}
          color="background"
          variant="outlined"
          InputProps={{style: {fontSize: 12}}}
          InputLabelProps={{style: {fontSize: 12}}}
          />
          <Box pt={1}/>
          <Divider/>
          <Box pt={1}/>
          <DialogActions>
            <Grid container direction="row" justifyContent="flex-end" alignItems="right" spacing={2}>
              <Grid item>
                <Button onClick={formikSettingsPassword.handleSubmit} className={classes.buttonCreate}>
                    Update
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </DialogContent>
      </Dialog>
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
      <GroupDialog title='Promote To Admin' openDialog={openPromoteMember} setOpenDialog={setOpenPromoteMember} apiLink={'/api/promoteToAdmin'} mList={mList} mMap={mMap} sMember={sMember}/>
      <GroupDialog title='Remove Participants' openDialog={openRemoveMember} setOpenDialog={setOpenRemoveMember} apiLink={'/api/removeParticipants'} mList={mList} mMap={mMap} sMember={sMember}/>
      <GroupDialog title='Add Participants' openDialog={openAddMember} setOpenDialog={setOpenAddMember} apiLink={'/api/addParticipants'} mList={mList} mMap={mMap} sMember={sMember}/>
      <SettingsDialog openSettings={openSettings} setOpenSettings={setOpenSettings}/>
    </Drawer>
  )
}

export default SideBar
