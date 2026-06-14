import './Login.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import API from '../services/api'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const loginUser = async (event) => {

        event.preventDefault()

        if (!email.trim() || !password.trim()) {

            setMessage('Please enter both email and password.')
            return

        }

        try {

            setLoading(true)
            setMessage('')

            const response = await API.post('/auth/signin', {
                email,
                password
            })

            console.log('LOGIN RESPONSE:', response.data)

            // FastAPI wrapped response
            const backendData = response.data?.data || response.data

            console.log('BACKEND DATA:', backendData)

            // If backend returned plain string
            if (typeof backendData === 'string') {

                setMessage('Backend returned invalid response.')
                return

            }

            // Extract values safely
            const token = backendData.token || 'dummy-token'

            const role = backendData.role
                ? String(backendData.role)
                : '1'

            const username =
                backendData.username ||
                backendData.name ||
                email

            // Save to localStorage
            localStorage.setItem('token', token)

            localStorage.setItem('role', role)

            localStorage.setItem('username', username)

            console.log('ROLE SAVED:', role)

            setMessage('Login successful')

            navigate('/dashboard')

        }

        catch (error) {

            console.error('LOGIN ERROR:', error)

            if (error.response) {

                setMessage(
                    error.response.data?.message ||
                    'Invalid email or password.'
                )

            }
            else {

                setMessage(
                    'Backend connection failed. Check Spring and FastAPI servers.'
                )

            }

        }

        finally {

            setLoading(false)

        }

    }

    return (

        <div className='login-container'>

            <form
                className='login-box'
                onSubmit={loginUser}
            >

                <div className='login-brand'>

                    <img
                        src='/logo.png'
                        alt='Logo'
                    />

                    <span>Support Desk</span>

                </div>

                <h1>
                    Customer Support Ticketing Portal
                </h1>

                <p>
                    Track issues, assignments,
                    responses, and resolutions
                    from one workspace.
                </p>

                <input
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                {message && (

                    <div className='login-message'>

                        {message}

                    </div>

                )}

                <button disabled={loading}>

                    {loading
                        ? 'Signing in...'
                        : 'Login'}

                </button>

                <p className='auth-link'>
                    Don&apos;t have an account?{' '}
                    <span
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </span>
                </p>

            </form>

        </div>

    )
}

export default Login
