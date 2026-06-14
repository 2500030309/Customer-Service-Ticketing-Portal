import Sidebar from '../components/Sidebar'
import './Profile.css'

function Profile() {
    const username = localStorage.getItem('username') || 'Support User'
    const role = localStorage.getItem('role') || '1'
    const token = localStorage.getItem('token')

    const roleName = {
        1: 'Customer',
        2: 'Support Agent',
        3: 'Administrator',
    }[role] || 'User'

    return (
        <div>
            <Sidebar />

            <div className='dashboard'>
                <section className='page-header'>
                    <div>
                        <span className='eyebrow'>My Profile</span>
                        <h1>{username}</h1>
                        <p>Account details used by the ticketing portal session.</p>
                    </div>
                </section>

                <section className='profile-grid'>
                    <div className='panel profile-card'>
                        <div className='profile-avatar'>{username.charAt(0).toUpperCase()}</div>
                        <h2>{username}</h2>
                        <span>{roleName}</span>
                    </div>

                    <div className='panel profile-details'>
                        <div>
                            <span>Username</span>
                            <strong>{username}</strong>
                        </div>
                        <div>
                            <span>Role</span>
                            <strong>{roleName}</strong>
                        </div>
                        <div>
                            <span>Auth token</span>
                            <strong>{token ? 'Active session' : 'Not available'}</strong>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Profile
