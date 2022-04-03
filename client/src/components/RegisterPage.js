import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Grid, TextField, Button, Divider, Box } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { LogoIcon, LogoBigIcon } from './CustomIcons'


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
    height: 470,
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

});

function RegisterPage() {

  const classes = useStyles();

  const formikRegister = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: validationSchemaRegister,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 4));
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
              </Grid>
            </CardContent>
            <Divider/>
            <CardContent>
              <Grid container direction="row" justifyContent="flex-end" alignItems="right" spacing={2}>
                <Grid item>
                  <Button variant="contained" className={classes.button}>Sign up</Button>
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