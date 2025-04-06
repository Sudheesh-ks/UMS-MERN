import React from 'react'
import { Routes,Route } from 'react-router-dom'
import UserRegister from "../pages/user/Register"
import UserLogin from "../pages/user/Login"
import UserHome from "../pages/user/Home"
import AdminDashboard from "../pages/admin/Dashboard"
import ProtectedRoute from "../components/ProtectedRoute"
import NotFound from "../components/user/NotFound"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path="/" element={<UserHome />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default AppRoutes
