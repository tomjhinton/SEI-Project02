import React from 'react'

import axios from 'axios'


class GetTrailer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      moviedbID: null, //WHY NULL?
      youtubeID: null
    }
  }

  componentDidMount() {

    // axios.get(`https://api.themoviedb.org/3/find/${this.props.id}?api_key=205882c0653c77431db40e15ec7fd210&external_source=imdb_id`)
    //   .then(res => {
    //     this.setState({ moviedbID: res.data.movie_results[0].id })
    //     console.log(this.state.moviedbID)
    //
    //     axios.get(`http://api.themoviedb.org/3/movie/${this.state.moviedbID}/videos?api_key=205882c0653c77431db40e15ec7fd210`)
    //       .then(res => {
    //         this.setState({youtubeID: res.data.results[0].key})
    //         console.log(this.state.youtubeID)
    //
    //       })
    //
    //
    //   })
  }

  render(){
    return (

      <div>
        {this.props.moviedbID && this.props.youtubeID &&
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${this.props.youtubeID}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        }
        <a href={`http://www.youtube.com/watch?v=${this.props.youtubeID}`}> Trailer </a>
      </div>


    )
  }
}

export default GetTrailer
