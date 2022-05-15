import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Product from './pages/Product'
import SalesOrder from './pages/SalesOrder'

function App() {
  return (
    <Router>
      <div className='App w-full min-h-screen bg-slate-100 relative'>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/*' element={<HomePage />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='product' element={<Product />} />
            <Route path='sales-order' element={<SalesOrder />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
