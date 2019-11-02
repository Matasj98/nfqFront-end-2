import React from 'react'

// import './Genres.style.css';

const Genres = ({genre, id, handle}) =>{
    return(
        <div className="genre">
            <h6 onClick={()=> handle(id)}>{genre}</h6>
        </div>
    )
}

export default Genres;