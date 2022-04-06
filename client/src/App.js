import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Grid } from '@material-ui/core'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import FPassPage from './components/FPassPage'
import GroupSelectorPage from './components/GroupSelectorPage'
import ErrorPopup from './components/ErrorPopup'
import NavBar from './components/NavBar'
import CompAdjustor from './components/CompAdjustor'
import Sidebar from './components/sidebar'
import Chat from './components/chat'


function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  // Username State
  const [group, setGroup] = React.useState(undefined)
  const [navTitle, setNavTitle] = React.useState('groups')
  const [snackbarMsg, setSnackbarMsg] = React.useState('')

  function logout() {
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <ErrorPopup snackbarMsg={snackbarMsg} setSnackbarMsg={setSnackbarMsg}/>
      {
        isLoggedIn && group === undefined &&
        <NavBar navTitle={navTitle} setNavTitle={setNavTitle} logout={logout}/>
      }
      <Routes>
        <Route path="/" element={isLoggedIn ? <GroupSelectorPage/> : <LoginPage setIsLoggedIn={setIsLoggedIn} setSnackbarMsg={setSnackbarMsg}/>} />
        <Route path="/register" element={<RegisterPage setSnackbarMsg={setSnackbarMsg}/>} />
        <Route path="/forgot-password" element={<FPassPage setSnackbarMsg={setSnackbarMsg}/>} />
        <Route path="/sidebar" element={<Sidebar />} />

        {/* Just An Idea for showing components with both NavBar and SideBar */}
        {/* <Route path='/temp' element={(isLoggedIn && group !== undefined) ? <CompAdjustor comp={(() => <GroupSelectorPage/>)()} navTitle={navTitle} setNavTitle={setNavTitle} logout={logout}/> : <LoginPage setIsLoggedIn={setIsLoggedIn} setSnackbarMsg={setSnackbarMsg}/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
