import React from 'react'
import '../styles/loading.css'
import logo from '../assets/loading.gif'

export default function Loading () {

  return (
    <div className="loading">
      <img className="loading-img" src={logo} alt="Loading..."></img>
    </div>
  )
}