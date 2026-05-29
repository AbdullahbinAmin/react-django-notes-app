import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem.js'
import AddButton from '../components/AddButton.js'

const NotesListPage = () => {
    let [notes, setNote] = useState([])
    let [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        let response = await fetch('/api/notes/')
        let data = await response.json()
        setNote(data)
    }

    // Filter notes based on search query
    let filteredNotes = notes.filter(note => 
        note.body && note.body.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className='notes'>
            <div className="notes-header">
                <h2 className="notes-title">
                    &#9782; Notes
                </h2>
                
                <div className="notes-search-container">
                    <svg className="notes-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Search notes..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="notes-search-input"
                    />
                </div>

                <p className="notes-count">
                    {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
                </p>
            </div>
            
            <div className='notes-list'>
                {filteredNotes.map((note, index) => (
                    <div className='note-preview' key={index}>
                        <ListItem note={note} />
                    </div>
                ))}
            </div>
            <AddButton />
        </div>
    )
}

export default NotesListPage