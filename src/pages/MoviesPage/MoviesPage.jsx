import {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import {searchMovies} from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";


export default function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEmpty, setIsEmpty] = useState(false);
    
    
    const query = searchParams.get("query") || "";


    useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setIsEmpty(false);

    searchMovies(query)
      .then((data) => {
        if (data.length === 0) {
          setIsEmpty(true);
          setMovies([]);
        } else {
          setMovies(data);
        }
      })
      .catch((err) => {
        setError("Something went wrong. Please try again.");
        console.error("Search failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
    }, [query]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const inputValue = form.elements.query.value.trim();
        if(inputValue === "") return;
        setSearchParams({query: inputValue});
    };

     return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          name="query"
          defaultValue={query}
          placeholder="Search movies..."
        />
        <button type="submit" className={css.button}>Search</button>
      </form>

      {loading && <p className={`${css.message} ${css.loading}`}>Loading...</p>}
      {error && <p className={`${css.message} ${css.error}`}>{error}</p>}
      {isEmpty && !loading && !error && (
        <p className={`${css.message} ${css.empty}`}>
           No results found for "{query}"
        </p>
       )}
       {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}


