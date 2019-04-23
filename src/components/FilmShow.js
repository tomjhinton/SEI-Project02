import React from 'react'
import axios from 'axios'
import GetTrailer from './GetTrailer.js'


class FilmShow extends React.Component {
  constructor(){
    super()

    this.state = {
      film: null //WHY NULL?
    }
  }

  componentDidMount() {
    axios.get(`http://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=f09ea565`)
      .then(res => (this.setState({film: res.data})))
  }

  render(){
    if(!this.state.film) return null
    return (
      <div>
        <div>{this.state.film.Title}</div>
        <div>{this.state.film.Plot}</div>
        <div>{this.state.film.Director}</div>
        <GetTrailer id={this.props.match.params.id} />
      </div>
    )
  }

}

export default FilmShow
