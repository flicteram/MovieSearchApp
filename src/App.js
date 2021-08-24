import React, { useState } from 'react'

function App() {

    const [query, setQuery] = useState('')
    const [movieSearch, setMovieSearch] = useState([])


    async function handleSubmit(event){

        event.preventDefault()
        if(query!==""){
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4fd39374b175ef0640037cc65b89f715&query=${query}`)
        const data = await response.json();
        setMovieSearch(data.results)
        }
    }
    console.log(movieSearch)
    return(
        <div className="container">
            <form onSubmit={e=>handleSubmit(e)}>
                <label><h1>Search Movie</h1></label>
                <input value={query} 
                type="text"
                onChange={e=>setQuery(e.target.value)}
                placeholder="e.g. Jurassic Park" 
                />
                <button>Search</button>
            </form>
            { movieSearch.filter(movie=> movie.poster_path).map(movie=>
        <div key={movie.id} className="movieContainer">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='poster'/>
        <div className="dataContainer">
        <h4 className="movieTitle">{movie.title}</h4>
        <p className="movieOverview"> {movie.overview}</p>
        <p className="voteAverage">Vote average: {movie.vote_average}⭐</p>
        <p className="voteCount">Votes: {movie.vote_count}</p>
        <p className="releaseDate">Release date: {movie.release_date}</p>
        </div>
        </div>
    )}
        </div>
    )
}


export default App;
