import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../services/api';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <ul>
      {reviews.length === 0 ? <li>No reviews</li> :
        reviews.map(review => (
          <li key={review.id}>
            <b>{review.author}</b>: {review.content}
          </li>
        ))}
    </ul>
  );
}
