import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HotelReg from './components/HotelReg'

import Home from './pages/Home'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'

import Layout from './pages/Owner/Layout'
import Dashboard from './pages/Owner/Dashboard'
import ListRoom from './pages/Owner/ListRoom'
import AddRoom from './pages/Owner/AddRoom'

const App = () => {
  const location = useLocation()
  const isOwnerPath = location.pathname.startsWith('/owner')

  return (
    <div className="flex flex-col min-h-screen">

      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}

      <div className="flex-1">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          {/* Owner Routes */}
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>

      {!isOwnerPath && <Footer />}
    </div>
  )
}

export default App
