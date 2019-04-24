import React from 'react'
import axios from 'axios'
import GetTrailer from './GetTrailer.js'
import Recommendations from './Recommendations.js'

class FilmShow extends React.Component {
  constructor(){
    super()

    this.state = {
      film: null, //WHY NULL?
      moviedbID: null,
      youtubeID: null
    }
  }

  componentDidUpdate(prevProps){
    //update state from props
    if(prevProps.location.pathname !== this.props.location.pathname){
      axios.get(`http://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=f09ea565`)
        .then(res => (this.setState({film: res.data})))

      axios.get(`https://api.themoviedb.org/3/find/${this.props.match.params.id}?api_key=205882c0653c77431db40e15ec7fd210&external_source=imdb_id`)
        .then(res => {
          this.setState({ moviedbID: res.data.movie_results[0].id })
          axios.get(`http://api.themoviedb.org/3/movie/${this.state.moviedbID}/videos?api_key=205882c0653c77431db40e15ec7fd210`)
            .then(res => {
              this.setState({youtubeID: res.data.results[0].key})
            })
        })

    }
  }


  componentDidMount() {
    axios.get(`http://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=f09ea565`)
      .then(res => (this.setState({film: res.data})))

    axios.get(`https://api.themoviedb.org/3/find/${this.props.match.params.id}?api_key=205882c0653c77431db40e15ec7fd210&external_source=imdb_id`)
      .then(res => {
        this.setState({ moviedbID: res.data.movie_results[0].id })
        axios.get(`http://api.themoviedb.org/3/movie/${this.state.moviedbID}/videos?api_key=205882c0653c77431db40e15ec7fd210`)
          .then(res => {
            this.setState({youtubeID: res.data.results[0].key})
          })
      })


  }

  render(){
    if(!this.state.film) return null
    return (
      <section>
        <div className="title is-2">{this.state.film.Title}</div>
        <hr/>

        <div  >
          {this.state.film.Director}   |
          {this.state.film.Runtime}   |
          {this.state.film.Genre} |
          {this.state.film.Year}
        </div>
        <br/>

        <div>{this.state.film.Plot}</div>
        <br/>

        <GetTrailer moviedbID={this.state.moviedbID} youtubeID={this.state.youtubeID}/>

        <div className="title is-3"> Similar movies...</div>

        <div className="recommendations">
          <Recommendations moviedbID={this.state.moviedbID} />
        </div>
      </section>
    )
  }

}

export default FilmShow


//<GetTrailer moviedbID={this.state.moviedbID} youtubeID={this.state.youtubeID} />
