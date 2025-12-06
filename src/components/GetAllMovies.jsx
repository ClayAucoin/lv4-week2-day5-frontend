// src/components/getAllMovies.jsx

import { useState, useEffect } from "react"
import trashCan from "../images/trash.png"

export default function GetAllMovies() {
  const [movieList, setMovieList] = useState([])

  const prodUrl = import.meta.env.VITE_PRODUCTION_URL
  const builtUrl = `${prodUrl}/items/`

  // console.log("builtUrl all:", builtUrl)

  async function refreshMovies() {
    const response = await fetch(builtUrl)
    const data = await response.json()

    setMovieList(data.data)
  }

  useEffect(() => {
    async function fetchMovies() {
      refreshMovies()
      // const response = await fetch("http://localhost:3000/items/")
      // const data = await response.json()

      // setMovieList(data.data)
    }
    fetchMovies()
  }, [])

  if (!movieList) {
    return <div>Loading...</div>
  }

  async function deleteMovie(id) {
    console.log("delete use:", id)

    // await fetch(`http://localhost:3000/items/${id}`, {
    await fetch(`http://${prodUrl}:3000/items/ ${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    refreshMovies()
    // const response = await fetch("http://localhost:3000/items/")
    // const data = await response.json()

    // setMovieList(data.data)
  }

  return (
    <>
      <ul>
        {movieList.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.year}){" "}
            {movie.title != "Monkey Man" && (
              <img
                src={trashCan}
                alt="Delete"
                className="icon"
                onClick={() => deleteMovie(movie.id)}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
