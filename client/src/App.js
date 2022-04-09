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
import FrontSideNote from "./components/FrontSideNote";
import BackSideNote from "./components/BackSideNote";
import Note from "./components/Note";
import GridNotes from "./components/GridNotes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  // Username state
  const [group, setGroup] = React.useState(undefined)
  const [snackbarMsg, setSnackbarMsg] = React.useState('')

  function logout() {
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
        <Route path="/" element={isLoggedIn ? <div><NavBar logout={logout}/><GroupSelectorPage/></div> : <LoginPage setIsLoggedIn={setIsLoggedIn} setSnackbarMsg={setSnackbarMsg}/>} />
        <Route path="/register" element={<RegisterPage setSnackbarMsg={setSnackbarMsg}/>} />
        <Route path="/forgot-password" element={<FPassPage setSnackbarMsg={setSnackbarMsg}/>} />
        {/* <Route path = "/frontcard" element = {<FrontSideNote/>}/> */}
        {/* <Route path = "/backcard" element = {<BackSideNote/>}/> */}
        {/* <Route path = "/card" element = {<Note/>}/> */}
        <Route path = "/gridcard" element = {<GridNotes/>}/>
        {/* OLD: Just An Idea for showing components with both NavBar and SideBar */}
        {/* <Route path='/temp' element={(isLoggedIn && group !== undefined) ? <CompAdjustor comp={(() => <GroupSelectorPage/>)()} navTitle={navTitle} setNavTitle={setNavTitle} logout={logout}/> : <LoginPage setIsLoggedIn={setIsLoggedIn} setSnackbarMsg={setSnackbarMsg}/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
