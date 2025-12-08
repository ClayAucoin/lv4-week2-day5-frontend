// src/components/MovieList.jsx

import refresh from "../images/refresh.png"

export default function MovieList(props) {
  const { movieList, onSelect, onRefresh } = props

  return (
    <div className="w-75">
      <div className="d-flex mt-2 justify-content-between align-items-center">
        <h1>All Movies</h1>
        <img
          src={refresh}
          alt="Refresh"
          className="refresh"
          onClick={onRefresh}
        />
      </div>

      <ul>
        {movieList.map((movie) => (
          <li key={movie.id}>
            <a className="fakeLink" onClick={() => onSelect(movie.id)}>
              {movie.title} ({movie.year})
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
