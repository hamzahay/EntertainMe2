import React, { useState, useEffect } from 'react'
import '../styles/addModal.css'
import { useMutation } from '@apollo/client'
import ConfirmModal from '../components/ConfirmModal'
import { ADD_MOVIE, GET_DATA, UPDATE_MOVIE, ADD_TV, UPDATE_TV } from '../graphql/query'

export default function AddModal (props) {

  const data = props.data
  const formType = props.type
  const formChange = props.change
  const [title, setTitle] = useState(data.title)
  const [overview, setOverview] = useState(data.overview)
  const [posterPath, setPosterPath] = useState(data.poster_path)
  const [popularity, setPopularity] = useState(data.popularity)
  const [tags, setTags] = useState(data.tags)
  const [tagsData, setTagsData] = useState([])
  const [formTitle, setFormTitle] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [addMovie, { data: addMovieResult }] = useMutation(ADD_MOVIE)
  const [editMovie, { data: editMovieResult }] = useMutation(UPDATE_MOVIE)
  const [addSeries, { data: addTvResult }] = useMutation(ADD_TV)
  const [editSeries, { data: editTvResult}] = useMutation(UPDATE_TV)

  useEffect(() => {
    let newFormTitle = ''
    if (formType === 'addForm') {
      newFormTitle = 'Add '
    } else if (formType === 'editForm') {
      newFormTitle = 'Edit '
    }

    if (formChange === 'movies') {
      newFormTitle = `${newFormTitle} Movies`
    } else if (formChange === 'series') {
      newFormTitle = `${newFormTitle} Series`
    }
    setFormTitle(newFormTitle)
  }, [formType, formChange])

  function clearModal (e) {
    e.preventDefault()
    props.setAddValue({ title: '', overview: '', poster_path: '', popularity: '', tags: ''})
    props.setAddModal(false)
  }

  function updateTitle (e) {
    setTitle(e.target.value)
  }

  function updateOverview (e) {
    setOverview(e.target.value)
  }

  function updatePosterPath (e) {
    setPosterPath(e.target.value)
  }

  function updatePopularity (e) {
    setPopularity(e.target.value)
  }

  function updateTags (e) {
    setTags(e.target.value)
    setTagsData(e.target.value.split(', '))
  }

  function confirmForm (e) {
    e.preventDefault()
    if (!title || !overview || !posterPath || !tags || popularity < 0 || popularity > 10) {
    } else {
      const newData = {
        title,
        overview,
        poster_path: posterPath,
        popularity: Number(popularity),
        tags: tagsData
      }
      if (formType === 'addForm' && formChange === 'movies') {
        addMovie({ variables: { movie: newData }, refetchQueries: [{ query: GET_DATA }] })
        setShowModal(true)
      } else if (formType === 'editForm' && formChange === 'movies') {
        editMovie({ variables: { movieId: data._id, newMovie: newData }, refetchQueries: [{ query: GET_DATA }] })
        props.setDetailModal(false)
      } else if (formType === 'addForm' && formChange === 'series') {
        addSeries({ variables: { tv: newData }, refetchQueries: [{ query: GET_DATA }] })
      } else if (formType === 'editForm' && formChange === 'series') {
        editSeries({ variables: { tvId: data._id, newTv: newData }, refetchQueries: [{ query: GET_DATA }] })
        props.setDetailModal(false)
      }
      clearModal(e)
    }
  }

  function checkConfirm (e) {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <div className="add-modal">
      { showModal ? <ConfirmModal setShowModal={setShowModal} confirmForm={confirmForm} type='update' /> : <div></div> }
      <div className="add-content">
        <form className="add-form">
          <h1 className="form-title">{ formTitle }</h1>
          <label>Title</label>
          <input placeholder="Enter Title" value={title} onChange={e => updateTitle(e)} required></input>
          <label>Overview</label>
          <input placeholder="Overview" value={overview} onChange={e => updateOverview(e)} required></input>
          <label>Poster Path</label>
          <input placeholder="Poster Path" value={posterPath} onChange={e => updatePosterPath(e)} required></input>
          <label>Popularity</label>
          <input type="number" min="0" max="10" step="0.1" placeholder="Popularity" value={popularity} onChange={e => updatePopularity(e)} required></input>
          <label>Tags</label>
          <input placeholder="Tags ex: Action, Drama, Superhero" value={tags} onChange={e => updateTags(e)} required></input>
          <div className="add-form-btn">
            <button type="submit" className="btn submit-btn" onClick={e => checkConfirm(e)}>Submit</button>
            <button className="btn cancel-btn" onClick={e => clearModal(e)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}