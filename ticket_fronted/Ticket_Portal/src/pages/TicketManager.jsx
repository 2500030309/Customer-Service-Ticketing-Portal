import { useCallback, useEffect, useMemo, useState } from 'react'

import Sidebar from '../components/Sidebar'
import API from '../services/api'
import './TicketManager.css'

function TicketManager() {
    const [tickets, setTickets] = useState([])
    const [query, setQuery] = useState('')
    const [status, setStatus] = useState('All')
    const [category, setCategory] = useState('All')
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const role = localStorage.getItem("role")

    const loadTickets = useCallback(async () => {
        try {
            setLoading(true)
            const response = await API.get('/tickets')
            const data = response.data?.data || response.data || []
            setTickets(Array.isArray(data) ? data : [])
            setMessage('')
        }
        catch {
            setMessage('Could not load tickets from backend. Confirm the ticket list endpoint is running.')
        }
        finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        // Initial API synchronization for the manager workspace.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTickets()
    }, [loadTickets])

    const categories = useMemo(() => {
        return ['All', ...new Set(tickets.map((ticket) => ticket.category).filter(Boolean))]
    }, [tickets])

    const filteredTickets = useMemo(() => {
        const term = query.trim().toLowerCase()

        return tickets.filter((ticket) => {
            const ticketStatus = ticket.status || 'Pending'
            const matchesStatus = status === 'All' || ticketStatus === status
            const matchesCategory = category === 'All' || ticket.category === category
            const searchable = [
                ticket.title,
                ticket.description,
                ticket.category,
                ticketStatus,
                ticket.assignedto,
                ticket.assignedTo,
                ticket.response,
            ].join(' ').toLowerCase()

            return matchesStatus && matchesCategory && (!term || searchable.includes(term))
        })
    }, [tickets, query, status, category])

    const updateTicket = async (ticket, updates) => {
        const id = ticket.id || ticket.ticketId || ticket.ticketNumber || ticket._id

        if (!id) {
            setMessage('This ticket does not include an id, so it cannot be updated from the UI yet.')
            return
        }

        const nextTicket = { ...ticket, ...updates }

        try {
            setTickets((current) => current.map((item) => {
                const itemId = item.id || item.ticketId || item.ticketNumber || item._id
                return itemId === id ? nextTicket : item
            }))

            await API.put(`/tickets/${id}`, nextTicket)
            setMessage('Ticket workflow updated.')
        }
        catch {
            setMessage('Update failed. Check whether your backend uses PUT /tickets/{id} or a different route.')
            loadTickets()
        }
    }

    const deleteTicket = async (ticketNumber) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ticket?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(
                `/tickets/delete/${ticketNumber}`
            );

            alert("Ticket Deleted Successfully");

            loadTickets();
        } catch (error) {
            console.error(error);
            alert("Delete Failed");
        }
    };

    return (
        <div>
            <Sidebar />

            <div className='dashboard'>
                <section className='page-header'>
                    <div>
                        <span className='eyebrow'>Assignment and Resolution</span>
                        <h1>Ticket Manager</h1>
                        <p>Filter, assign, update status, and keep the resolution workflow moving.</p>
                    </div>
                    <button className='secondary-button' onClick={loadTickets}>Refresh</button>
                </section>

                <section className='manager-toolbar panel'>
                    <input
                        className='search-input'
                        placeholder='Search by user query, category, title, or issue description'
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <select className='form-select' value={status} onChange={(event) => setStatus(event.target.value)}>
                        <option>All</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                    </select>
                    <select className='form-select' value={category} onChange={(event) => setCategory(event.target.value)}>
                        {categories.map((item) => <option key={item}>{item}</option>)}
                    </select>
                </section>

                {message && <div className='notice'>{message}</div>}

                <section className='ticket-board'>
                    {loading && <div className='panel empty-state'>Loading tickets...</div>}
                    {!loading && filteredTickets.length === 0 && <div className='panel empty-state'>No tickets match the current filters.</div>}

                    {filteredTickets.map((ticket) => (
                        <article className='manager-ticket' key={ticket.id || ticket.ticketId || ticket.ticketNumber || ticket._id || ticket.title}>
                            <div className='ticket-main'>
                                <div className='ticket-title-line'>
                                    <span className={`status-pill ${String(ticket.status || 'pending').toLowerCase().replaceAll(' ', '-')}`}>
                                        {ticket.status || 'Pending'}
                                    </span>
                                    <span className='category-chip'>{ticket.category || 'General'}</span>
                                </div>
                                <h2>{ticket.title || 'Untitled ticket'}</h2>
                                <p>{ticket.description || 'No issue description available.'}</p>
                                <div className='history-box'>
                                    <strong>History and responses</strong>
                                    <span>{ticket.response || ticket.history || 'No responses added yet.'}</span>
                                </div>
                            </div>

                            <div className='ticket-actions'>
                                <label>
                                    Assigned to
                                    <input
                                        className='form-input'
                                        value={ticket.assignedto || ticket.assignedTo || ''}
                                        onChange={(event) => updateTicket(ticket, { assignedto: event.target.value })}
                                        placeholder='Agent name'
                                    />
                                </label>
                                <label>
                                    Status
                                    <select
                                        className='form-select'
                                        value={ticket.status || 'Pending'}
                                        onChange={(event) => updateTicket(ticket, { status: event.target.value })}
                                    >
                                        <option>Pending</option>
                                        <option>In Progress</option>
                                        <option>Resolved</option>
                                        <option>Closed</option>
                                    </select>
                                </label>
                                {
                                    (role === "2" || role === "3") && (
                                        <button
                                            className="btn btn-danger secondary-button danger-button"
                                            onClick={() => deleteTicket(ticket.ticketNumber || ticket.id || ticket.ticketId || ticket._id)}
                                            style={{ marginTop: '10px' }}
                                        >
                                            Delete
                                        </button>
                                    )
                                }
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    )
}

export default TicketManager
