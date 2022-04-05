import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import FPassPage from './components/FPassPage'
import Dashboard from './components/Dashboard'
import ErrorPopup from './components/ErrorPopup'


function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [snackbarMsg, setSnackbarMsg] = React.useState('')

  return (
    <Router>
      {/* Add Nav Bar Component Here! */}
      <ErrorPopup snackbarMsg={snackbarMsg} setSnackbarMsg={setSnackbarMsg}/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard/> : <LoginPage setIsLoggedIn={setIsLoggedIn} setSnackbarMsg={setSnackbarMsg}/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<FPassPage setSnackbarMsg={setSnackbarMsg}/>} />
      </Routes>
    </Router>
  );
}

export default App;
