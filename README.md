# project-02-moviedb-hackathon

### Timeframe
2 days

## Technologies used

* ReactJS
* Axios
* webpack
* Bulma
* OMdb API
* The Movie Database API


### Installation

Download the directory and from with the directory in your CLI :

```
npm install
```

to install all the dependencies.

The run the appropriate scripts from the package.json file to run the website locally.

## Process

The brief was to create a front-end app using the ReactJS framework to consume third party APIs and display it appropriately.

Once it was established that we wanted to display information about films that a user searched for, a rough user interface was designed to guide what information we wanted to request from APIs.

The different requests from OMDb API and Movie Database API that we wanted were initially made through Insomnia to see what information and structure was returned in the response.

Once we had finalised the requests we wanted to make and checked we could extract the appropriate information the build of the ReactJ app was started.

All work was done on one computer by pair coding and the work was not split into components for each of us to do separately.

### Web App Overview
<br>

A one page app was created that rendered the FilmShow component with the appropriate data from the API requests depending on the path, but always rendered the FilmSearch component:

```
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
```

The home screen displays the app and from FilmSearch component where user can search for a film title.

<img width="1428" alt="Screenshot 2019-06-14 at 16 58 04" src="https://user-images.githubusercontent.com/35113861/59522048-a9cd0d00-8ec5-11e9-95cb-7543f542f6e4.png">

When the user enters a search term an API request is made and data is set to state:

```
handleSubmit(e){
  e.preventDefault()

  axios.get(`http://www.omdbapi.com/?s=${this.state.searchTitle.searchInput
  }&apikey=f09ea565`)
    .then(res => {
      this.setState({ films: res.data.Search.filter((film) => film.Poster!=='N/A' && film.Type==='movie') })
    })

  this.setState( {active: true} )
}
```

Within the FilmSearch component is a section that is only displayed when an API request has been made and therefore info about the returned films set to state is set to state. When it does it displays a FilmCard component for each film that is returned from the API request:

```
<section  className={`container search-results ${this.state.active ? '':'not-active'}`} onClick={() => {
  this.setState( {active: false} )
}
}>
  <div  className="columns is-multiline">
    {this.state.films.map(film =>{
      return(
        <Link key={film.imdbID} className="column is-one-quarter" to={`/${film.imdbID}`}>
          <FilmCard  {...film}/>
        </Link>
      )
    }
    )}
  </div>
</section>
```

When a FilmCard is clicked on it open up the relevant FilmShow component:

<img width="1415" alt="Screenshot 2019-06-14 at 17 15 12" src="https://user-images.githubusercontent.com/35113861/59522994-02050e80-8ec8-11e9-91a4-8194afa7edac.png">

### Challenges and wins

#### Combining 2 APIs

We ended up using two very similar APIs. This happened because we found that the OMDB API gave us much better search results and some good information about the film but the The Moviedb API could provide two things that OMDB didn't. These were youtube id for trailers which we could use to embed the videos onto the page and a list of similar movies. This meant we found ourselves having to make requests to both APIs to get all the information we wanted to show for each film.


```axios.get(`http://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=f09ea565`)
     .then(res => (this.setState({film: res.data})))
```

Now when we used the Movie Database API we made 2 separate and requests to it.

The first one searches for the film by IMDB id and returns the film data from The Movie Database API . This includes the Movie Database ID which in the second axios request is used to return more of the film information, including the Youtube ID that we can then use in the FilmShow component to embed the Youtube trailer.
```
   axios.get(`https://api.themoviedb.org/3/find/${this.props.match.params.id}?api_key=205882c0653c77431db40e15ec7fd210&external_source=imdb_id`)
     .then(res => {
       this.setState({ moviedbID: res.data.movie_results[0].id })
       axios.get(`http://api.themoviedb.org/3/movie/${this.state.moviedbID}/videos?api_key=205882c0653c77431db40e15ec7fd210`)
         .then(res => {
           this.setState({youtubeID: res.data.results[0].key})
         })
     })
```

####Rendering FilmShow component from recommended films

At the bottom of the FilmShow component a selecting of films are displayed from The Movie Database API.

When one is selected the app is pushed to a new URL which we wanted to then be used to displays to appropriate FilmShow component:

```
handleClick(moviedbID){
  //To get imdbID and parese to FilmShow onClick
  axios.get(`http://api.themoviedb.org/3/movie/${moviedbID}?api_key=205882c0653c77431db40e15ec7fd210`)
    .then(res => {
      this.props.history.push(`./${res.data.imdb_id}`)
    })
}
```

However we found that when a user clicked on a recommendation, while the URL had changed the page did not re-render, as the code that set the information to state was only in the componentDidMount function, and this would not be the initial mounting of the component.

Therefore we put the code into the componentDidUpdate function so that it re-rendered when the URL and then the props updated:

```
componentDidUpdate(prevProps){
  //update state from props

  if(prevProps.location.pathname !== this.props.location.pathname){
    // set state with information about film from APIs
  }

}
```

Notice above that the conditional if statement needed to be included. This was due to the fact that state was being set in componentDidUpdate which would therefore make componentDidUpdate run  in an infinte loop. We only wanted the componentDidUpdate code to run when the URL and therefore the prop had changed.

## Future features
_If you were to revisit this project in the future what features would you add?_

Due to time constraints we did not have much time to refactor the code. This meant some failings in the DRY coding stakes. In particular on the film show page we have the same pair of axios requests in both componentDidMount and componentDidUpdate which could have been rewritten as one reusable function.
SAVE TO CACHER
