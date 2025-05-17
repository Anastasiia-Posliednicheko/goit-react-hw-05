import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../services/api';
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <ul className={css.list}>
      {reviews.length === 0 ? <li className={css.noReviews}>No reviews</li> :
        reviews.map(review => (
          <li key={review.id} className={css.item}>
            <b>{review.author}</b>: {review.content}
          </li>
        ))}
    </ul>
  );
}
