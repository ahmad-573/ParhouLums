import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Grid, TextField, Button, Divider, Box, NativeSelect } from '@material-ui/core'
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
    height: 383,
  },
  button: {
    backgroundColor: '#015719',
    color: '#ebebeb',
    '&:hover': {
      backgroundColor: '#007821'
    }
  },
  button2: {
    backgroundColor: '#d4d4d4',
    // color: '#ebebeb',
    '&:hover': {
      backgroundColor: '#e8e8e8'
    }
  }
}));

const validationSchemaRegister = yup.object({
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

});

function RegisterPage() {

  const classes = useStyles();

  const formikFPass = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordAgain: '',
      securityQuestion: '',
      answer: '',
    },
    validationSchema: validationSchemaRegister,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 5));
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
                      <Typography className={classes.textHeading} align='left'>Forgot Password</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>  
                  <Typography className={classes.textLabel} align='left'>Security Question</Typography>
                  <NativeSelect
                    variant = "outlined"
                    style={{ width: 500, fontSize: 12}}
                    defaultValue={30}
                    inputProps={{
                      name: 'Security Question',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
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
                  value={formikFPass.values.answer}
                  placeholder="Qwerty12345"
                  type="answer"
                  onChange={formikFPass.handleChange}
                  error={formikFPass.touched.answer && Boolean(formikFPass.errors.answer)}
                  helperText={formikFPass.touched.answer && formikFPass.errors.answer}
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
                  value={formikFPass.values.email}
                  placeholder="23100138@lums.edu.pk"
                  onChange={formikFPass.handleChange}
                  error={formikFPass.touched.email && Boolean(formikFPass.errors.email)}
                  helperText={formikFPass.touched.email && formikFPass.errors.email}
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
                  value={formikFPass.values.password}
                  placeholder="Qwerty12345"
                  type="password"
                  onChange={formikFPass.handleChange}
                  error={formikFPass.touched.password && Boolean(formikFPass.errors.password)}
                  helperText={formikFPass.touched.password && formikFPass.errors.password}
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
                  value={formikFPass.values.passwordAgain}
                  placeholder="Qwerty12345"
                  type="password"
                  onChange={formikFPass.handleChange}
                  error={formikFPass.touched.passwordAgain && Boolean(formikFPass.errors.passwordAgain)}
                  helperText={formikFPass.touched.passwordAgain && formikFPass.errors.passwordAgain}
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
                  <Button component = {Link} to = "/" variant="contained" className={classes.button2}>Cancel</Button>
                </Grid>
                <Grid item>
                  <Button component = {Link} to = "/" variant="contained" className={classes.button}>Update</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default RegisterPage;