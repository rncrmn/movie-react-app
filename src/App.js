import { useState, useEffect } from 'react'

import MovieCard from './MovieCard'
import './App.css'
import SearchIcon from './search.svg'

const API_URL = 'http://omdbapi.com?apikey=7eb1d675'

// const movie1 = {
//     "Title": "Batman Begins",
//     "Year": "2005",
//     "imdbID": "tt0372784",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
// }

const App = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()

        setMovies(data.Search)
    }
    useEffect(() => {
        searchMovies('Avengers')
    }, [])

    return(
        <div className='app'>
            <section id='intro-section'>
                <div className='container'>
                    <h1>Movie React App</h1>
                    <h2>Millions of movies, TV shows and people to discover. Explore now.</h2>
                    <div className='search'>
                        <input 
                            type='text'
                            // value={ searchTerm }
                            placeholder='Search for movies...'
                            onChange={ (e) => setSearchTerm(e.target.value) }
                            // onKeyUp={ (e) => searchMovies(searchTerm) } 
                            onKeyDown={ (e) => {
                                if (e.key === 'Enter') {
                                    searchMovies(searchTerm)
                                }
                            }}
                        />
                        <img 
                            src={ SearchIcon } 
                            alt="search icon"
                            onClick={ () => searchMovies(searchTerm) } 
                        />
                    </div>
                </div>
            </section>
            <section id="movie-section">
                { movies?.length > 0 
                    ? (
                        <div className='container'>
                            { movies.map( (movie) => (
                                <MovieCard movie={ movie } key={ movie.imdbID } />
                            )) }
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    ) 
                }
            </section>
        </div>
        
    )
}

export default App