// src/components/getAllMovies.jsx

import { useState, useEffect } from "react"
import trashCan from "../images/trash.png"

export default function GetAllMovies() {
  const [movieList, setMovieList] = useState([])

  async function refreshMovies() {
    // const response = await fetch("http://localhost:3000/items/")
    const response = await fetch("http://107.216.101.56:3000/items/")
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
    await fetch(`http://107.216.101.56:3000/items/${id}`, {
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
      <h1>Movie List</h1>
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
