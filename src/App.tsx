import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/SignUp/Signup'
import Home from './pages/Home/Home'
import { Routes, Route, Navigate } from "react-router-dom"
import { UserProvider } from './pages/userdata'

import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  return (
    <UserProvider>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />

        </Route>

      </Routes>
    </UserProvider>
  )
}

export default App