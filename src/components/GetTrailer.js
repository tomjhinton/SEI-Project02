import React from 'react'

class GetTrailer extends React.Component {

  componentDidMount() {
  }

  render(){
    return (
      <div id="trailer">
        {this.props.moviedbID && this.props.youtubeID &&
          <iframe  width="560" height="830" src={`https://www.youtube.com/embed/${this.props.youtubeID}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        }
      </div>
    )
  }
}

export default GetTrailer
