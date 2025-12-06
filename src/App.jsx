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
          <GetMovie />
          <GetAllMovies />
          <AddMovieForm />
        </div>
      </div>
    </>
  )
}

export default App
