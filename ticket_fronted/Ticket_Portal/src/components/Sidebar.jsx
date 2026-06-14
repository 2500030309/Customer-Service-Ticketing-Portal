import './Sidebar.css'

import { Link, useLocation, useNavigate } from 'react-router-dom'

function Sidebar() {

    const roleStr = localStorage.getItem('role')
    const role = parseInt(roleStr, 10) || 1  // Convert to number, default to 1 (customer)
    const username = localStorage.getItem('username') || 'Support User'
    const location = useLocation()
    const navigate = useNavigate()

    const navItems = [
        { to: '/dashboard', icon: '/dashboard.png', label: 'Dashboard' },
        { to: '/create-ticket', icon: '/mytask.png', label: 'Create Ticket' },
        { to: '/ticket-manager', icon: '/taskmanager.png', label: 'Ticket Manager', show: role === 2 || role === 3 },
        { to: '/user-manager', icon: '/usermanager.png', label: 'User Manager', show: role === 3 },
        { to: '/profile', icon: '/myprofile.png', label: 'Profile' },
    ]

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (

        <div className='sidebar'>

            <div className='sidebar-brand'>
                <img src='/logo.png' alt='' />
                <div>
                    <h2>Ticket Portal</h2>
                    <span>Support Desk</span>
                </div>
            </div>

            <nav className='sidebar-nav'>
                {navItems.filter((item) => item.show !== false).map((item) => (
                    <Link
                        className={location.pathname === item.to ? 'active' : ''}
                        key={item.to}
                        to={item.to}
                    >
                        <img src={item.icon} alt='' /> {item.label}
                    </Link>
                ))}
            </nav>

            <div className='sidebar-user'>
                <div className='avatar'>{username.charAt(0).toUpperCase()}</div>
                <div>
                    <strong>{username}</strong>
                    <span>Role {role || 'User'}</span>
                </div>
            </div>

            <button className='logout-button' onClick={logout}>
                <img src='/logout.png' alt='' /> Logout
            </button>

        </div>
    )
}

export default Sidebar
