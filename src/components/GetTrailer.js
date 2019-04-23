import React from 'react'

import axios from 'axios'


class GetTrailer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      film: null //WHY NULL?
    }
  }

  componentDidMount() {
    console.log(this.props.id)
    console.log(`https://api.themoviedb.org/3/find/${this.props.id}?api_key=205882c0653c77431db40e15ec7fd210&external_source=imdb_id`)
    axios.get(`https://api.themoviedb.org/3/find/${this.props.id}?api_key=205882c0653c77431db40e15ec7fd210&external_source=imdb_id`)
      .then(res => {
        this.setState({ film: res.data })
        console.log(res)
      })
    console.log(this)
  }

  render(){
    if(!this.state.film) return null
    return (
      <div>
        Hi
      </div>
    )
  }

}

export default GetTrailer
