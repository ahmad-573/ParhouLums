import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import FPassPage from './components/FPassPage'
import Dashboard from './components/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  return (
    <Router>
      {/* Add Nav Bar Component Here! */}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard/> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<FPassPage />} />
      </Routes>
    </Router>
  );
}

export default App;
