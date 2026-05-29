import React from 'react'
import { Link } from "react-router-dom";

let getTitle = (note) => {
    let title = note.body.split('\n')[0]
    if (title.length > 25) {
        title = title.slice(0, 25) + '...'
    }
    return title || 'Untitled Note'
}

let getDate = (note) => {
    return new Date(note.updated).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

let getContent = (note) => {
    let title = note.body.split('\n')[0]
    let content = note.body.replace(title, "").trim()
    if (content.length === 0) {
        return 'No additional text'
    }
    if (content.length > 100) {
        return content.slice(0, 100) + '...'
    }
    return content
}

const ListItem = ({note}) => {
    return (
        <div className='notes-list-item'>
            <Link to={`/note/${note.id}`}>
                <div>
                    <h3>{getTitle(note)}</h3>
                    <p>{getContent(note)}</p>
                </div>
                <span className="note-date">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {getDate(note)}
                </span>
            </Link>
        </div>
    )
}

export default ListItem