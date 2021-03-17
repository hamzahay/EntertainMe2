import React from 'react'
import '../styles/navbar.css'
import { NavLink, useHistory } from 'react-router-dom'

export default function Navbar () {
  
  const history = useHistory()

  function toHome (e) {
    e.preventDefault()
    history.push('/')
  }

  return (
    <div className="navbar">
      <h2 onClick={e => toHome(e)}>MOVIEKU</h2>
      <div className="link-container">
        <NavLink className="link" activeClassName="active-link" exact to="/" >Home</NavLink>
        <NavLink className="link" activeClassName="active-link" to="/favorites" >Favorites</NavLink>
      </div>
    </div>
  )
}