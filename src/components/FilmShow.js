import React from 'react'
import axios from 'axios'
import GetTrailer from './GetTrailer.js'
import { Link } from 'react-router-dom'

class FilmShow extends React.Component {
  constructor(){
    super()

    this.state = {
      film: null, //WHY NULL?
      moviedbID: null,
      youtubeID: null
    }
  }

  componentDidMount() {
    axios.get(`http://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=f09ea565`)
      .then(res => (this.setState({film: res.data})))

    axios.get(`https://api.themoviedb.org/3/find/${this.props.match.params.id}?api_key=205882c0653c77431db40e15ec7fd210&external_source=imdb_id`)
      .then(res => {
        this.setState({ moviedbID: res.data.movie_results[0].id })
        console.log(this.state.moviedbID)
        axios.get(`http://api.themoviedb.org/3/movie/${this.state.moviedbID}/videos?api_key=205882c0653c77431db40e15ec7fd210`)
          .then(res => {
            this.setState({youtubeID: res.data.results[0].key})
            console.log(this.state.youtubeID)
          })
      })


  }

  render(){
    if(!this.state.film) return null
    return (
      <div>
        <Link to='./'>Search Again</Link>
        <div>{this.state.film.Title}</div>
        <div>{this.state.film.Plot}</div>
        <div>{this.state.film.Director}</div>
        <GetTrailer id={this.props.match.params.id} moviedbID={this.state.moviedbID} youtubeID={this.state.youtubeID}/>
      </div>
    )
  }

}

export default FilmShow


//<GetTrailer moviedbID={this.state.moviedbID} youtubeID={this.state.youtubeID} />
