import { useState, useEffect, Fragment } from 'react'
import './App.css'

const API_URL = 'https://api.imgflip.com/get_memes'

function Meme({ item }) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="card h-100">
        <img src={item.url} className="card-img-top" alt={item.name} />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{item.name}</h5>
          <a href={item.url} target="_blank" rel="noreferrer" className="btn btn-primary mt-auto">
            Ver Imagen
          </a>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [items, setItems] = useState([])
  const [searchInput, setSearchInputs] = useState("")

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setItems(result.data.memes)
      },
        (error) => {
          console.log("Error: " + error)
        })
  }, [])


  const SearchItems = (searchValue) => {
    setSearchInputs(searchValue)
  }

  return (
    <Fragment>
      <h1 className="alert alert-primary">Memes API</h1>

      <div className="input-group alert alert-dark mt-3">
        <input onChange={(e) => SearchItems(e.target.value)} type='search' placeholder='Ingrese el nombre del meme' className='form-control'></input>
        <button className='btn btn-primary'>Buscar</button>
      </div>
      <div className="row">
        {items.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase())).map((item) => (
          <Meme Key={item.id} item={item} />
        ))}
      </div>
    </Fragment>
  )
}

export default App
