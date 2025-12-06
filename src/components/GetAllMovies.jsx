// src/components/getAllMovies.jsx

import { useState, useEffect } from "react"
import trashCan from "../images/trash.png"
import edit from "../images/edit.jpg"

export default function GetAllMovies() {
  const [movieList, setMovieList] = useState([])

  const prodUrl = import.meta.env.VITE_PRODUCTION_URL
  const builtUrl = `${prodUrl}/items/`

  async function refreshMovies() {
    const response = await fetch(builtUrl)
    const data = await response.json()

    setMovieList(data.data)
  }

  useEffect(() => {
    async function fetchMovies() {
      refreshMovies()
    }
    fetchMovies()
  }, [])

  if (!movieList) {
    return <div>Loading...</div>
  }

  async function deleteMovie(id) {
    console.log("delete use:", id)
    const deleteUrl = builtUrl + id

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

  return (
    <>
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
    </>
  )
}
