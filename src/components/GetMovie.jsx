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

  useEffect(() => {
    // fetch("http://localhost:3000/items/53b053f0-2ad8-4072-8f34-0b9d65771d25")
    fetch(
      "http://107.216.101.56:3000/items/53b053f0-2ad8-4072-8f34-0b9d65771d25"
    )
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
