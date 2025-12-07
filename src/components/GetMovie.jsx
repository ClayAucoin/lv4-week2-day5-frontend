// src/components/GetMovie.jsx

import { useState, useEffect } from "react"
import trashCan from "../images/trash.png"
import edit from "../images/edit.jpg"

function transformMovie(movieData) {
  return {
    id: movieData.data.id,
    title: movieData.data.title,
    year: movieData.data.year,
    imdb_id: movieData.data.imdb_id,
    genres: movieData.data.genres,
    poster: movieData.data.poster,
  }
}

export default function GetMovie() {
  const [movie, setMovie] = useState(null)
  const [movieList, setMovieList] = useState([])

  // build fetch url for ALL movies from env
  const prodUrl = import.meta.env.VITE_PRODUCTION_URL
  const builtUrlAll = `${prodUrl}/items/`

  // build fetch url for SINGLE movie from env
  const staticMovie = import.meta.env.VITE_STATIC_MOVIE_ID
  const builtUrlSingle = `${builtUrlAll}${staticMovie}`

  // get all data for list
  async function refreshMovies() {
    const response = await fetch(builtUrlAll)
    const data = await response.json()

    setMovieList(data.data)
  }

  useEffect(() => {
    function fetchMovies() {
      refreshMovies()
    }
    fetchMovies()
  }, [])

  // get single movie
  useEffect(() => {
    fetch(builtUrlSingle)
      .then((response) => response.json())
      .then(transformMovie)
      .then((movie) => setMovie(movie))
      .catch((error) => console.error("Error fetching:", error))
  }, [])

  // delete movie
  async function deleteMovie(id) {
    console.log("delete use:", id)
    const deleteUrl = `${builtUrlAll}${id}`

    await fetch(`${deleteUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    refreshMovies()
  }

  async function updatemovie(id) {
    console.log(id)
  }

  function handleForm(event) {
    event.preventDefault()

    const movieTitle = event.target.elements.movie_title.value
    const movieYear = event.target.elements.movie_year.value
    const imdbID = event.target.elements.imdb_id.value

    const movie = {
      title: movieTitle,
      year: movieYear,
      imdb_id: imdbID,
    }
    console.log(movie)
    fetch(builtUrlAll, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>You Chose</h1>
      <div className="row">
        <div className="col">
          <p>Title: {movie.title}</p>
          <p>Year: {movie.year}</p>
          <p>IMDB ID: {movie.imdb_id}</p>
          <p>Genres: {movie.genres}</p>
        </div>
        <div className="col">
          {movie.poster && (
            <img src={movie.poster} alt={movie.name} style={{ width: "50%" }} />
          )}
        </div>
      </div>

      <h1>All Movies</h1>
      <ul>
        {movieList.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.year}){" "}
            {movie.title != "Monkey Man" && (
              <>
                <img
                  src={edit}
                  alt="Edit"
                  className="icon"
                  onClick={() => updatemovie(movie.id)}
                />
                <img
                  src={trashCan}
                  alt="Delete"
                  className="icon"
                  onClick={() => deleteMovie(movie.id)}
                />
              </>
            )}
          </li>
        ))}
      </ul>

      <h1>Add/Edit Movie</h1>
      <div className="row">
        <form onSubmit={handleForm}>
          <div className="mb-1">
            <label className="form-label" htmlFor="movie_title">
              Movie Title
            </label>
            <input
              className="form-control form-control-sm"
              type="text"
              id="movie_title"
              name="movie_title"
            />
          </div>
          <div className="mb-1">
            <label className="form-label" htmlFor="movie_year">
              Year
            </label>
            <input
              className="form-control form-control-sm"
              type="number"
              id="movie_year"
              name="movie_year"
            />
          </div>
          <div className="mb-1">
            <label className="form-label" htmlFor="imdb_id">
              IMDB ID
            </label>
            <input
              className="form-control form-control-sm"
              type="text"
              id="imdb_id"
              name="imdb_id"
            />
          </div>
          <div>
            <input
              className="btn btn-primary"
              type="submit"
              value="Add Movie"
            />
          </div>
        </form>
      </div>
    </>
  )
}
