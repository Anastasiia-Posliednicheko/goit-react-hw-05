import { useState} from "react";
import {searchMovies} from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";


export default function MoviesPage() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchMovies(query).then(setMovies);
    };

    return (
        <div className={css.container}>
            <form onSubmit={handleSubmit} className={css.form}>
                <input className={css.input} value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button type="submit" className={css.button}>Search</button>
            </form>
            <MovieList movies={movies}/>
        </div>
    );
}


