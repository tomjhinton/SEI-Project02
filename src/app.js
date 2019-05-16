import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'
import './styles.scss'

import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import FilmSearch from './components/FilmSearch.js'
import FilmShow from './components/FilmShow.js'


console.log('JS Loaded')

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Router>
          <FilmSearch />
          <main>
            <Switch>
              <Route path="/:id" component ={FilmShow} />
            </Switch>
          </main>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
