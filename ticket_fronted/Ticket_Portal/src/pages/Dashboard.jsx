import { useEffect, useMemo, useState } from 'react'

import Sidebar from '../components/Sidebar'
import API from '../services/api'
import './Dashboard.css'

function Dashboard() {

    const username = localStorage.getItem('username') || 'there'
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const loadTickets = async () => {
            try {
                const response = await API.get('/tickets/all')
                const data = response.data?.data || response.data || []
                setTickets(Array.isArray(data) ? data : [])
            }
            catch {
                setError('Backend ticket list is not reachable yet, showing the workspace shell.')
            }
            finally {
                setLoading(false)
            }
        }

        loadTickets()
    }, [])

    const stats = useMemo(() => {
        const normalized = tickets.map((ticket) => ({
            ...ticket,
            status: (ticket.status || 'Pending').toLowerCase(),
        }))

        return {
            total: normalized.length,
            pending: normalized.filter((ticket) => ticket.status.includes('pending') || ticket.status.includes('open')).length,
            progress: normalized.filter((ticket) => ticket.status.includes('progress') || ticket.status.includes('assigned')).length,
            closed: normalized.filter((ticket) => ticket.status.includes('closed') || ticket.status.includes('resolved')).length,
        }
    }, [tickets])

    const searchResults = useMemo(() => {
        const term = query.trim().toLowerCase()

        if (!term) {
            return tickets.slice(0, 5)
        }

        return tickets.filter((ticket) => {
            const content = [
                ticket.title,
                ticket.description,
                ticket.category,
                ticket.status,
                ticket.assignedto,
                ticket.assignedTo,
                ticket.response,
            ].join(' ').toLowerCase()

            return content.includes(term)
        }).slice(0, 6)
    }, [query, tickets])

    return (

        <div>

            <Sidebar />

            <div className='dashboard'>

                <section className='hero-panel'>
                    <div>
                        <span className='eyebrow'>Customer Support Ticketing Portal</span>
                        <h1>Welcome, {username}</h1>
                        <p>Create, assign, retrieve, and resolve customer issues from one clean workspace.</p>
                    </div>
                    <div className='hero-metric'>
                        <strong>{stats.total}</strong>
                        <span>Total Tickets</span>
                    </div>
                </section>

                {error && <div className='notice'>{error}</div>}

                <div className='cards'>
                    <div className='card accent-blue'>
                        <span>Total Tickets</span>
                        <strong>{loading ? '...' : stats.total}</strong>
                    </div>
                    <div className='card accent-orange'>
                        <span>Pending</span>
                        <strong>{loading ? '...' : stats.pending}</strong>
                    </div>
                    <div className='card accent-cyan'>
                        <span>In Progress</span>
                        <strong>{loading ? '...' : stats.progress}</strong>
                    </div>
                    <div className='card accent-green'>
                        <span>Resolved</span>
                        <strong>{loading ? '...' : stats.closed}</strong>
                    </div>
                </div>

                <section className='content-grid'>
                    <div className='panel'>
                        <div className='section-title'>
                            <div>
                                <span className='eyebrow'>Intelligent Retrieval</span>
                                <h2>Search tickets by issue description</h2>
                            </div>
                        </div>
                        <input
                            className='search-input'
                            placeholder='Try: login error, payment failed, network issue'
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />

                        <div className='ticket-list compact'>
                            {searchResults.length === 0 && <p className='empty-state'>No matching tickets found.</p>}
                            {searchResults.map((ticket) => (
                                <article className='ticket-row' key={ticket.id || ticket.ticketId || ticket.title}>
                                    <div>
                                        <strong>{ticket.title || 'Untitled ticket'}</strong>
                                        <p>{ticket.description || 'No description added.'}</p>
                                    </div>
                                    <span className={`status-pill ${String(ticket.status || 'pending').toLowerCase().replaceAll(' ', '-')}`}>
                                        {ticket.status || 'Pending'}
                                    </span>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className='panel'>
                        <div className='section-title'>
                            <div>
                                <span className='eyebrow'>Workflow</span>
                                <h2>Resolution pipeline</h2>
                            </div>
                        </div>
                        <div className='timeline'>
                            <div><span>1</span><p>Customer creates ticket with category and description.</p></div>
                            <div><span>2</span><p>Support team assigns owner and updates status.</p></div>
                            <div><span>3</span><p>Responses and history stay visible until resolution.</p></div>
                        </div>
                    </div>
                </section>

            </div>

        </div>
    )
}

export default Dashboard
