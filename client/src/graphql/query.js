import { gql } from '@apollo/client'

export const GET_DATA = gql`
query getMovies {
  movies {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
  tvSeries {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`;

export const ADD_MOVIE = gql`
  mutation createMovie($movie: MovieInput!) {
    addMovie(input: $movie) {
      _id
      title
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation update($movieId: ID!, $newMovie: MovieInput!) {
    updateMovie (id: $movieId, input: $newMovie) {
      message
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation deleteMovie($movieId: ID!) {
    deleteMovie(id: $movieId){
      message
    }
  }
`

export const ADD_TV = gql`
  mutation createTv($tv: TvInput!) {
    addTv(input: $tv) {
      _id
      title
    }
  }
`

export const UPDATE_TV = gql`
  mutation updateTv($tvId: ID!, $newTv: TvInput!) {
    updateTv (id: $tvId, input: $newTv) {
      message
    }
  }
`

export const DELETE_TV = gql`
  mutation deleteTv($tvId: ID!) {
    deleteTv (id: $tvId){
      message
    }
  }
`