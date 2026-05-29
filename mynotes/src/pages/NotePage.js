import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
  let { id }  = useParams();
  let navigate = useNavigate()
  let [note, setNote] = useState({ body: '' })

  useEffect(() => {
    let getNote = async () => {
      if (id === 'new') return
      let response = await fetch(`/api/notes/${id}`)
      let data = await response.json()
      setNote(data)
    }
    getNote()
  }, [id])

  let createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
  }

  let updateNote = async () => {
    await fetch(`/api/notes/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
  }

  let deleteNote = async () => {
    await fetch(`/api/notes/${id}/delete/`, {
      method: 'DELETE'
    })
    navigate('/')
  }

  let handleSubmit = async () => {
    if (id !== 'new' && !note.body) {
      await deleteNote()
    } else if (id !== 'new') {
      await updateNote()
    } else if (id === 'new' && note.body && note.body.trim() !== '') {
      await createNote()
    }
    navigate('/')
  }

  return (
    <div className='note'>
      <div className="note-header">
        <h3>
          <Link to="/" onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <ArrowLeft style={{ fill: 'var(--color-main)', width: '20px', height: '20px', cursor: 'pointer' }} />
            <span style={{ fontSize: '14px', fontWeight: '600', marginLeft: '6px', cursor: 'pointer' }}>Back</span>
          </Link>
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {id !== 'new' && (
            <button className="delete-btn" onClick={deleteNote}>Delete</button>
          )}
          <button className="save-btn" onClick={handleSubmit}>
            {id === 'new' ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
      <div className="note-body">
        <textarea 
          placeholder="Start writing your thoughts..."
          onChange={(e) => {setNote({...note, 'body':e.target.value})}} 
          value={note.body || ''}
        >  
        </textarea>
      </div>
    </div>
  )
}

export default NotePage