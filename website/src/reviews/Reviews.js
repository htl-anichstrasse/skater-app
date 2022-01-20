import { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import Create from './CreateReviews'

const Reviews = (id) => {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    fetch('https://skate-buddy.josholaus.com/api/reviews/' + id.id)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setReviews(data);
      });
  }, [id]);

  return (
    <div className="Reviews">
      {console.log(reviews)}
      <Create skateparkId={id.id}></Create>
      {reviews && <ReviewList reviews={reviews}></ReviewList>}
    </div>
  );
};

export default Reviews;
