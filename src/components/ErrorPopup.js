import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ErrorPopup({snackbarMsg, setSnackbarMsg}) {

  function handleSnackbarClose() {
    setSnackbarMsg('')
  }

  return (
    <Snackbar open={snackbarMsg !== ''} onClose={handleSnackbarClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={6000}>
      <Alert onClose={handleSnackbarClose} severity="error">
          {snackbarMsg}
      </Alert>
    </Snackbar>
  )
}

export default ErrorPopup