// src/components/MovieDetails.jsx
export default function MovieDetails({ movie, onEdit, onDelete, canDelete }) {
  if (!movie) return null

  return (
    <>
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
        {/* <p>
          Genres: <b>{movie.genres}</b>
        </p> */}

        <button onClick={onEdit} className="btn btn-primary m-1">
          Edit Movie
        </button>

        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="btn btn-primary m-1"
          >
            Delete Movie
          </button>
        )}
      </div>
    </>
  )
}
