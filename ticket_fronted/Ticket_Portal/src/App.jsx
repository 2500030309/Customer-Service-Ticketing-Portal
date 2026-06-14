import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateTicket from './pages/CreateTicket'
import TicketList from './pages/TicketList'
import UserManager from './pages/UserManager'
import Profile from './pages/Profile'
import Signup from "./pages/Signup";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Login />} />

                <Route path='/dashboard' element={<Dashboard />} />

                <Route path='/create-ticket' element={<CreateTicket />} />

                <Route path='/ticket-manager' element={<TicketList />} />

                <Route path='/user-manager' element={<UserManager />} />
                <Route path='/usermanager' element={<Navigate to='/user-manager' replace />} />

                
                <Route path='/profile' element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            </Routes>

        </BrowserRouter>

    )
}

export default App
