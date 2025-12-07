// src/components/GetMovie.jsx

import { useState, useEffect } from "react"
// import trashCan from "../images/trash.png"
import refresh from "../images/refresh.png"

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
  const [actionLabel, setActionLabel] = useState("Add Movie")
  const [staticMovie, setStaticMovie] = useState(
    "461adc24-e05c-4b7f-ba8d-64075a533675"
  )
  const [form, setForm] = useState({
    title: "",
    year: "",
    imdb_id: "",
    // ...initialValues, // prefilled by edit mode
  })

  // build fetch url for ALL movies from env
  const prodUrl = import.meta.env.VITE_PRODUCTION_URL
  const builtUrlAll = `${prodUrl}/items/`

  // build fetch url for SINGLE movie from env
  // const staticMovie = import.meta.env.VITE_STATIC_MOVIE_ID
  const builtUrlSingle = `${builtUrlAll}${staticMovie}`

  // get all data for list
  async function refreshMovieList() {
    const response = await fetch(builtUrlAll)
    const data = await response.json()

    setMovieList(data.data)
  }

  useEffect(() => {
    function fetchMovies() {
      refreshMovieList()
    }
    fetchMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getSingleMovie() {
    await fetch(builtUrlSingle)
      .then((response) => response.json())
      .then(transformMovie)
      .then((movie) => setMovie(movie))
      .catch((error) => console.error("Error fetching:", error))
  }

  // get single movie
  useEffect(() => {
    getSingleMovie()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticMovie])

  // delete movie
  async function deleteMovie(id) {
    // console.log("delete use:", id)
    const deleteUrl = `${builtUrlAll}${id}`

    await fetch(`${deleteUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    setStaticMovie("461adc24-e05c-4b7f-ba8d-64075a533675")
    await refreshMovieList()
  }

  async function addMovie(movie) {
    // console.log(movie)
    fetch(builtUrlAll, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  async function updateMovie(movie) {
    const updateUrl = `${builtUrlAll}${staticMovie}`
    // console.log(updateUrl)
    // console.log(movie)

    fetch(updateUrl, {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    })
    await refreshMovieList()
  }

  async function fillEditForm(id) {
    // console.log(id)
    setForm({
      title: movie.title,
      year: movie.year,
      imdb_id: movie.imdb_id,
    })
    setActionLabel("Edit Movie")
    setStaticMovie(id)
  }

  async function handleForm(event) {
    event.preventDefault()
    // console.log("actionLabel:", actionLabel)

    const ete = event.target.elements

    const movieTitle = ete.movie_title.value
    const movieYear = ete.movie_year.value
    const imdbID = ete.imdb_id.value

    const movie = {
      title: movieTitle,
      year: movieYear,
      imdb_id: imdbID,
    }
    // console.log(movie)

    if (actionLabel === "Add Movie") {
      await addMovie(movie)
    }
    if (actionLabel === "Edit Movie") {
      await updateMovie(movie)
    }

    clearFields()

    getSingleMovie()
    refreshMovieList()
  }

  function updateField(fieldName, value) {
    setForm((f) => ({ ...f, [fieldName]: value }))
  }

  function clearFields() {
    setForm({ title: "", year: "", imdb_id: "" })
  }

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>You Chose</h1>
          <div className="ms-4">
            <p>
              Title: <b>{movie.title}</b>
            </p>
            <p>
              Year: <b>{movie.year}</b>
            </p>
            <p>
              IMDB ID: <b>{movie.imdb_id}</b>
            </p>
            <p>
              Genres: <b>{movie.genres}</b>
            </p>
            {/* <p>{movie.id}</p> */}
            <button
              onClick={() => fillEditForm(movie.id)}
              className="btn btn-primary m-1"
            >
              Edit Movie
            </button>
            {movie.id != "461adc24-e05c-4b7f-ba8d-64075a533675" && (
              <button
                onClick={() => deleteMovie(movie.id)}
                className="btn btn-primary m-1"
              >
                Delete Movie
              </button>
            )}
          </div>
          <div className="w-75">
            <div className="d-flex mt-2 justify-content-between align-items-center">
              <h1>All Movies</h1>
              <img
                src={refresh}
                alt="Delete"
                className="refresh"
                onClick={() => refreshMovieList()}
              />
            </div>
          </div>

          <ul>
            {movieList.map((movie) => (
              <li key={movie.id}>
                <a
                  className="fakeLink"
                  onClick={() => setStaticMovie(movie.id)}
                >
                  {movie.title} ({movie.year})
                </a>{" "}
                {/* {movie.title != "Monkey Man" && (
                  <img
                    src={trashCan}
                    alt="Delete"
                    className="icon"
                    onClick={() => deleteMovie(movie.id)}
                  />
                )} */}
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <div className="text-center">
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.name}
                style={{ width: "50%" }}
              />
            )}
          </div>

          <h1 className="mt-4">{actionLabel}</h1>
          {/* {staticMovie} */}
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
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  autoFocus
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
                  value={form.year}
                  onChange={(e) => updateField("year", e.target.value)}
                />
              </div>
              <div className="mb-1">
                <label className="form-label" htmlFor="imdb_id">
                  IMDB ID (tt1234567)
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  id="imdb_id"
                  name="imdb_id"
                  value={form.imdb_id}
                  onChange={(e) => updateField("imdb_id", e.target.value)}
                />
              </div>
              <div>
                <input
                  className="btn btn-primary"
                  type="submit"
                  value={actionLabel}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
