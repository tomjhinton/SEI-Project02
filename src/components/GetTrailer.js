import React from 'react'



class GetTrailer extends React.Component {

  componentDidMount() {
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
