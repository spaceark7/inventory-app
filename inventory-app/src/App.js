import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <div className='App w-full min-h-screen bg-slate-100 relative'>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/*' element={<HomePage />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
