import React from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import 'bulma'

import FilmCard from './FilmCard.js'

class FilmSearch extends React.Component {
  constructor(){
    super()

    this.state = {
      films: [],
      searchTitle: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){



  }

  handleChange(e){
    e.preventDefault()
    const data = ({ ...this.state.searchTitle, [e.target.name]: e.target.value })
    console.log(e.target.name)
    console.log(`data ${data}`)
    this.setState({ searchTitle: data })
    console.log(data)
    console.log(this.state.searchTitle.searchInput)
  }


  handleSubmit(e){
    e.preventDefault()
    console.log('working')


    console.log(this)

    

    axios.get(`http://www.omdbapi.com/?s=${this.state.searchTitle.searchInput
    }&apikey=f09ea565`)
      .then(res => {
        this.setState({ films: res.data.Search.filter((film) => film.Poster!=='N/A' && film.Type==='movie') })
      })
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="searchInput"  onChange={this.handleChange}>
          </input>
          <button>Search</button>
        </form>

        <div className="container">
          <div className="columns is-multiline">
            {this.state.films.map(film =>{
              return(<Link key={film.imdbID} to={`/${film.imdbID}`}>
                <div className="column is-one-quarter">
                  <FilmCard {...film}/>
                </div>
              </Link>)
            }
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default FilmSearch
