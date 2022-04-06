import React from "react";
import { Grid } from '@material-ui/core'
import NavBar from './NavBar'
import SideBar from './sidebar'

function CompAdjustor({comp, navTitle, setNavTitle, logout}) {

  return (
    <Grid container direction='row' justifyContent='flex-start'>
      <Grid item xs={2}>
        <SideBar/>
      </Grid>
      <Grid item xs={10}>
        <NavBar navTitle={navTitle} setNavTitle={setNavTitle} logout={logout}/>
        {comp}
      </Grid>
    </Grid>
  )
}

export default CompAdjustor