import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'

import Login from './pages/Login'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <div className='App relative min-h-screen w-full bg-slate-100'>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/*' element={<HomePage />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
