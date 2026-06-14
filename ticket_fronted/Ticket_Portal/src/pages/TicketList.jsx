import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import Sidebar from '../components/Sidebar'
import API from '../services/api'
import './Dashboard.css'

function TicketList() {

    const role = localStorage.getItem("role")
    const [tickets, setTickets] = useState([])
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [commentMessage, setCommentMessage] = useState('')

    const getTickets = useCallback(async () => {

        try {

            const response = await API.get('/tickets/all')

            console.log('TICKET RESPONSE:', response.data)

            let data = []

            if (Array.isArray(response.data)) {
                data = response.data
            }
            else if (Array.isArray(response.data.data)) {
                data = response.data.data
            }

            setTickets(data)

        }

        catch (error) {

            console.log(error)

            setMessage('Cannot load tickets')

        }

        finally {

            setLoading(false)

        }

    }, [])

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getTickets()

    }, [getTickets])

    const changeStatus = async (
        ticketNumber,
        status
    ) => {

        await axios.put(
            `http://localhost:8001/tickets/status/${ticketNumber}`,
            null,
            {
                params: { status },
            }
        )

        getTickets()
    }

    const loadTickets = getTickets;

    const deleteTicket = async (ticketNumber) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ticket?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:8001/tickets/delete/${ticketNumber}`
            );

            alert("Ticket Deleted Successfully");

            if (selectedTicket === ticketNumber) {
                setSelectedTicket(null)
                setComments([])
                setComment('')
                setCommentMessage('')
            }

            loadTickets();

        }
        catch (error) {

            console.error(error)

            alert("Delete Failed")
        }
    }

    const selectedTicketData = tickets.find(
        (ticket) => ticket.ticketNumber === selectedTicket
    )

    const loadComments = async (ticketNumber) => {

        try {

            const response = await API.get(`/comments/${ticketNumber}`)
            const data =
                response.data?.data ||
                response.data?.comments ||
                []

            setComments(Array.isArray(data) ? data : [])

        }
        catch (error) {

            console.log(error)
            setComments([])
            setCommentMessage('Unable to load comments.')
        }
    }

    const saveComment = async () => {

        if (!selectedTicket) {
            setCommentMessage('Select a ticket first.')
            return
        }

        if (!comment.trim()) {
            setCommentMessage('Enter a comment before saving.')
            return
        }

        try {

            const username = localStorage.getItem('username') || 'Support User'

            await API.post(
                '/comments/add',
                {
                    ticketNumber: selectedTicket,
                    comment: comment,
                    commentBy: username,
                    status: 'PENDING',
                }
            )

            setComment('')
            setCommentMessage('Comment added successfully.')
            loadComments(selectedTicket)

        }
        catch (error) {

            console.log(error)

            setCommentMessage('Unable to add comment.')
        }
    }

    return (

        <div>

            <Sidebar />

            <div className='dashboard'>

                <section className='page-header'>
                    <div>
                        <span className='eyebrow'>Ticket Overview</span>
                        <h1>Ticket Manager</h1>
                        <p>Review submitted tickets, current priorities, categories, and resolution status.</p>
                    </div>
                </section>

                {message && <div className='notice'>{message}</div>}

                {

                    loading ?

                        <div className='panel empty-state'>Loading tickets...</div>

                        :

                        <section className='panel table-panel data-table-wrap'>

                        <table className='data-table'>

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    tickets.length > 0 ?

                                        tickets.map((ticket) => (

                                            <tr key={ticket.ticketNumber}>

                                                <td>{ticket.ticketNumber}</td>
                                                <td>{ticket.title}</td>
                                                <td>{ticket.description}</td>
                                            <td>{ticket.category}</td>
                                            <td>{ticket.priority}</td>
                                            <td>
                                                <select
                                                    className={`status-select ${String(ticket.status || 'PENDING').toLowerCase().replaceAll('_', '-')}`}
                                                    value={ticket.status || 'PENDING'}
                                                    onChange={(e) => changeStatus(
                                                        ticket.ticketNumber,
                                                        e.target.value
                                                    )}
                                                >

                                                    <option value='PENDING'>
                                                        PENDING
                                                    </option>

                                                    <option value='IN_PROGRESS'>
                                                        IN_PROGRESS
                                                    </option>

                                                    <option value='COMPLETED'>
                                                        COMPLETED
                                                    </option>

                                                </select>
                                            </td>
                                            <td>
                                                <div className='ticket-action-buttons'>
                                                    <button
                                                        className='secondary-button'
                                                        onClick={() => {
                                                            setSelectedTicket(ticket.ticketNumber)
                                                            setCommentMessage('')
                                                            loadComments(ticket.ticketNumber)
                                                        }}
                                                    >
                                                        Details
                                                    </button>

                                                    {
                                                        (role === "2" || role === "3") && (
                                                            <button
                                                                className="btn btn-danger secondary-button danger-button"
                                                                onClick={() => deleteTicket(ticket.ticketNumber)}
                                                            >
                                                                Delete
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </td>

                                            </tr>

                                        ))

                                        :

                                        <tr>

                                            <td colSpan="7">

                                                No Tickets Found

                                            </td>

                                        </tr>

                                }

                            </tbody>

                        </table>

                        </section>

                }

                {
                    selectedTicketData && (

                        <section className='panel ticket-detail-panel'>

                            <div className='section-title'>
                                <div>
                                    <span className='eyebrow'>Ticket Details</span>
                                    <h2>{selectedTicketData.title}</h2>
                                </div>
                                <span className={`status-pill ${String(selectedTicketData.status || 'PENDING').toLowerCase().replaceAll('_', '-')}`}>
                                    {selectedTicketData.status || 'PENDING'}
                                </span>
                            </div>

                            <p>{selectedTicketData.description}</p>

                            <div className='comment-list'>
                                {
                                    comments.length > 0
                                        ? comments.map((item) => (
                                            <div
                                                className='comment-item'
                                                key={item._id || item.id || item.createdAt}
                                            >
                                                <strong>{item.commentBy}</strong>
                                                <span>{item.status || 'PENDING'}</span>
                                                <p>{item.comment}</p>
                                            </div>
                                        ))
                                        : <div className='empty-state'>No comments yet.</div>
                                }
                            </div>

                            <textarea
                                className='form-textarea'
                                value={comment}
                                onChange={(e) =>
                                    setComment(e.target.value)
                                }
                                placeholder='Add a comment'
                            />

                            <button
                                className='primary-button'
                                onClick={saveComment}
                            >
                                Add Comment
                            </button>

                            {
                                commentMessage &&
                                <div className='notice'>
                                    {commentMessage}
                                </div>
                            }

                        </section>
                    )
                }

            </div>

        </div>

    )
}

export default TicketList
