import { useState } from 'react'
import './App.css'

import Login from './pages/Login'
import Home from './pages/Private/Home'
import MySchedules from './pages/Private/MySchedules'
import CreateSchedule from './pages/Private/CreateSchedule'
import Register from './pages/Register'

import { Routes, Route, BrowserRouter, } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Home />} path="/home" />
        <Route element={<MySchedules />} path="/myschedules" />
        <Route element={<CreateSchedule />} path="/createschedule" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
