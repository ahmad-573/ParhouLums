import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Grid, TextField, Button, Divider, Box } from '@material-ui/core'
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

const validationSchemaLogin = yup.object({
    username: yup
    .string('Enter your username')
    .min(3, 'Username should be of minimum 3 characters length')
    .max(30, 'Username should be of maximum 30 characters length')
    .required('Username is required'),
    password: yup
    .string("Enter your password")
    .min(8, 'Password should be of minimum 8 characters length')
    .max(30, 'Password should be of maximum 30 characters length')
    .required('Password is required'),
});

function LoginPage({setIsLoggedIn, setSnackbarMsg}) {

  const classes = useStyles();

  const formikLogin = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      const [data, err] = await apiInvoker('/api/login', values)
      if (err === undefined) {
        setIsLoggedIn(true)
      } else {
        setSnackbarMsg('Login Error: ' + err)
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
                      <Typography className={classes.textHeading} align='left'>Sign in</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography className={classes.textLabel} align='left'>Username</Typography>
                  <TextField
                  fullWidth
                  margin="dense"
                  id="username"
                  name="username"
                  label="Username"
                  value={formikLogin.values.username}
                  placeholder="SaadSultanSheikh00"
                  onChange={formikLogin.handleChange}
                  error={formikLogin.touched.username && Boolean(formikLogin.errors.username)}
                  helperText={formikLogin.touched.username && formikLogin.errors.username}
                  color="background"
                  variant="outlined"
                  InputProps={{style: {fontSize: 12}}}
                  InputLabelProps={{style: {fontSize: 12}}}
                  />
                </Grid>
                <Grid item>
                  <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item>
                      <Typography className={classes.textLabel} align='left'>Password</Typography>
                    </Grid>
                    <Grid item>
                      <Link to="/forgot-password">
                        <Typography className={classes.textLabel} align='left'>Forgot Password?</Typography>                     
                      </Link>
                    </Grid>
                  </Grid>
                  <TextField
                  fullWidth
                  margin="dense"
                  id="password"
                  name="password"
                  label="Password"
                  value={formikLogin.values.password}
                  placeholder="Qwerty12345"
                  type="password"
                  onChange={formikLogin.handleChange}
                  error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                  helperText={formikLogin.touched.password && formikLogin.errors.password}
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
                  <Button variant="contained" className={classes.button} onClick={formikLogin.handleSubmit}>Sign in</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography className={classes.textLabel2} align='left'>
              Don't have an account? {' '}
              <Link to="/register">
                Create an account
              </Link>
              </Typography>                     
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginPage;