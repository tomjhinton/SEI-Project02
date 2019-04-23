import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'

import FilmSearch from './components/FilmSearch.js'

console.log('JS Loaded')

class App extends React.Component {
  render() {
    return (
      <main>
        <FilmSearch />
      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
