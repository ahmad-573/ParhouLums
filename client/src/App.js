import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import FPassPage from './components/FPassPage'
import Dashboard from './components/Dashboard'
import ErrorPopup from './components/ErrorPopup'
import NavBar from './components/NavBar'

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  // Username State
  // Group State -> Name & Id
  const [navTitle, setNavTitle] = React.useState('groups')
  const [snackbarMsg, setSnackbarMsg] = React.useState('')

  function logout() {
    setIsLoggedIn(false)
  }

  return (
    <Router>
      {
        isLoggedIn &&
        <NavBar navTitle={navTitle} setNavTitle={setNavTitle} logout={logout}/>
      }
      <ErrorPopup snackbarMsg={snackbarMsg} setSnackbarMsg={setSnackbarMsg}/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard/> : <LoginPage setIsLoggedIn={setIsLoggedIn} setSnackbarMsg={setSnackbarMsg}/>} />
        <Route path="/register" element={<RegisterPage setSnackbarMsg={setSnackbarMsg}/>} />
        <Route path="/forgot-password" element={<FPassPage setSnackbarMsg={setSnackbarMsg}/>} />
      </Routes>
    </Router>
  );
}

export default App;
