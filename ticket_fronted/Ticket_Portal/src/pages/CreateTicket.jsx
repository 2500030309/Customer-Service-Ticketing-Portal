import { useState } from 'react'

import Sidebar from '../components/Sidebar'
import API from '../services/api'
import './CreateTicket.css'

function CreateTicket() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Technical')
    const [priority, setPriority] = useState('Medium')
    const [assignedto, setAssignedto] = useState('')
    const [message, setMessage] = useState('')
    const [saving, setSaving] = useState(false)

    const createTicket = async (event) => {
        event.preventDefault()

        if (!title.trim() || !description.trim()) {
            setMessage('Please add a title and description before creating the ticket.')
            return
        }

        try {
            setSaving(true)
            setMessage('')

           await API.post('/tickets/create', {
                 ticketNumber: Date.now(),
                 username: 'Sai',
                 title,
                 description
            })

            setTitle('')
            setDescription('')
            setCategory('Technical')
            setPriority('Medium')
            setAssignedto('')
            setMessage('Ticket created successfully. The support workflow can now pick it up.')

        }
        catch {
            setMessage('Error creating ticket. Please check that your backend is running.')
        }
        finally {
            setSaving(false)
        }
    }

    return (

        <div>

            <Sidebar />

            <div className='dashboard'>

                <section className='page-header'>
                    <div>
                        <span className='eyebrow'>Ticket Creation</span>
                        <h1>Create a support ticket</h1>
                        <p>Capture the problem clearly so retrieval, assignment, and resolution become easier.</p>
                    </div>
                </section>

                <section className='create-layout'>
                    <form className='panel ticket-form' onSubmit={createTicket}>
                        <label>
                            Ticket title
                            <input
                                className='form-input'
                                placeholder='Example: Cannot access student payment receipt'
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </label>

                        <label>
                            Issue description
                            <textarea
                                className='form-textarea'
                                placeholder='Describe the user, error message, actions already tried, and expected result.'
                                rows='6'
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </label>

                        <div className='form-grid'>
                            <label>
                                Category
                                <select className='form-select' value={category} onChange={(event) => setCategory(event.target.value)}>
                                    <option>Technical</option>
                                    <option>Billing</option>
                                    <option>Account</option>
                                    <option>Network</option>
                                    <option>Software</option>
                                    <option>Hardware</option>
                                </select>
                            </label>

                            <label>
                                Priority
                                <select className='form-select' value={priority} onChange={(event) => setPriority(event.target.value)}>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                </select>
                            </label>
                        </div>

                        <label>
                            Assign to
                            <input
                                className='form-input'
                                placeholder='Support agent name or email'
                                value={assignedto}
                                onChange={(event) => setAssignedto(event.target.value)}
                            />
                        </label>

                        {message && <div className='form-message'>{message}</div>}

                        <button className='primary-button' disabled={saving}>
                            {saving ? 'Creating...' : 'Create Ticket'}
                        </button>
                    </form>

                    <aside className='panel helper-panel'>
                        <span className='eyebrow'>Smart Routing</span>
                        <h2>Good tickets resolve faster</h2>
                        <p>Use category and priority to help your backend route issues. Detailed descriptions also improve intelligent retrieval when users search by symptoms.</p>
                        <div className='hint-list'>
                            <span>Login and access issues: Account</span>
                            <span>Payment and receipt problems: Billing</span>
                            <span>Server, API, or deployment errors: Technical</span>
                        </div>
                    </aside>
                </section>

            </div>

        </div>
    )
}

export default CreateTicket
