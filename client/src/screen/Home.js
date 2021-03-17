import React, { useState } from 'react'
import ContentCard from '../components/ContentCard'
import DetailModal from '../components/DetailModal'
import AddModal from '../components/AddModal'
import Loading from '../components/Loading'
import '../styles/content.css'
import { useQuery } from '@apollo/client'
import { GET_DATA } from '../graphql/query'

export default function Home () {

  const { loading, error, data } = useQuery(GET_DATA)
  const [detailData, setDetailData] = useState(null)
  const [detailModal, setDetailModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [addValue, setAddValue] = useState({ title: '', overview: '', poster_path: '', popularity: '', tags: ''})
  const [formType, setFormType] = useState('')
  const [formChange, setFormChange] = useState('')

  function showDetail (e, content) {
    e.preventDefault()
    setDetailModal(true)
    setDetailData(content)
  }

  function showAddModal (e, type = 'addForm', change, content) {
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
    setFormChange(change)
    setFormType(type)
    setAddModal(true)
  }

  
  if (loading) {
    return (
      <Loading />
    )
  } else if (error) {
    return <div>{ error }</div>
  } else {
    return (
      <div className="home">

        { detailModal ? <DetailModal setDetailModal={setDetailModal} data={detailData} showAddModal={showAddModal}/> : <div></div> }
        { addModal ? <AddModal setAddModal={setAddModal} setDetailModal={setDetailModal} data={addValue} setAddValue={setAddValue} type={formType} change={formChange}/> : <div></div> }

        <div>
          <h2 className="tag">Movies</h2>
          <h2 className="add-btn" onClick={e => showAddModal(e, 'addForm', 'movies')}>Add Movies</h2>
        </div>
        <div className="content">
            <div className="box">
              { data.movies.map((content, index) => <ContentCard showDetail={showDetail} key={index} content={content} /> ) }
            </div>
        </div>

        <div>
          <h2 className="tag">Tv Series</h2>
          <h2 className="add-btn" onClick={e => showAddModal(e, 'addForm', 'series')}>Add Series</h2>
        </div>
        <div className="content series">
            <div className="box">
              { data.tvSeries.map((content, index) => <ContentCard showDetail={showDetail} key={index} content={content} /> ) }
            </div>
        </div>
      </div>
    )
  }
}