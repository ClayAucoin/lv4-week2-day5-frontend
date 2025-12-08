// src/components/GetMovie.jsx

import { useState, useEffect, useCallback } from "react"
import refresh from "../images/refresh.png"

function transformMovie(movieData) {
  const data = movieData.data
  return {
    id: data.id,
    title: data.title,
    year: data.year,
    imdb_id: data.imdb_id,
    genres: data.genres,
    poster: data.poster,
  }
}

export default function GetMovie() {
  const [movie, setMovie] = useState(null)
  const [movieList, setMovieList] = useState([])
  const [actionLabel, setActionLabel] = useState("Add")
  const [staticMovie, setStaticMovie] = useState(
    "53b053f0-2ad8-4072-8f34-0b9d65771d25"
  )
  const [form, setForm] = useState({
    title: "",
    year: "",
    imdb_id: "",
    // ...initialValues, // will be prefilled by edit mode
  })

  // build url from env
  const prodUrl = import.meta.env.VITE_PRODUCTION_URL
  const baseUrl = `${prodUrl}/items/`
  const staticUrl = `${baseUrl}${staticMovie}`

  const refreshMovieList = useCallback(async () => {
    try {
      const response = await fetch(baseUrl)
      const data = await response.json()

      setMovieList(data.data)
    } catch (err) {
      console.error("refresh error:", err)
    }
  }, [baseUrl, setMovieList])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshMovieList()
  }, [refreshMovieList])

  const getSingleMovie = useCallback(async () => {
    try {
      await fetch(staticUrl)
        .then((response) => response.json())
        .then(transformMovie)
        .then((movie) => setMovie(movie))
        .catch((err) => console.error("fetching error:", err))
    } catch (err) {
      console.error("caught fetching error:", err)
    }
  }, [staticUrl])

  useEffect(() => {
    getSingleMovie()
  }, [staticMovie, getSingleMovie])

  async function addMovie(movie) {
    await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    })
    await refreshMovieList()
  }

  async function updateMovie(movie) {
    await fetch(staticUrl, {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    })
    resetActionLabel()
    await refreshMovieList()
  }

  async function deleteMovie() {
    await fetch(`${staticUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    setStaticMovie("461adc24-e05c-4b7f-ba8d-64075a533675")
    await refreshMovieList()
  }

  function fillEditForm(id) {
    setForm({
      title: movie.title,
      year: movie.year,
      imdb_id: movie.imdb_id,
    })
    setActionLabel("Edit")
    setStaticMovie(id)
  }

  async function handleForm(event) {
    event.preventDefault()
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

    if (actionLabel === "Add") {
      await addMovie(movie)
    }
    if (actionLabel === "Edit") {
      await updateMovie(movie)
    }

    clearFields()
    await getSingleMovie()
    await refreshMovieList()
  }

  function changeStaticMovie(id) {
    clearFields()
    resetActionLabel()
    setStaticMovie(id)
  }
  function updateField(fieldName, value) {
    setForm((f) => ({ ...f, [fieldName]: value }))
  }
  function clearFields() {
    setForm({ title: "", year: "", imdb_id: "" })
  }
  function resetActionLabel() {
    setActionLabel("Add")
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
            {movie.id != "461adc24-e05c-4b7f-ba8d-64075a533675" &&
              movie.id != "53b053f0-2ad8-4072-8f34-0b9d65771d25" && (
                <button
                  onClick={() => deleteMovie()}
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
                  onClick={() => changeStaticMovie(movie.id)}
                >
                  {movie.title} ({movie.year})
                </a>
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

          <h1 className="mt-4">{actionLabel} Movie</h1>

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
                  value={`${actionLabel} Movie`}
                />
                {actionLabel === "Add" ||
                  (movie.id != "461adc24-e05c-4b7f-ba8d-64075a533675" &&
                    movie.id != "53b053f0-2ad8-4072-8f34-0b9d65771d25" && (
                      <button
                        onClick={() => deleteMovie()}
                        className="btn btn-primary m-1"
                      >
                        Delete Movie
                      </button>
                    ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
