import React, { useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'
import { useQuery } from 'react-query'
import { FixedSizeList as List } from 'react-window';

import { UserContext } from '../context/UserContext'
import { ThemeContext } from '../context/ThemeContext'
import { getChatListByChallenge } from '../api/chat'
import Loader from './loader'

const Chat = ({ challengeId }) => {
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [scrollPosition, setScrollPosition] = useState(0)

    const listRef = React.useRef(null);

    const { user } = useContext(UserContext)
    const { theme } = useContext(ThemeContext)

    const socket = io('http://la-tote-server.eddi.cloud:8080')

    const { isLoading } = useQuery(['chatList', challengeId], async () => {
        const data  = await getChatListByChallenge(challengeId)
        setMessages(data[0].slice().reverse())
        return data
    })

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('join', challengeId)
        })
        socket.on('new message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg])
        })

        return () => {
            socket.off('new message')
            socket.off('connect')
        }
    }, [])

    useEffect(() => {
        if (listRef.current) {
            const lastIndex = messages.length - 1
            const isAtBottom = lastIndex * 100 <= scrollPosition + 1 // add 1 for possible rounding errors
            listRef.current.scrollToItem(lastIndex, isAtBottom ? undefined : 'smart')
        }
    }, [messages])

    const handleScroll = ({ scrollOffset }) => {
        setScrollPosition(scrollOffset)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputValue) {
            const message = {
                text: inputValue,
                challengeId,
                userId: user.id,
                username: user.username,
            }
            socket.emit('chat message', message)
            setInputValue('')
        }
    }

    const afficherTempsEcoule = (yourDate) => {
        const now = new Date()
        const diffMs = now.getTime() - yourDate.getTime()
        const diffSeconds = Math.round(diffMs / 1000)
        const diffMinutes = Math.round(diffSeconds / 60)
        const diffHours = Math.round(diffMinutes / 60)
        const diffDays = Math.round(diffHours / 24)
        const diffMonths = Math.round(diffDays / 30)
        const diffYears = Math.round(diffMonths / 12)

        let unit
        let value

        if (diffYears > 0) {
            unit = 'année'
            value = diffYears
        } else if (diffMonths > 0) {
            unit = 'mois'
            value = diffMonths
        } else if (diffDays > 0) {
            unit = 'jour'
            value = diffDays
        } else if (diffHours > 0) {
            unit = 'heure'
            value = diffHours
        } else if (diffMinutes > 0) {
            unit = 'minute'
            value = diffMinutes
        } else {
            unit = 'seconde'
            value = diffSeconds
        }

        return !value  ? "à l'instant" : `il y a ${value} ${unit}${value > 1 ? 's' : ''}`
    }

    const Row = ({ index, style }) => {
        return (
            <div style={{...style, padding: "0 2rem" }}>
                <div style={messages[index].username === user.username ? { marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } : { marginBottom: '1rem' }}>
                    <span>{messages[index].username}</span>
                    <li>{messages[index].text}</li>
                    <span style={{ fontSize: '1rem' }}>{afficherTempsEcoule(new Date(messages[index].createdAt))}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="challenge-page--forum__messages">
            <h2>ESPACE FORUM</h2>
            {isLoading ? <Loader /> : (
                <List
                    ref={listRef}
                    className={theme === 'light' ? 'messages-light' : 'messages'}
                    height={400}
                    itemCount={messages.length}
                    itemSize={100}
                    width={"100%"}
                    initialScrollOffset={messages?.length * 100}
                    onScroll={handleScroll}
                >
                    {Row}
                </List>
            )}
            <form id="form">
                <input
                    id="input"
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    className="button-green"
                    onClick={(e) => handleSubmit(e)}
                >
                    Envoyer
                </button>
            </form>
        </div>
    )
}

export default Chat
