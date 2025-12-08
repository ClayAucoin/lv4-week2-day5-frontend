// src/App.jsx

// import { useState } from 'react'
import GetMovie from "./components/GetMovie.jsx"
import "./App.css"

function App() {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <GetMovie />
        </div>
      </div>
    </>
  )
}

export default App
