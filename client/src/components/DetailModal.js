import React, { useEffect, useState } from 'react'
import '../styles/detailModal.css'
import { useMutation } from '@apollo/client'
import { DELETE_MOVIE, GET_DATA, DELETE_TV } from '../graphql/query'
import { useReactiveVar } from '@apollo/client'
import { favoritesVar } from '../graphql/vars'
import heartFill from '../assets/favorite-red-icon.png'
import heartBlank from '../assets/favorite-blank-icon.png'
import deleteButton from '../assets/delete.png'
import editIcon from '../assets/editIcon.jpg'

export default function DetailModal (props) {
  const data = props.data
  const favorites = useReactiveVar(favoritesVar)
  const [modalData, setModalData] = useState(data)
  const [deleteMovie, { data: deleteMovieResult }] = useMutation(DELETE_MOVIE)
  const [deleteSeries, { data: deleteSeriesResult }] = useMutation(DELETE_TV)
  const [favoriteStatus, setFavoriteStatus] = useState(false)

  useEffect (() => {
    if (data) {
      setModalData(data)
      favorites.forEach(favorite => {
        if (favorite._id === data._id) {
          setFavoriteStatus(true)
        }
      })
    }
  }, [data])

  function clearModal() {
    props.setDetailModal(false)
  }

  function addFavorites (e) {
    e.preventDefault()
    const favorites = favoritesVar()
    const newFavorite = modalData
    favoritesVar([newFavorite, ...favorites])
    setFavoriteStatus(true)
  }

  function removeFavorites () {
    if (favoriteStatus) {
      const newFavorites = favorites.slice()
      const index = newFavorites.map(fav => fav._id).indexOf(modalData._id)
      if (index > -1) {
        newFavorites.splice(index, 1)
        favoritesVar(newFavorites)
        setFavoriteStatus(false)
        clearModal()
      }
    }
  }

  function movieDelete (e) {
    e.preventDefault()
    if (data.__typename === 'Movie') {
      deleteMovie({ variables: { movieId: modalData._id }, refetchQueries: [{ query: GET_DATA }]})
    } else if (data.__typename === 'Tv') {
      deleteSeries({ variables: { tvId: modalData._id }, refetchQueries: [{ query: GET_DATA }]})
    }
    clearModal()
  }

  function movieEdit (e) {
    if (data.__typename === 'Movie') {
      props.showAddModal(e, 'editForm', 'movies', data)
    } else if (data.__typename === 'Tv') {
      props.showAddModal(e, 'editForm', 'series', data)
    }
  }

  return (
    <div className="detail-modal">
      { modalData ? 
        <div className="modal-content" onClick={props.showDetail}>
          <img className="modal-img" src={modalData.poster_path} alt="Poster"></img>
          
          <div className="content-detail">
            
            <div>
              <div className="close-btn-container"><button className="btn close-btn" onClick={clearModal}>X</button></div>
              <h1 className="title">{ modalData.title }</h1>
              <div>{ modalData.popularity }</div>
              <h4>{ modalData.overview }</h4>
              <div className="tags">Tags : { modalData.tags.map((tag, index) => index + 1 < modalData.tags.length ? tag + ', ' : tag ) }</div>
            </div>
            
            <div className="btn-container">
              { favoriteStatus ? <button className="btn" onClick={e => removeFavorites(e)}>
                  <img className="icon" src={heartFill} alt="removeFavIcon"></img>
                </button>:
                <button className="btn" onClick={e => addFavorites(e)}>
                  <img className="icon" src={heartBlank} alt="addFavIcon"></img>
                </button>
              }
              <button className="btn" onClick={e => movieEdit(e)}>
                <img className="icon" src={editIcon} alt="editIcon"></img>
              </button>
              <button className="btn" onClick={e => movieDelete(e)}>
                <img className="icon" src={deleteButton} alt="deleteIcon"></img>
              </button>
            </div>

          </div>
        </div> : <div></div>
      }
    </div>
  )
}