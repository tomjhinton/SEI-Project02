import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'

class Recommentdations extends React.Component {

  constructor(){
    super()
    this.state = {
      recommendations: null
    }
    this.handleClick = this.handleClick.bind(this)
  }


  componentDidUpdate(prevProps){
    //update state from props
    if(prevProps.moviedbID !== this.props.moviedbID){
      axios.get(`http://api.themoviedb.org/3/movie/${this.props.moviedbID}/recommendations?api_key=205882c0653c77431db40e15ec7fd210`)
        .then(res => {
          this.setState({ recommendations: res.data.results.slice(0,10) })
        })
    }
  }

  componentDidMount() {
    axios.get(`http://api.themoviedb.org/3/movie/${this.props.moviedbID}/recommendations?api_key=205882c0653c77431db40e15ec7fd210`)
      .then(res => {
        this.setState({ recommendations: res.data.results.slice(0,10) })
      })
  }

  handleClick(moviedbID){
    //To get imdbID and parese to FilmShow onClick
    axios.get(`http://api.themoviedb.org/3/movie/${moviedbID}?api_key=205882c0653c77431db40e15ec7fd210`)
      .then(res => {
        this.props.history.push(`./${res.data.imdb_id}`)
      })
  }




  render(){

    if (!this.state.recommendations) return null
    return(

      this.state.recommendations.map(recommendation =>
        <div className="recommendation" onClick={() => this.handleClick(recommendation.id)}  key={recommendation.id}>{recommendation.original_title}</div>
      )

    )
  }
}

export default withRouter(Recommentdations)
