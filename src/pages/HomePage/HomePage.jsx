import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import css from  "./HomePage.module.css";

export default function HomePage () {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchTrendingMovies().then(setMovies);
    }, []);

    return (
        <div className={css.container}>
            <h1 className={css.title}>Trending today</h1>
            <MovieList movies={movies}/>
        </div>
    );
}

