import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Box, Toolbar } from '@material-ui/core'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import FPassPage from './components/FPassPage'
import GroupSelectorPage from './components/GroupSelectorPage'
import ErrorPopup from './components/ErrorPopup'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import FrontSideNote from "./components/FrontSideNote";
import BackSideNote from "./components/BackSideNote";
import Note from "./components/Note";
import GridNotes from "./components/GridNotes";
import CreateModal from "./components/CreateModal";
import EditModal from "./components/EditModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [group, setGroup] = React.useState(undefined) // {name: 'G1', group_id: 1, status: 1}
  const [groups, setGroups] = React.useState([])
  
  const [navTitle, setNavTitle] = React.useState('groups')
  const [snackbarMsg, setSnackbarMsg] = React.useState('')
  
  const sidebarWidth = 300

  function unSetGroup() {
    setGroups([])
    setGroup(undefined)
    setNavTitle('groups')
  }

  function logout() {
    unSetGroup()
    setUsername('')
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        {/* NavBar */}
        {
          isLoggedIn && 
          <NavBar setGroup={setGroup} setGroups={setGroups} setSnackbarMsg={setSnackbarMsg} groups={groups} logout={logout} navTitle={navTitle} setNavTitle={setNavTitle} sidebarWidth={group === undefined ? 0 : sidebarWidth}/>
        }
        {/* ErrorPopup */}
        <ErrorPopup snackbarMsg={snackbarMsg} setSnackbarMsg={setSnackbarMsg}/>
        {/* SideBar */}
        {
          isLoggedIn && group !== undefined &&
          <SideBar username={username} setNavTitle={setNavTitle} group={group} setSnackbarMsg={setSnackbarMsg} unSetGroup={unSetGroup} setGroup={setGroup}/>
        }
        <Box
          component="main"
          style={{ flexGrow: 1, bgcolor: "background.default"}}
        >
          <Toolbar />
          {/* Routes */}
          <Routes>
            <Route path='/' element={(isLoggedIn && group === undefined) ? <GroupSelectorPage username={username} setGroup={setGroup} setSnackbarMsg={setSnackbarMsg} groups={groups} setGroups={setGroups}/> : ((!isLoggedIn) ? <LoginPage setIsLoggedIn={setIsLoggedIn} setSnackbarMsg={setSnackbarMsg} setUsername={setUsername}/> : <div></div>)}/>
            <Route path='/register' element={<RegisterPage setSnackbarMsg={setSnackbarMsg}/>}/>
            <Route path='/forgot-password' element={<FPassPage setSnackbarMsg={setSnackbarMsg}/>}/>
            <Route path='/gridcard' element={<GridNotes/>}/>
            <Route path='/create-modal' element={<CreateModal/>}/>
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
