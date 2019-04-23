import React from 'react'

const FilmCard = ({Poster}) => {
  return(
    <div className="card">
      <figure className="image">
        <img src={Poster} />
      </figure >
    </div>
  )
}

export default FilmCard
