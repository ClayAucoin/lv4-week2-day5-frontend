// src/components/AddMovieForm.jsx

export default function GameForm() {
  // let isTesting = false
  // isTesting = true

  const prodUrl = import.meta.env.VITE_PRODUCTION_URL
  const builtUrl = `${prodUrl}/items/`

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
    fetch(builtUrl, {
      method: "POST", // set method
      body: JSON.stringify(movie), // set body of request (convert JSON to String)
      headers: {
        "Content-Type": "application/json", // set type to JSON
      },
    })
  }

  return (
    <>
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
