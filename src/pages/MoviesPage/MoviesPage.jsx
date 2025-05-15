import { useState} from "react";
import {searchMovies} from "../services/api";
import MovieList from "./components/MovieList/MovieList";


export default function MoviesPage() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchMovies(query).then(setMovies);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
            <MovieList movies={movies}/>
        </div>
    );
}


