import React from 'react'
import '../styles/card.css'

export default function ContentCard (props) {

  const content = props.content

  return (
    <div className="card" onClick={e => props.showDetail(e, content)}>
      <img className="top-img" src={content.poster_path} alt="Poster"></img>
    </div>
  )
}