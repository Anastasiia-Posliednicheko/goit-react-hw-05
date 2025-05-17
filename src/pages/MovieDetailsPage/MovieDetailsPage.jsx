import { useParams, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from "../../services/api";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import css from "./MovieDetailsPage.module.css";


export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/movies';

 useEffect(() => {
  getMovieDetails(movieId)
    .then(data => {
      console.log(data);
      setMovie(data);
    })
    .catch(error => {
      console.error(error);
    });
}, [movieId]);


  if (!movie) return <p>Loading...</p>;

   const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className={css.container}>
      <button onClick={() => navigate(from)} className={css.button}>Go back</button>
      <h2>{movie.title}</h2>
      <img src={posterUrl} alt={movie.title} width="300" className={css.poster} />
      <p>{movie.overview}</p>
      <div className={css.links}>
        <Link to="cast" state={{ from }} className={css.link}>Cast</Link>
        <Link to="reviews" state={{ from }} className={css.link}>Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
}
