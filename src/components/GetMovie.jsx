// src/components/GetMovie.jsx

import { useState, useEffect, useCallback } from "react"
import MovieDetails from "./MovieDetails"
import MovieList from "./MovieList"
import MovieForm from "./MovieForm"

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

// ids that cannot be deleted
const PROTECTED_IDS = new Set([
  "461adc24-e05c-4b7f-ba8d-64075a533675",
  "53b053f0-2ad8-4072-8f34-0b9d65771d25",
])

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
  })

  const apiKey = import.meta.env.VITE_MY_MOVIE_API_KEY

  // build url from env
  // const prodUrl = import.meta.env.VITE_PRODUCTION_URL
  const prodUrl = import.meta.env.VITE_LOCALHOST_URL
  const baseUrl = `${prodUrl}/items/`
  const staticUrl = `${baseUrl}${staticMovie}`

  const refreshMovieList = useCallback(async () => {
    try {
      const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      })
      const data = await response.json()

      setMovieList(data.data)
    } catch (err) {
      console.error("refresh error:", err)
    }
  }, [baseUrl, apiKey])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshMovieList()
  }, [refreshMovieList])

  const getSingleMovie = useCallback(async () => {
    try {
      await fetch(staticUrl, {
        headers: {
          "x-api-key": apiKey,
        },
      })
        .then((response) => response.json())
        .then(transformMovie)
        .then((movie) => setMovie(movie))
        .catch((err) => console.error("fetching error:", err))
    } catch (err) {
      console.error("caught fetching error:", err)
    }
  }, [staticUrl, apiKey])

  useEffect(() => {
    getSingleMovie()
  }, [staticMovie, getSingleMovie])

  async function addMovie(moviePayload) {
    await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(moviePayload),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    })
    await refreshMovieList()
  }

  async function updateMovie(moviePayload) {
    await fetch(staticUrl, {
      method: "PUT",
      body: JSON.stringify(moviePayload),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    })
    resetActionLabel()
    await refreshMovieList()
  }

  async function deleteMovie() {
    await fetch(staticUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
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

    const moviePayload = {
      title: movieTitle,
      year: movieYear,
      imdb_id: imdbID,
    }

    if (actionLabel === "Add") {
      await addMovie(moviePayload)
    }
    if (actionLabel === "Edit") {
      await updateMovie(moviePayload)
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
    setActionLabel("Add")
  }

  function resetActionLabel() {
    setActionLabel("Add")
  }

  if (!movie) {
    return <div>Loading...</div>
  }

  const canDeleteCurrent = movie && !PROTECTED_IDS.has(movie.id)

  return (
    <div className="row">
      <div className="col">
        <MovieDetails
          movie={movie}
          onEdit={() => fillEditForm(movie.id)}
          onDelete={deleteMovie}
          canDelete={canDeleteCurrent}
        />

        <MovieList
          movieList={movieList}
          onSelect={changeStaticMovie}
          onRefresh={refreshMovieList}
        />
      </div>

      <div className="col">
        <MovieForm
          movie={movie}
          form={form}
          actionLabel={actionLabel}
          onChangeField={updateField}
          onSubmit={handleForm}
          onDelete={deleteMovie}
          clearFields={clearFields}
          canDelete={canDeleteCurrent && actionLabel !== "Add"}
        />
      </div>
    </div>
  )
}
