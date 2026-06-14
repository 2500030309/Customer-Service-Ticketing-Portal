import { useEffect, useMemo, useState } from 'react'

import Sidebar from '../components/Sidebar'
import API from '../services/api'
import './UserManager.css'

function UserManager() {

    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 1,
    })
    const [showEditForm, setShowEditForm] = useState(false)
    const [editUserId, setEditUserId] = useState(null)
    const [editData, setEditData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 1,
    })

    const saveUser = async () => {

        try {

            await API.post(
                '/auth/saveuser',
                formData
            )

            alert('User Created')

            window.location.reload()

        } catch (error) {

            console.log(error)

            alert('Unable to create user')
        }
    }

    const deleteUser = async (id) => {

        try {

            await API.delete(
                `/auth/deleteuser/${id}`
            )

            window.location.reload()

        }
        catch (error) {

            console.log(error)
        }
    }

    const editUser = async (id) => {

        try {

            const response = await API.get(
                `/auth/getuser/${id}`
            )

            setEditUserId(id)

            setEditData({
                username: response.data.username,
                email: response.data.email,
                password: response.data.password,
                phoneNumber: response.data.phoneNumber,
                role: response.data.role,
            })

            setShowEditForm(true)

        } catch (error) {

            console.log(error)
        }
    }

    const updateUser = async () => {

        try {

            await API.put(
                `/auth/updateuser/${editUserId}`,
                editData
            )

            alert('User Updated Successfully')

            setShowEditForm(false)

            window.location.reload()

        } catch (error) {

            console.log(error)

            alert('Update Failed')
        }
    }

    useEffect(() => {

        const loadUsers = async () => {

            try {

                const response = await API.get('/auth/users/all')

                const data =
                    response.data?.data ||
                    response.data ||
                    []

                setUsers(Array.isArray(data) ? data : [])

            }
            catch (error) {

                console.log(error)

                setMessage(
                    'Unable to fetch users from backend.'
                )
            }
            finally {

                setLoading(false)
            }
        }

        loadUsers()

    }, [])

    const filteredUsers = useMemo(() => {

        const term = query.trim().toLowerCase()

        if (!term) return users

        return users.filter((user) => [

            user.username,
            user.email,
            user.phoneNumber,
            user.role,

        ].join(' ').toLowerCase().includes(term))

    }, [users, query])

    return (

        <div>

            <Sidebar />

            <div className='dashboard'>

                <section className='page-header'>

                    <div>

                        <span className='eyebrow'>
                            Administration
                        </span>

                        <h1>User Manager</h1>

                        <p>
                            View all registered users,
                            roles and account details.
                        </p>

                    </div>

                </section>

                <section className='panel user-toolbar'>

                    <input
                        className='search-input'
                        placeholder='Search users'
                        value={query}
                        onChange={(event) =>
                            setQuery(event.target.value)
                        }
                    />

                    <span>
                        {filteredUsers.length} users
                    </span>

                    <button
                        className='primary-button'
                        onClick={() => setShowForm(true)}
                    >
                        Add New
                    </button>

                </section>

                {
                    showForm && (

                        <div className='panel user-form'>

                            <h3>Create User</h3>

                            <input
                                placeholder='Username'
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    })
                                }
                            />

                            <input
                                placeholder='Email'
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                            />

                            <input
                                placeholder='Password'
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                            />

                            <input
                                placeholder='Phone Number'
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phoneNumber: e.target.value,
                                    })
                                }
                            />

                            <select
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        role: Number(e.target.value),
                                    })
                                }
                            >
                                <option value='1'>User</option>
                                <option value='2'>Manager</option>
                                <option value='3'>Admin</option>
                            </select>

                            <button
                                className='primary-button'
                                onClick={saveUser}
                            >
                                Save User
                            </button>

                        </div>
                    )
                }

                {
                    showEditForm && (

                        <div className='modal-overlay'>

                            <div className='modal-box'>

                                <h3>Update User</h3>

                                <input
                                    value={editData.username}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            username: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    value={editData.email}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            email: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    value={editData.password}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            password: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    value={editData.phoneNumber}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            phoneNumber: e.target.value,
                                        })
                                    }
                                />

                                <select
                                    value={editData.role}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            role: Number(e.target.value),
                                        })
                                    }
                                >

                                    <option value='1'>User</option>

                                    <option value='2'>Manager</option>

                                    <option value='3'>Admin</option>

                                </select>

                                <button onClick={updateUser}>
                                    Save Changes
                                </button>

                                <button
                                    onClick={() => setShowEditForm(false)}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    )
                }

                {
                    message &&
                    <div className='notice'>
                        {message}
                    </div>
                }

                <section className='panel table-panel'>

                    {
                        loading &&
                        <div className='empty-state'>
                            Loading users...
                        </div>
                    }

                    {
                        !loading &&
                        filteredUsers.length === 0 &&
                        <div className='empty-state'>
                            No users found.
                        </div>
                    }

                    {
                        !loading &&
                        filteredUsers.length > 0 && (

                            <table className='users-table'>

                                <thead>

                                    <tr>

                                        <th>S#</th>
                                        <th>Username</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        filteredUsers.map(
                                            (user, index) => (

                                                <tr key={user.id}>

                                                    <td>
                                                        {index + 1}
                                                    </td>

                                                    <td>
                                                        {user.username}
                                                    </td>

                                                    <td>
                                                        {user.phoneNumber}
                                                    </td>

                                                    <td>
                                                        {user.email}
                                                    </td>

                                                    <td>

                                                        <span className='role-pill'>
                                                            {user.role}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <div className='action-buttons'>

                                                            <button
                                                                onClick={() => editUser(user.id)}
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    deleteUser(user.id)
                                                                }
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>
                                            )
                                        )
                                    }

                                </tbody>

                            </table>
                        )
                    }

                </section>

            </div>

        </div>
    )
}

export default UserManager
