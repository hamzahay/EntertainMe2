import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { favoritesVar } from '../graphql/vars'
import ContentCard from '../components/ContentCard'
import DetailModal from '../components/DetailModal'
import AddModal from '../components/AddModal'
import '../styles/favorites.css'

export default function Favorites () {

  const [detailData, setDetailData] = useState(null)
  const [detailModal, setDetailModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [addValue, setAddValue] = useState({ title: '', overview: '', poster_path: '', popularity: '', tags: ''})
  const [formType, setFormType] = useState('')

  function showDetail (e, content) {
    e.preventDefault()
    setDetailModal(true)
    setDetailData(content)
  }

  function showAddModal (e, content, type = 'addForm') {
    e.preventDefault()
    if (content) {
      setAddValue({
        _id: content._id,
        title: content.title,
        overview: content.overview,
        poster_path: content.poster_path,
        popularity: content.popularity,
        tags: content.tags.join(', ')
      })
    }
    setFormType(type)
    setAddModal(true)
  }

  const favorites = useReactiveVar(favoritesVar)
  console.log(favorites)
  if (favorites) {
    return (
      <div className="favorites-background">
        
        { detailModal ? <DetailModal setDetailModal={setDetailModal} data={detailData} showAddModal={showAddModal}/> : <div></div> }
        { addModal ? <AddModal setAddModal={setAddModal} setDetailModal={setDetailModal} data={addValue} setAddValue={setAddValue} type={formType}/> : <div></div> }
        
        <h2 className="favorites-tag">Favorites</h2>
        <div className="favorites-container">
          { favorites.map((favorite, index) => <ContentCard showDetail={showDetail} key={index} content={favorite} /> )}
        </div>
      </div>
    )
  } else {
    return (
      <div>empty favorites</div>
    )
  }
}