// src/components/MovieForm.jsx

export default function MovieForm({
  movie,
  form,
  actionLabel,
  onChangeField,
  onSubmit,
  onDelete,
  canDelete,
  clearFields,
}) {
  return (
    <>
      <div className="text-center">
        {movie?.poster && (
          <img src={movie.poster} alt={movie.title} style={{ width: "50%" }} />
        )}
      </div>

      <h1 className="mt-4">{actionLabel} Movie</h1>

      <div className="row">
        <form onSubmit={onSubmit}>
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
              onChange={(e) => onChangeField("title", e.target.value)}
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
              onChange={(e) => onChangeField("year", e.target.value)}
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
              onChange={(e) => onChangeField("imdb_id", e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between">
            <div>
              <input
                className="btn btn-primary"
                type="submit"
                value={`${actionLabel} Movie`}
              />

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
            <div>
              <input
                className="btn btn-primary"
                type="button"
                value="Clear"
                onClick={clearFields}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
