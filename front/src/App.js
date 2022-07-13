import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom'
import Home from './components/pages/Home'
import VaraaSivu from './components/pages/VaraaSivu'
import './App.css'

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home/>} />
          <Route path='/varaasivu' element={<VaraaSivu/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App