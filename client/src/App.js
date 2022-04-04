import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import FPassPage from './components/FPassPage'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <Router>
      {/* Add Nav Bar Component Here! */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<FPassPage />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
