import React from 'react'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom'
import Home from './components/pages/Home'
import VaraaSivu from './components/pages/VaraaSivu'
import './App.css'

const App = () => {
  return (
    <>
      <Router>

        <Routes>
          <Route index element={<Home/>} />
          <Route path='/varaasivu' element={<VaraaSivu/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App