import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Grid } from '@material-ui/core'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import FPassPage from './components/FPassPage'
import GroupSelectorPage from './components/GroupSelectorPage'
import ErrorPopup from './components/ErrorPopup'
import NavBar from './components/NavBar'
import SideBar from './components/sidebar'

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [group, setGroup] = React.useState(undefined)
  const [groups, setGroups] = React.useState([])

  const [navTitle, setNavTitle] = React.useState('groups')
  const [snackbarMsg, setSnackbarMsg] = React.useState('')

  function logout() {
    setGroups([])
    setGroup(undefined)
    setUsername('')
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <ErrorPopup snackbarMsg={snackbarMsg} setSnackbarMsg={setSnackbarMsg}/>
      {
        isLoggedIn && group !== undefined &&
        <SideBar/>
      }
      <Routes>
        <Route path="/" element={isLoggedIn && group === undefined ? <div><NavBar setGroup={setGroup} setGroups={setGroups} setSnackbarMsg={setSnackbarMsg} groups={groups} logout={logout} navTitle={navTitle} setNavTitle={setNavTitle}/><GroupSelectorPage username={username} setGroup={setGroup} setSnackbarMsg={setSnackbarMsg} groups={groups} setGroups={setGroups}/></div> : <LoginPage setIsLoggedIn={setIsLoggedIn} setSnackbarMsg={setSnackbarMsg} setUsername={setUsername}/>} />
        <Route path="/register" element={<RegisterPage setSnackbarMsg={setSnackbarMsg}/>} />
        <Route path="/forgot-password" element={<FPassPage setSnackbarMsg={setSnackbarMsg}/>} />
        {/* OLD: Just An Idea for showing components with both NavBar and SideBar */}
        {/* <Route path='/temp' element={(isLoggedIn && group !== undefined) ? <CompAdjustor comp={(() => <GroupSelectorPage/>)()} navTitle={navTitle} setNavTitle={setNavTitle} logout={logout}/> : <LoginPage setIsLoggedIn={setIsLoggedIn} setSnackbarMsg={setSnackbarMsg}/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
