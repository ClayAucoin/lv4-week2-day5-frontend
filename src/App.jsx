// src/App.jsx

// import { useState } from 'react'
import GetMovie from "./components/GetMovie.jsx"
import GetAllMovies from "./components/GetAllMovies.jsx"
import AddMovieForm from "./components/AddMovieForm.jsx"
import "./App.css"

function App() {
  return (
    <>
      <div className="card">
        <div className="card-body">
          {/* <h1>You picked...</h1> */}
          <GetMovie />

          {/* <h1>Movie List</h1>
          <GetAllMovies />

          <h1>Enter Your Movie Here</h1>
          <AddMovieForm /> */}
        </div>
      </div>
    </>
  )
}

export default App
