import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Grid, TextField, Button, Divider, Box, NativeSelect } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { LogoIcon, LogoBigIcon } from './CustomIcons'
import { apiInvoker } from '../apiInvoker'


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
    width: 530,
    maxHeight: 900,
  },
  button: {
    backgroundColor: '#015719',
    color: '#ebebeb',
    '&:hover': {
      backgroundColor: '#007821'
    }
  }
}));

const validationSchemaRegister = yup.object({
  securityId: yup
  .number('Select a valid security question')
  .integer('Select a valid security question please')
  .min(0, 'Security question should not be None')
  .required('Security question is required'),
  username: yup
  .string('Enter your username')
  .min(3, 'Username should be of minimum 3 characters length')
  .max(30, 'Username should be of maximum 30 characters length')
  .required('Username is required'),
  email: yup
  .string('Enter your email address')
  .email('Enter a valid email address')
  .min(3, 'Email address should be of minimum 3 characters length')
  .max(50, 'Email address should be of maximum 50 characters length')
  .required('Email address is required'),
  password: yup
  .string("Enter your password")
  .min(8, 'Password should be of minimum 8 characters length')
  .max(30, 'Password should be of maximum 30 characters length')
  .required('Password is required'),
  passwordAgain: yup
  .string("Enter your password")
  .min(8, 'Password should be of minimum 8 characters length')
  .max(30, 'Password should be of maximum 30 characters length')
  .required('Password is required'),
  answer: yup
  .string("Enter your answer")
  .min(8, 'Answer should be of minimum 8 characters length')
  .max(30, 'Answer should be of maximum 30 characters length')
  .required('Answer is required'),
  name: yup
  .string("Enter your name")
  .min(3, 'Name should be of minimum 8 characters length')
  .max(30, 'Name should be of maximum 30 characters length')
  .required('Name is required'),
});

function RegisterPage({setSnackbarMsg}) {

  const classes = useStyles();
  const navigate = useNavigate();

  const formikRegister = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordAgain: '',
      securityId: -1,
      answer: '',
      name: ''
    },
    validationSchema: validationSchemaRegister,
    onSubmit: async (values) => {
      if (values.password !== values.passwordAgain) {
        setSnackbarMsg('Sign Up Error: Passwords Do Not Match!')
      } else {
        const [data, err] = await apiInvoker('/api/signup', {question: values.securityId, answer: values.answer, password: values.password, username: values.username, email: values.email, fullname: values.name})
        if (err === undefined) {
          navigate('/', { replace: true })
        } else {
          setSnackbarMsg('Sign Up Error: ' + err)
        }
      }
    }
  });

  return (
    <div>
      <Box mt={14}/>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <Grid container direction="row" justifyContent="left" alignItems="left" spacing={2}>
            <Grid item>
              <LogoBigIcon/>
            </Grid>
            <Grid item>
            <Typography className={classes.textBig} align='center'>Parhou@LUMS</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Card elevation={4} className={classes.cardRoot}>
            <CardContent>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Grid container direction="row" justifyContent="left" alignItems="left" spacing={2}>
                    <Grid item>
                      <LogoIcon/>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.textHeading} align='left'>Register</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography className={classes.textLabel} align='left'>Name</Typography>
                  <TextField
                  fullWidth
                  margin="dense"
                  id="name"
                  name="name"
                  label="Name"
                  value={formikRegister.values.name}
                  placeholder="SaadSultanSheikh00"
                  onChange={formikRegister.handleChange}
                  error={formikRegister.touched.name && Boolean(formikRegister.errors.name)}
                  helperText={formikRegister.touched.name && formikRegister.errors.name}
                  color="background"
                  variant="outlined"
                  InputProps={{style: {fontSize: 12}}}
                  InputLabelProps={{style: {fontSize: 12}}}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.textLabel} align='left'>Username</Typography>
                  <TextField
                  fullWidth
                  margin="dense"
                  id="username"
                  name="username"
                  label="Username"
                  value={formikRegister.values.username}
                  placeholder="SaadSultanSheikh00"
                  onChange={formikRegister.handleChange}
                  error={formikRegister.touched.username && Boolean(formikRegister.errors.username)}
                  helperText={formikRegister.touched.username && formikRegister.errors.username}
                  color="background"
                  variant="outlined"
                  InputProps={{style: {fontSize: 12}}}
                  InputLabelProps={{style: {fontSize: 12}}}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.textLabel} align='left'>Email</Typography>
                  <TextField
                  fullWidth
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email"
                  value={formikRegister.values.email}
                  placeholder="23100138@lums.edu.pk"
                  onChange={formikRegister.handleChange}
                  error={formikRegister.touched.email && Boolean(formikRegister.errors.email)}
                  helperText={formikRegister.touched.email && formikRegister.errors.email}
                  color="background"
                  variant="outlined"
                  InputProps={{style: {fontSize: 12}}}
                  InputLabelProps={{style: {fontSize: 12}}}
                  />
                </Grid>
                <Grid item>  
                  <Typography className={classes.textLabel} align='left'>Password</Typography>
                  <TextField
                  fullWidth
                  margin="dense"
                  id="password"
                  name="password"
                  label="Password"
                  value={formikRegister.values.password}
                  placeholder="Qwerty12345"
                  type="password"
                  onChange={formikRegister.handleChange}
                  error={formikRegister.touched.password && Boolean(formikRegister.errors.password)}
                  helperText={formikRegister.touched.password && formikRegister.errors.password}
                  color="background"
                  variant="outlined"
                  InputProps={{style: {fontSize: 12}}}
                  InputLabelProps={{style: {fontSize: 12}}}
                  />
                </Grid>
                <Grid item>  
                  <Typography className={classes.textLabel} align='left'>Re-enter Password</Typography>
                  <TextField
                  fullWidth
                  margin="dense"
                  id="passwordAgain"
                  name="passwordAgain"
                  label="Re-enter Password"
                  value={formikRegister.values.passwordAgain}
                  placeholder="Qwerty12345"
                  type="password"
                  onChange={formikRegister.handleChange}
                  error={formikRegister.touched.passwordAgain && Boolean(formikRegister.errors.passwordAgain)}
                  helperText={formikRegister.touched.passwordAgain && formikRegister.errors.passwordAgain}
                  color="background"
                  variant="outlined"
                  InputProps={{style: {fontSize: 12}}}
                  InputLabelProps={{style: {fontSize: 12}}}
                  />
                </Grid>
                <Grid item>  
                  <Typography className={classes.textLabel} align='left'>Security Question</Typography>
                  <NativeSelect
                    variant = "outlined"
                    style={{ width: 500, fontSize: 12}}
                    inputProps={{
                      name: 'Security Question',
                      id: 'uncontrolled-native',
                    }}
                    onChange={formikRegister.handleChange('securityId')}
                    value={formikRegister.values.securityId}
                    error={formikRegister.touched.securityId && Boolean(formikRegister.errors.securityId)}
                    helperText={formikRegister.touched.securityId && formikRegister.errors.securityId}
                  >
                    <option value={-1}>None</option>
                    <option value={0}>What is the middle name of your first child?</option>
                    <option value={1}>What was the name of your first pet?</option>
                    <option value={2}>In what city were you born?</option>
                    <option value={3}>What is your mother's maiden name?</option>
                    <option value={4}>In which school did you study?</option>
                  </NativeSelect>
                </Grid>
                <Grid item>  
                  <Typography className={classes.textLabel} align='left'>Your Answer</Typography>
                  <TextField
                  fullWidth
                  margin="dense"
                  id="answer"
                  name="answer"
                  label="Your Answer"
                  value={formikRegister.values.answer}
                  placeholder="Qwerty12345"
                  type="answer"
                  onChange={formikRegister.handleChange}
                  error={formikRegister.touched.answer && Boolean(formikRegister.errors.answer)}
                  helperText={formikRegister.touched.answer && formikRegister.errors.answer}
                  color="background"
                  variant="outlined"
                  InputProps={{style: {fontSize: 12}}}
                  InputLabelProps={{style: {fontSize: 12}}}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider/>
            <CardContent>
              <Grid container direction="row" justifyContent="flex-end" alignItems="right" spacing={2}>
                <Grid item>
                  <Button variant="contained" className={classes.button} onClick={formikRegister.handleSubmit}>Sign up</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography className={classes.textLabel2} align='left'>
              Already have an account? {' '}
              <Link to="/">
                Sign in
              </Link>
              </Typography>                     
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default RegisterPage;