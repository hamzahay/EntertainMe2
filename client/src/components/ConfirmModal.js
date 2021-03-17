import React, { useState } from 'react'
import '../styles/confirmModal.css'

export default function ConfirmModal (props) {

  const type = props.type

  function confirm (e) {
    e.preventDefault()
    props.confirmForm(e)
    props.setShowModal(false)
  }

  function confirmDelete (e) {
    e.preventDefault()
    props.movieDelete(e)
    props.setShowModal(false)
  }

  function cancel () {
    props.setShowModal(false)
  }

  return (
    <div className="modal-background">
      <div className="confirm-container">
        { type === 'delete' ?
          <h1 className="text">Delete this content?</h1> :
          <h1 className="text">Are you sure?</h1>  
        }
        <div className="confirm-btn-container">
        { type === 'delete' ? 
            <button className="confirm-btn del-btn" onClick={e => confirmDelete(e)}>Delete</button> :
            <button className="confirm-btn continue-btn" onClick={e => confirm(e)}>Continue</button> 
          }
          <button className="confirm-btn cancel-btn" onClick={e => cancel(e)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}