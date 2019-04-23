import React from 'react'

import axios from 'axios'
import 'bulma'

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
    console.log(`data ${data}`)
    this.setState({ searchTitle: data })
    console.log(data)
    console.log(this.state.searchTitle)
  }


  handleSubmit(e){
    e.preventDefault()
    console.log('working')


    console.log(this)

    axios.get(`http://www.omdbapi.com/?s=${this.state.searchTitle}&apikey=f09ea565`)
      .then(res => {
        this.setState({ films: res.data.Search })
      })

  }



  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input  onChange={this.handleChange}>
          </input>
          <button>Search</button>
        </form>

        <p>{this.state.films.map(film =>
          <h2 key={film.imdbID}>{film.Title}</h2>
        )}</p>
      </div>
    )
  }
}

export default FilmSearch
