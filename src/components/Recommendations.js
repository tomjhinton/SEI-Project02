import React from 'react'
import axios from 'axios'

class Recommentdations extends React.Component {

  constructor(){
    super()
    this.state = {
      recommendations: null
    }
  }

  componentDidMount() {
    axios.get(`http://api.themoviedb.org/3/movie/${this.props.moviedbID}/recommendations?api_key=205882c0653c77431db40e15ec7fd210`)
      .then(res => {
        this.setState({ recommendations: res.data.results.slice(0,10) })
      })
  }



  render(){
    return(
      

      <div>hiya</div>
    )

  }





}




export default Recommentdations
