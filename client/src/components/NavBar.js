import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Grid, TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, Box, IconButton, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Autocomplete } from '@material-ui/lab'
import { Field, FieldArray, Form, Formik } from 'formik'
import * as yup from 'yup';
import { apiInvoker } from '../apiInvoker'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  textBig: {
    flexGrow: 1,
    fontWeight: 'normal',
    fontSize: 48,
    color: "#737373"
  },
  textHash: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: 28,
    color: '#737373'
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
  dialogPaper: {
    maxHeight: '50vh',
    minWidth: '30vw'
  },
  toolbar: {
    minHeight: 50
  },
  buttonLogout: {
    backgroundColor: '#e84a4a',
    color: '#ebebeb',
    '&:hover': {
      backgroundColor: '#f52f43'
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

const validationSchemaCreateGroup = yup.object({
  groupName: yup
  .string('Enter your username')
  .min(3, 'Username should be of minimum 3 characters length')
  .max(30, 'Username should be of maximum 30 characters length')
  .required('Username is required'),
  members: yup
  .array('Select members')
  .of(yup.string('Member name should be a string').min(3, 'Member should be of minimum 3 characters length'))
  .min(1, 'Please select atleast 1 member')
  .required('Member(s) required')
});

function NavBar({navTitle, setNavTitle, logout}) {
  const [openCreateGroup, setOpenCreateGroup] = React.useState(false)
  const [memberList, setMemberList] = React.useState([])
  const [selectedMember, setSelectedMember] = React.useState('')

  const classes = useStyles()
  const navigate = useNavigate()

  const handleOpenCreateGroup = () => {
    if (navTitle === 'groups') {
      setMemberList(['Saad', 'Taha', 'Moaiz', 'Fahad', 'Ahmad'])
      setOpenCreateGroup(true)
    } else {
      navigate('/', { replace: true })
    }
  }

  const handleCloseCreateGroup = () => {
    setOpenCreateGroup(false)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <Grid container direction="row" justifyContent="left" alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography className={classes.textHash} align='left'>#</Typography>
                  </Grid>
                  <Grid item>  
                    <Typography className={classes.textLabel} align='left'>{navTitle}</Typography>
                  </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" justifyContent="right" alignItems="center" spacing={1}>
                  <Grid item>
                    <Button variant="outlined" className={classes.button2} onClick={handleOpenCreateGroup}>
                      {
                        navTitle === 'groups' ? 'Create new Group' : 'Groups'
                      }
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" className={classes.buttonLogout} onClick={logout}>Logout</Button>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Dialog classes={{ paper: classes.dialogPaper }} open={openCreateGroup} onClose={handleCloseCreateGroup} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create New Group</DialogTitle>
          <DialogContent>
            <Formik
            initialValues={{
              groupName: '',
              members: []
            }}
            validationSchema={validationSchemaCreateGroup}
            onSubmit={async (values) => {

            }}
            >
              {({values, touched, errors, handleChange, handleBlur, isValid, handleSubmit}) => {

                return (<Form noValidate autoComplete="off">
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Typography className={classes.textLabel} align='left'>Group Name</Typography>
                      <TextField
                      fullWidth
                      margin="dense"
                      id="groupName"
                      name="groupName"
                      label="Group Name"
                      value={values.groupName}
                      placeholder="SE-GROUP"
                      onChange={handleChange}
                      error={touched.groupName && Boolean(errors.groupName)}
                      helperText={touched.groupName && errors.groupName}
                      color="background"
                      variant="outlined"
                      InputProps={{style: {fontSize: 12}}}
                      InputLabelProps={{style: {fontSize: 12}}}
                      />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.textLabel} align='left'>Add People</Typography>
                      <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={memberList}
                      value={selectedMember}
                      onChange={(event, newValue) => {
                        setSelectedMember(newValue);
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
                      <Button onClick={handleCloseCreateGroup} variant='outlined' className={classes.button2}>
                          Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={handleSubmit} className={classes.buttonCreate}>
                          Create
                      </Button>
                    </Grid>
                  </Grid>
                  </DialogActions>
                </Form>)
              }}
            </Formik>
          </DialogContent>
      </Dialog>
    </div>
  )
}

export default NavBar;