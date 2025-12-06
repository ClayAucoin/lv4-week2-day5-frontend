// src/components/GetMovie.jsx

import { useState, useEffect } from "react"

// Callback function defined outside the component
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

export default function PokemonDisplay() {
  const [movie, setMovie] = useState(null)

  const prodUrl = import.meta.env.VITE_PRODUCTION_URL
  const staticMovie = import.meta.env.VITE_STATIC_MOVIE_ID
  const builtUrl = `${prodUrl}/items/${staticMovie}`

  // console.log("builtUrl single:", builtUrl)

  useEffect(() => {
    fetch(builtUrl)
      .then((response) => response.json())
      // .then((response) => console.log(response.data.title))
      .then(transformMovie)
      .then((movie) => setMovie(movie))
      .catch((error) => console.error("Error fetching:", error))
  }, [])

  if (!movie) {
    return <div>Loading...</div>
  }

  // console.log(movie.data.title)

  return (
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
  )
}
